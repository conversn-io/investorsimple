'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

type LeadFunnelFormProps = {
  slug: 'kit-guide' | 'web-conference'
  funnelType: string
  ctaLabel: string
  thankYouPath: string
}

export function LeadFunnelForm({ slug, funnelType, ctaLabel, thankYouPath }: LeadFunnelFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [sessionId] = useState(() => crypto.randomUUID())

  const utmParams = useMemo(() => {
    if (typeof window === 'undefined') return {}
    const search = new URLSearchParams(window.location.search)
    return {
      utm_source: search.get('utm_source') || null,
      utm_medium: search.get('utm_medium') || null,
      utm_campaign: search.get('utm_campaign') || null,
      utm_term: search.get('utm_term') || null,
      utm_content: search.get('utm_content') || null,
    }
  }, [])

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError('')

    const payload = {
      email: String(formData.get('email') || ''),
      firstName: String(formData.get('firstName') || ''),
      lastName: String(formData.get('lastName') || ''),
      phoneNumber: String(formData.get('phone') || ''),
      funnelType,
      sessionId,
      utmParams,
      quizAnswers: {
        intent: String(formData.get('intent') || ''),
        timeline: String(formData.get('timeline') || ''),
        state: String(formData.get('state') || ''),
      },
    }

    const response = await fetch('/api/leads/capture-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const json = await response.json().catch(() => ({}))
    if (!response.ok) {
      setError(json.error || 'Something went wrong. Please try again.')
      setIsSubmitting(false)
      return
    }

    const sendOtp = await fetch('/api/otp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: payload.phoneNumber }),
    })

    const sendOtpJson = await sendOtp.json().catch(() => ({}))
    if (!sendOtp.ok) {
      setError(sendOtpJson.error || 'Lead saved, but verification code could not be sent.')
      setIsSubmitting(false)
      return
    }

    const params = new URLSearchParams({
      phone: payload.phoneNumber,
      session: sessionId,
      next: thankYouPath,
    })

    if (json.lead_id) params.set('lead', String(json.lead_id))

    router.push(`/funnels/${slug}/verify?${params.toString()}`)
  }

  return (
    <form
      className="wl-form"
      onSubmit={(event) => {
        event.preventDefault()
        handleSubmit(new FormData(event.currentTarget))
      }}
    >
      <div className="wl-form-grid">
        <input name="firstName" placeholder="First name" required />
        <input name="lastName" placeholder="Last name" required />
      </div>
      <input name="email" type="email" placeholder="Email address" required />
      <input name="phone" type="tel" placeholder="Phone number" required />
      <div className="wl-form-grid">
        <select name="intent" required defaultValue="">
          <option value="" disabled>Primary intent</option>
          <option value="retirement_diversification">Retirement diversification</option>
          <option value="inflation_hedge">Inflation hedge</option>
          <option value="portfolio_review">Portfolio review</option>
          <option value="general_education">General education</option>
        </select>
        <select name="timeline" required defaultValue="">
          <option value="" disabled>Timeline</option>
          <option value="asap">As soon as possible</option>
          <option value="30_days">Within 30 days</option>
          <option value="90_days">Within 90 days</option>
          <option value="researching">Just researching</option>
        </select>
      </div>
      <input name="state" placeholder="State" required />
      <button className="btn btn-primary wl-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : ctaLabel}
      </button>
      <p className="wl-disclaimer">By submitting, you agree to receive follow-up communications regarding your requested resource.</p>
      {error ? <p className="wl-error">{error}</p> : null}
    </form>
  )
}
