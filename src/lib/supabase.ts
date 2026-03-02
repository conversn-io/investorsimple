import { createClient } from '@supabase/supabase-js'

const cmsSupabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://vpysqshhafthuxvokwqj.supabase.co'
const cmsSupabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(cmsSupabaseUrl, cmsSupabaseAnonKey)
