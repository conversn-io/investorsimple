'use client'

import { useState } from 'react'

type SubmitState = 'idle' | 'saving' | 'otp' | 'verifying' | 'done' | 'error'

export function InvestorQuizForm() {
  const [state, setState] = useState<SubmitState>('idle')
  const [sessionId] = useState(() => crypto.randomUUID())
  const [message, setMessage] = useState('')
  const [leadId, setLeadId] = useState<string | null>(null)

  async function onSubmit(formData: FormData) {
    setState('saving')
    setMessage('')

    const payload = {
      email: String(formData.get('email') || ''),
      firstName: String(formData.get('firstName') || ''),
      lastName: String(formData.get('lastName') || ''),
      phoneNumber: String(formData.get('phone') || ''),
      funnelType: 'investor_quiz',
      sessionId,
      quizAnswers: {
        primary_goal: String(formData.get('goal') || ''),
        risk_profile: String(formData.get('risk') || ''),
        time_horizon: String(formData.get('horizon') || ''),
      },
    }

    const capture = await fetch('/api/leads/capture-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const captureJson = await capture.json()
    if (!capture.ok) {
      setState('error')
      setMessage(captureJson.error || 'Could not save your quiz.')
      return
    }

    setLeadId(captureJson.lead_id || null)

    const sendOtp = await fetch('/api/otp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: payload.phoneNumber }),
    })

    if (!sendOtp.ok) {
      setState('error')
      setMessage('Lead captured, but OTP could not be sent.')
      return
    }

    setState('otp')
    setMessage('Lead saved. Enter OTP to complete verification and send to advisor.')
  }

  async function verifyOtp(formData: FormData) {
    setState('verifying')
    setMessage('')
    const otp = String(formData.get('otp') || '')
    const phone = String(formData.get('phone') || '')

    const verify = await fetch('/api/leads/verify-otp-and-send-to-ghl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otp, phone, sessionId }),
    })

    const verifyJson = await verify.json()
    if (!verify.ok || !verifyJson?.verified) {
      setState('error')
      setMessage(verifyJson.error || 'OTP verification failed.')
      return
    }

    setState('done')
    setMessage('Verified. Your request has been sent.')
  }

  if (state === 'done') {
    return <p>{message}</p>
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(new FormData(e.currentTarget))
        }}
      >
        <div className="form-group"><input name="firstName" placeholder="First name" required /></div>
        <div className="form-group"><input name="lastName" placeholder="Last name" required /></div>
        <div className="form-group"><input name="email" type="email" placeholder="Email" required /></div>
        <div className="form-group"><input name="phone" type="tel" placeholder="Phone" required /></div>
        <div className="form-group"><input name="goal" placeholder="Primary goal (income, inflation, growth...)" required /></div>
        <div className="form-group"><input name="risk" placeholder="Risk profile" required /></div>
        <div className="form-group"><input name="horizon" placeholder="Time horizon" required /></div>
        <button className="btn btn-primary" type="submit" disabled={state === 'saving'}>
          {state === 'saving' ? 'Saving...' : 'Submit Quiz'}
        </button>
      </form>

      {(state === 'otp' || state === 'verifying' || state === 'error') && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            verifyOtp(new FormData(e.currentTarget))
          }}
          style={{ marginTop: '16px' }}
        >
          <div className="form-group"><input name="phone" type="tel" placeholder="Phone used above" required /></div>
          <div className="form-group"><input name="otp" placeholder="6-digit OTP" required /></div>
          <button className="btn btn-secondary" type="submit" disabled={state === 'verifying'}>
            {state === 'verifying' ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      )}

      {leadId && <p style={{ marginTop: '12px' }}>Lead ID: {leadId}</p>}
      {message && <p style={{ marginTop: '12px' }}>{message}</p>}
    </div>
  )
}
