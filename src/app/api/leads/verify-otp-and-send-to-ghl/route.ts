import { NextRequest } from 'next/server'
import { callreadyQuizDb } from '@/lib/callready-quiz-db'
import { createCorsResponse, handleCorsOptions } from '@/lib/cors-headers'
import { formatE164, formatPhoneForGHL } from '@/utils/phone-utils'

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

    const contactPayload = {
      firstName: lead.contact?.first_name || body.firstName || '',
      lastName: lead.contact?.last_name || body.lastName || '',
      email: lead.contact?.email || body.email || '',
      phone: formatPhoneForGHL(phone),
    }

    const webhookUrl = process.env.INVESTORSIMPLE_GHL_WEBHOOK || process.env.GHL_WEBHOOK || ''
    let webhook = { success: false, status: 0 }

    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: contactPayload,
          lead_source: 'InvestorSimple',
          source: 'investorsimple_quiz',
          site_key: SITE_KEY,
          funnel_type: lead.funnel_type || 'investor_quiz',
          session_id: lead.session_id,
          quiz_answers: lead.quiz_answers || {},
          utm: {
            source: lead.utm_source,
            medium: lead.utm_medium,
            campaign: lead.utm_campaign,
          },
        }),
      })
      webhook = { success: response.ok, status: response.status }
    }

    return createCorsResponse({ success: true, verified: true, sent_to_ghl: webhook.success, webhook_status: webhook.status, lead_id: lead.id })
  } catch (error) {
    console.error('verify otp and send ghl error', error)
    return createCorsResponse({ error: 'Internal server error' }, 500)
  }
}
