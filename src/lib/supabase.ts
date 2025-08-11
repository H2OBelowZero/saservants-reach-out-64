import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface Donation {
  id?: number
  amount: number
  donor_name: string
  donor_email: string
  donor_phone?: string
  payment_method: string
  created_at?: string
}