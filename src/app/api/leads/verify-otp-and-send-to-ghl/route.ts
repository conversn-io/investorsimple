import { NextRequest } from 'next/server'
import { callreadyQuizDb } from '@/lib/callready-quiz-db'
import { createCorsResponse, handleCorsOptions } from '@/lib/cors-headers'
import { formatE164 } from '@/utils/phone-utils'
import { buildGhlPayload } from '@/lib/ghl-mapping'
import { deliverWebhookWithRetry } from '@/lib/webhook-delivery'

const SITE_KEY = 'investorsimple.org'

export async function OPTIONS() {
  return handleCorsOptions()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const phone = formatE164(body.phone)
    const otp = String(body.otp || '')
    const sessionId = body.sessionId || null

    if (!phone || !otp) {
      return createCorsResponse({ error: 'Phone and OTP are required' }, 400)
    }

    const { data: otpRow } = await callreadyQuizDb
      .from('otp_verifications')
      .select('*')
      .eq('phone_number', phone)
      .eq('otp_code', otp)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (!otpRow) return createCorsResponse({ success: false, verified: false, error: 'Invalid OTP' }, 400)
    if (new Date(otpRow.expires_at).getTime() < Date.now()) {
      return createCorsResponse({ success: false, verified: false, error: 'OTP expired' }, 400)
    }

    const { data: lead } = await callreadyQuizDb
      .from('leads')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (!lead?.id) return createCorsResponse({ error: 'Lead not found for this session' }, 404)

    await callreadyQuizDb
      .from('leads')
      .update({ is_verified: true, status: 'verified', verified_at: new Date().toISOString(), site_key: SITE_KEY })
      .eq('id', lead.id)

    const webhookUrl = process.env.INVESTORSIMPLE_GHL_WEBHOOK || process.env.GHL_WEBHOOK || ''
    let webhook = { success: false, status: 0, attempts: 0, error: '' }

    if (webhookUrl) {
      const payload = buildGhlPayload({ lead, body: { ...body, phone }, siteKey: SITE_KEY })
      const result = await deliverWebhookWithRetry(webhookUrl, payload, 3)
      webhook = {
        success: result.success,
        status: result.status,
        attempts: result.attempts,
        error: result.error || '',
      }
    }

    return createCorsResponse({
      success: true,
      verified: true,
      sent_to_ghl: webhook.success,
      webhook_status: webhook.status,
      webhook_attempts: webhook.attempts,
      webhook_error: webhook.error || null,
      lead_id: lead.id,
    })
  } catch (error) {
    console.error('verify otp and send ghl error', error)
    return createCorsResponse({ error: 'Internal server error' }, 500)
  }
}
