import { createClient } from '@supabase/supabase-js'

const CALLREADY_QUIZ_URL = process.env.SUPABASE_QUIZ_URL || 'https://jqjftrlnyysqcwbbigpw.supabase.co'
const CALLREADY_QUIZ_SERVICE_KEY = process.env.SUPABASE_QUIZ_SERVICE_ROLE_KEY || process.env.SUPABASE_QUIZ_ANON_KEY || ''

export const callreadyQuizDb = createClient(CALLREADY_QUIZ_URL, CALLREADY_QUIZ_SERVICE_KEY)
