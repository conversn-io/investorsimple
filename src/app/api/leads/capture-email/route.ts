import { NextRequest } from 'next/server'
import { callreadyQuizDb } from '@/lib/callready-quiz-db'
import { createCorsResponse, handleCorsOptions } from '@/lib/cors-headers'
import { formatE164 } from '@/utils/phone-utils'

const SITE_KEY = 'investorsimple.org'

export async function OPTIONS() {
  return handleCorsOptions()
}

async function upsertContact(email: string, firstName?: string, lastName?: string, phone?: string) {
  const normalizedEmail = email.toLowerCase()
  const normalizedPhone = formatE164(phone)

  const { data: existing } = await callreadyQuizDb
    .from('contacts')
    .select('id')
    .or(`email.eq.${normalizedEmail}${normalizedPhone ? `,phone.eq.${normalizedPhone}` : ''}`)
    .maybeSingle()

  if (existing?.id) {
    const { data: updated, error } = await callreadyQuizDb
      .from('contacts')
      .update({
        email: normalizedEmail,
        phone: normalizedPhone || undefined,
        first_name: firstName || undefined,
        last_name: lastName || undefined,
      })
      .eq('id', existing.id)
      .select('id,email,phone,first_name,last_name')
      .single()

    if (error) throw error
    return updated
  }

  const { data: created, error } = await callreadyQuizDb
    .from('contacts')
    .insert({
      email: normalizedEmail,
      phone: normalizedPhone,
      first_name: firstName,
      last_name: lastName,
      source: 'investorsimple_quiz',
    })
    .select('id,email,phone,first_name,last_name')
    .single()

  if (error) throw error
  return created
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, firstName, lastName, phoneNumber, quizAnswers, sessionId, funnelType = 'investor_quiz', utmParams } = body

    if (!email) return createCorsResponse({ error: 'Email is required' }, 400)

    const contact = await upsertContact(email, firstName, lastName, phoneNumber)

    const leadPayload = {
      contact_id: contact.id,
      session_id: sessionId || null,
      site_key: SITE_KEY,
      funnel_type: funnelType,
      status: phoneNumber ? 'phone_captured' : 'email_captured',
      is_verified: false,
      user_id: sessionId || email,
      contact: {
        email: contact.email,
        phone: contact.phone || null,
        first_name: contact.first_name || null,
        last_name: contact.last_name || null,
      },
      quiz_answers: {
        ...(quizAnswers || {}),
        utm_parameters: utmParams || {},
      },
      utm_source: utmParams?.utm_source || null,
      utm_medium: utmParams?.utm_medium || null,
      utm_campaign: utmParams?.utm_campaign || null,
      referrer: request.headers.get('referer') || null,
      landing_page: body.landingPage || null,
    }

    const { data: existing } = await callreadyQuizDb
      .from('leads')
      .select('id')
      .eq('contact_id', contact.id)
      .eq('session_id', sessionId || null)
      .maybeSingle()

    const write = existing?.id
      ? await callreadyQuizDb.from('leads').update(leadPayload).eq('id', existing.id).select('id').single()
      : await callreadyQuizDb.from('leads').insert(leadPayload).select('id').single()

    if (write.error) {
      return createCorsResponse({ error: 'Failed to save lead', details: write.error.message }, 500)
    }

    return createCorsResponse({ success: true, lead_id: write.data?.id, contact_id: contact.id })
  } catch (error) {
    console.error('capture-email error', error)
    return createCorsResponse({ error: 'Internal server error' }, 500)
  }
}
