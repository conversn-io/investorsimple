import { NextRequest } from 'next/server'
import { callreadyQuizDb } from '@/lib/callready-quiz-db'
import { createCorsResponse, handleCorsOptions } from '@/lib/cors-headers'
import { formatE164 } from '@/utils/phone-utils'

export async function OPTIONS() {
  return handleCorsOptions()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const normalizedPhone = formatE164(body.phone)
    const otp = String(body.otp || '')

    if (!normalizedPhone || !otp) return createCorsResponse({ error: 'Phone and OTP are required' }, 400)

    const { data, error } = await callreadyQuizDb
      .from('otp_verifications')
      .select('*')
      .eq('phone_number', normalizedPhone)
      .eq('otp_code', otp)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error || !data) return createCorsResponse({ success: false, verified: false, error: 'Invalid OTP' }, 400)
    if (new Date(data.expires_at).getTime() < Date.now()) return createCorsResponse({ success: false, verified: false, error: 'OTP expired' }, 400)

    return createCorsResponse({ success: true, verified: true })
  } catch (error) {
    console.error('otp verify error', error)
    return createCorsResponse({ error: 'Internal server error' }, 500)
  }
}
