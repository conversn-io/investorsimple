'use client'

import { FormEvent, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

type FunnelOtpVerificationPageProps = {
  funnelLabel: string
}

type VerifyState = 'idle' | 'verifying' | 'completing' | 'error'

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, '')
  if (digits.length < 4) return value
  const last4 = digits.slice(-4)
  return `***-***-${last4}`
}

export function FunnelOtpVerificationPage({ funnelLabel }: FunnelOtpVerificationPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [otp, setOtp] = useState('')
  const [state, setState] = useState<VerifyState>('idle')
  const [message, setMessage] = useState('')

  const phone = searchParams.get('phone') || ''
  const sessionId = searchParams.get('session') || ''
  const nextPath = searchParams.get('next') || '/'
  const leadId = searchParams.get('lead') || ''

  const safeNextPath = useMemo(() => {
    if (!nextPath.startsWith('/')) return '/'
    return nextPath
  }, [nextPath])

  async function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!phone || !sessionId) {
      setState('error')
      setMessage('Missing verification context. Please restart your request.')
      return
    }

    setState('verifying')
    setMessage('')

    const response = await fetch('/api/leads/verify-otp-and-send-to-ghl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone,
        otp,
        sessionId,
      }),
    })

    const json = await response.json().catch(() => ({}))

    if (!response.ok || !json?.verified) {
      setState('error')
      setMessage(json.error || 'Verification failed. Please double-check your code and try again.')
      return
    }

    setState('completing')
    setMessage('We are securely verifying your details and routing your request. This usually takes a few seconds.')

    const params = new URLSearchParams()
    if (leadId) params.set('lead', leadId)

    window.setTimeout(() => {
      const path = params.toString() ? `${safeNextPath}?${params.toString()}` : safeNextPath
      router.push(path)
    }, 1800)
  }

  async function resendCode() {
    if (!phone) {
      setState('error')
      setMessage('Phone number is missing. Please restart your request.')
      return
    }

    const response = await fetch('/api/otp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    })

    const json = await response.json().catch(() => ({}))

    if (!response.ok) {
      setState('error')
      setMessage(json.error || 'Could not resend code. Please try again in a moment.')
      return
    }

    setState('idle')
    setMessage('A new verification code was sent.')
  }

  return (
    <div className="wl-thankyou-wrap">
      <section className="wl-thankyou-card wl-verify-card">
        <span className="wl-kicker">Security Verification</span>
        <h1>Verify Your Phone Number</h1>
        <p>
          Before we proceed to your {funnelLabel} next steps, we need to verify your request for compliance and routing quality.
        </p>

        <form className="wl-form wl-verify-form" onSubmit={handleVerify}>
          <label htmlFor="otp-input" className="wl-verify-label">
            Enter the 6-digit code sent to {maskPhone(phone)}
          </label>
          <input
            id="otp-input"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            required
          />

          <button className="btn btn-primary wl-submit" type="submit" disabled={state === 'verifying' || state === 'completing'}>
            {state === 'verifying' ? 'Verifying...' : state === 'completing' ? 'Finalizing...' : 'Verify & Continue'}
          </button>

          <button type="button" className="wl-resend-btn" onClick={resendCode} disabled={state === 'verifying' || state === 'completing'}>
            Resend code
          </button>
        </form>

        {message ? <p className={state === 'error' ? 'wl-error' : 'wl-verify-message'}>{message}</p> : null}
      </section>
    </div>
  )
}
