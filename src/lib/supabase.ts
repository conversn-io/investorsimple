import { createClient } from '@supabase/supabase-js'

const cmsSupabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://vpysqshhafthuxvokwqj.supabase.co'
const cmsSupabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZweXNxc2hoYWZ0aHV4dm9rd3FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNTY3ODcsImV4cCI6MjA2NTkzMjc4N30.fza16gc2qHpGzzMFa1H3O6W-YIsVTsCLH9uYy9pR31I'

export const supabase = createClient(cmsSupabaseUrl, cmsSupabaseAnonKey)
