import { formatPhoneForGHL } from '@/utils/phone-utils'

type LeadContact = {
  first_name?: string | null
  last_name?: string | null
  email?: string | null
  phone?: string | null
}

type LeadLike = {
  id?: string | null
  contact?: LeadContact | null
  quiz_answers?: Record<string, unknown> | null
  funnel_type?: string | null
  session_id?: string | null
  status?: string | null
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  utm_term?: string | null
  utm_content?: string | null
  user_id?: string | null
  landing_page?: string | null
  referrer?: string | null
}

type BodyLike = {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
}

export function buildGhlPayload(input: {
  lead: LeadLike
  body: BodyLike
  siteKey: string
}) {
  const { lead, body, siteKey } = input

  const contact = {
    firstName: lead?.contact?.first_name || body?.firstName || '',
    lastName: lead?.contact?.last_name || body?.lastName || '',
    email: lead?.contact?.email || body?.email || '',
    phone: formatPhoneForGHL(lead?.contact?.phone || body?.phone || ''),
  }

  const quizAnswers = lead?.quiz_answers || {}

  return {
    contact,
    lead_source: 'InvestorSimple',
    source: 'investorsimple_quiz',
    site_key: siteKey,
    funnel_type: lead?.funnel_type || 'investor_quiz',
    session_id: lead?.session_id || null,
    lead_id: lead?.id || null,
    lead_status: lead?.status || null,
    is_verified: true,
    verified_at: new Date().toISOString(),
    quiz_answers: quizAnswers,
    profile: {
      goal: quizAnswers.primary_goal || null,
      risk: quizAnswers.risk_profile || null,
      horizon: quizAnswers.time_horizon || null,
    },
    utm: {
      source: lead?.utm_source || null,
      medium: lead?.utm_medium || null,
      campaign: lead?.utm_campaign || null,
      term: lead?.utm_term || null,
      content: lead?.utm_content || null,
    },
    tracking: {
      user_id: lead?.user_id || null,
      landing_page: lead?.landing_page || null,
      referrer: lead?.referrer || null,
    },
  }
}
