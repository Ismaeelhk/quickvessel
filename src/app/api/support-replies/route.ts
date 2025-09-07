import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { EmailService } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { support_message_id, message } = await request.json()

    if (!support_message_id || !message) {
      return NextResponse.json({ error: 'Support message ID and message are required' }, { status: 400 })
    }

    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      }
    )

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user details from public.users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, role')
      .eq('id', user.id)
      .single()

    if (userError || !userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user has access to this support message
    const { data: supportMessage, error: supportError } = await supabase
      .from('support_messages')
      .select('user_id')
      .eq('id', support_message_id)
      .single()

    if (supportError || !supportMessage) {
      return NextResponse.json({ error: 'Support message not found' }, { status: 404 })
    }

    // Check if user is admin or the owner of the support message
    if (userData.role !== 'admin' && supportMessage.user_id !== userData.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Create reply
    const { data: reply, error: insertError } = await supabase
      .from('support_replies')
      .insert([{
        support_message_id,
        user_id: userData.id,
        message,
        is_admin_reply: userData.role === 'admin'
      }])
      .select(`
        *,
        users:user_id (
          id,
          email,
          full_name
        )
      `)
      .single()

    if (insertError) {
      console.error('Error creating support reply:', insertError)
      return NextResponse.json({ error: 'Failed to create reply' }, { status: 500 })
    }

    // If admin is replying, update status and send email to the ticket owner
    if (userData.role === 'admin') {
      // update status
      await supabase
        .from('support_messages')
        .update({ status: 'in_progress' })
        .eq('id', support_message_id)

      // fetch support message with user details for email
      const { data: fullMessage } = await supabase
        .from('support_messages')
        .select(`
          id,
          subject,
          message,
          users:user_id (
            id,
            email,
            full_name
          )
        `)
        .eq('id', support_message_id)
        .single()

      if (fullMessage && fullMessage.users) {
        const userRecord: any = Array.isArray(fullMessage.users) ? fullMessage.users[0] : fullMessage.users
        if (userRecord?.email) {
          await EmailService.sendSupportReplyNotification({
            to: userRecord.email,
            userName: userRecord.full_name,
            subject: fullMessage.subject,
            originalMessage: fullMessage.message,
            replyMessage: message,
          })
        }
      }
    }

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Error creating support reply:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
