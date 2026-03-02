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
    if (!normalizedPhone) return createCorsResponse({ error: 'Valid phone is required' }, 400)

    const otp = String(Math.floor(100000 + Math.random() * 900000))
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString()

    const { error } = await callreadyQuizDb.from('otp_verifications').insert({
      phone_number: normalizedPhone,
      otp_code: otp,
      expires_at: expiresAt,
      attempts: 0,
    })

    if (error) return createCorsResponse({ error: 'Failed to create OTP record', details: error.message }, 500)

    return createCorsResponse({ success: true, otp_sent: true, expires_at: expiresAt })
  } catch (error) {
    console.error('otp send error', error)
    return createCorsResponse({ error: 'Internal server error' }, 500)
  }
}
