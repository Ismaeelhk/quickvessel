import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  full_name?: string
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}

export interface Shipment {
  id: string
  tracking_number: string
  user_id: string
  status: 'pending' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'exception'
  current_location: string
  destination: string
  origin: string
  estimated_delivery: string
  created_at: string
  updated_at: string
  description?: string
  weight?: number
  dimensions?: string
}

export interface TrackingEvent {
  id: string
  shipment_id: string
  status: string
  location: string
  description: string
  timestamp: string
  created_at: string
}

export interface AdminUpdate {
  id: string
  shipment_id: string
  admin_id: string
  status: string
  location: string
  description: string
  created_at: string
}

export interface SupportMessage {
  id: string
  user_id: string
  subject: string
  message: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  created_at: string
  updated_at: string
  users?: User
  replies?: SupportReply[]
}

export interface SupportReply {
  id: string
  support_message_id: string
  user_id: string
  message: string
  is_admin_reply: boolean
  created_at: string
  users?: User
}
