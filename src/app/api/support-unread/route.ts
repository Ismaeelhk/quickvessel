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

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // get last seen
    const { data: lastSeenRow } = await supabase
      .from('support_last_seen')
      .select('last_seen_at')
      .eq('user_id', user.id)
      .maybeSingle()

    const lastSeenAt = lastSeenRow?.last_seen_at || '1970-01-01T00:00:00Z'

    // count replies since last seen where not authored by this user
    const { count, error } = await supabase
      .from('support_replies')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', lastSeenAt)
      .neq('user_id', user.id)

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch unread count' }, { status: 500 })
    }

    return NextResponse.json({ unread: count || 0 })
  } catch (error) {
    console.error('Error getting support unread count:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const now = new Date().toISOString()

    // upsert last seen
    const { error } = await supabase
      .from('support_last_seen')
      .upsert({ user_id: user.id, last_seen_at: now }, { onConflict: 'user_id' })

    if (error) {
      return NextResponse.json({ error: 'Failed to update last seen' }, { status: 500 })
    }

    return NextResponse.json({ success: true, last_seen_at: now })
  } catch (error) {
    console.error('Error updating support last seen:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


