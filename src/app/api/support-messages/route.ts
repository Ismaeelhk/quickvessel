import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
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

    // Get all support messages with user details and replies
    const { data: supportMessages, error } = await supabase
      .from('support_messages')
      .select(`
        *,
        users:user_id (
          id,
          email,
          full_name
        ),
        replies:support_replies (
          *,
          users:user_id (
            id,
            email,
            full_name
          )
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching support messages:', error)
      return NextResponse.json({ error: 'Failed to fetch support messages' }, { status: 500 })
    }

    return NextResponse.json({ supportMessages })
  } catch (error) {
    console.error('Error in support messages API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { subject, message, priority = 'medium' } = await request.json()

    if (!subject || !message) {
      return NextResponse.json({ error: 'Subject and message are required' }, { status: 400 })
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
      .select('id')
      .eq('id', user.id)
      .single()

    if (userError || !userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Create support message
    const { data: supportMessage, error: insertError } = await supabase
      .from('support_messages')
      .insert([{
        user_id: userData.id,
        subject,
        message,
        priority,
        status: 'open'
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
      console.error('Error creating support message:', insertError)
      return NextResponse.json({ error: 'Failed to create support message' }, { status: 500 })
    }

    return NextResponse.json({ supportMessage })
  } catch (error) {
    console.error('Error creating support message:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
