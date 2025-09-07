import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { EmailService } from '@/lib/email'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { shipmentId, oldStatus, newStatus, location, description } = await request.json()

    if (!shipmentId || !newStatus || !location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create Supabase client
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

    // Fetch shipment with user details
    const { data: shipment, error: shipmentError } = await supabase
      .from('shipments')
      .select(`
        *,
        users:user_id (
          id,
          email,
          full_name
        )
      `)
      .eq('id', shipmentId)
      .single()

    if (shipmentError || !shipment) {
      return NextResponse.json({ error: 'Shipment not found' }, { status: 404 })
    }

    // Send email notification
    const emailSent = await EmailService.sendStatusUpdateNotification({
      user: shipment.users,
      shipment: shipment,
      statusChange: {
        oldStatus,
        newStatus,
        location,
        description
      }
    })

    if (emailSent) {
      return NextResponse.json({ success: true, message: 'Email sent successfully' })
    } else {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error sending status update email:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
