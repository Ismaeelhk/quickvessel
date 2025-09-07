import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { status, priority } = await request.json()
    const { id } = await context.params

    if (!id) {
      return NextResponse.json({ error: 'Support message ID is required' }, { status: 400 })
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

    // Only admins can update support messages
    if (userData.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Update support message
    const updateData: any = {}
    if (status) updateData.status = status
    if (priority) updateData.priority = priority

    const { data: supportMessage, error: updateError } = await supabase
      .from('support_messages')
      .update(updateData)
      .eq('id', id)
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
      .single()

    if (updateError) {
      console.error('Error updating support message:', updateError)
      return NextResponse.json({ error: 'Failed to update support message' }, { status: 500 })
    }

    return NextResponse.json({ supportMessage })
  } catch (error) {
    console.error('Error updating support message:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
