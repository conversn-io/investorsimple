'use client'

import { useMemo, useState } from 'react'

type SubmitState = 'quiz' | 'contact' | 'saving' | 'otp' | 'verifying' | 'done' | 'error'

type QuizQuestion = {
  key: string
  label: string
  options: Array<{ value: string; label: string; hint?: string }>
}

const QUESTIONS: QuizQuestion[] = [
  {
    key: 'age_range',
    label: 'What age range are you in?',
    options: [
      { value: 'under_35', label: 'Under 35' },
      { value: '35_49', label: '35 - 49' },
      { value: '50_64', label: '50 - 64' },
      { value: '65_plus', label: '65+' },
    ],
  },
  {
    key: 'primary_goal',
    label: 'What is your primary investing goal?',
    options: [
      { value: 'income', label: 'Income Stability', hint: 'Reliable cash flow and lower volatility' },
      { value: 'inflation_protection', label: 'Inflation Protection', hint: 'Preserve long-term purchasing power' },
      { value: 'growth', label: 'Long-Term Growth', hint: 'Build net worth over a 5-10 year horizon' },
      { value: 'capital_preservation', label: 'Capital Preservation', hint: 'Defend downside first' },
    ],
  },
  {
    key: 'risk_profile',
    label: 'How would you describe your risk profile?',
    options: [
      { value: 'conservative', label: 'Conservative' },
      { value: 'balanced', label: 'Balanced' },
      { value: 'growth_oriented', label: 'Growth-Oriented' },
      { value: 'aggressive', label: 'Aggressive' },
    ],
  },
  {
    key: 'investable_assets',
    label: 'What is your approximate investable asset range?',
    options: [
      { value: 'under_50k', label: 'Under $50K' },
      { value: '50k_250k', label: '$50K - $250K' },
      { value: '250k_1m', label: '$250K - $1M' },
      { value: '1m_plus', label: '$1M+' },
    ],
  },
  {
    key: 'time_horizon',
    label: 'What is your typical investment horizon?',
    options: [
      { value: 'under_2y', label: 'Under 2 years' },
      { value: '2_5y', label: '2 - 5 years' },
      { value: '5_10y', label: '5 - 10 years' },
      { value: '10y_plus', label: '10+ years' },
    ],
  },
  {
    key: 'advisor_status',
    label: 'Are you currently working with an advisor?',
    options: [
      { value: 'yes', label: 'Yes, currently' },
      { value: 'no', label: 'No, not currently' },
      { value: 'open_to_switch', label: 'Yes, but open to alternatives' },
    ],
  },
]

export function InvestorQuizForm() {
  const [state, setState] = useState<SubmitState>('quiz')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [sessionId] = useState(() => crypto.randomUUID())
  const [message, setMessage] = useState('')
  const [leadId, setLeadId] = useState<string | null>(null)
  const [phoneForOtp, setPhoneForOtp] = useState('')

  const progress = useMemo(() => {
    const totalSteps = QUESTIONS.length + 1
    const current = Math.min(questionIndex + 1, QUESTIONS.length + 1)
    if (state === 'contact' || state === 'saving') return ((QUESTIONS.length + 1) / totalSteps) * 100
    if (state === 'otp' || state === 'verifying' || state === 'done') return 100
    return (current / totalSteps) * 100
  }, [questionIndex, state])

  const currentQuestion = QUESTIONS[questionIndex]

  function selectOption(value: string) {
    if (!currentQuestion) return
    const nextAnswers = { ...answers, [currentQuestion.key]: value }
    setAnswers(nextAnswers)

    if (questionIndex < QUESTIONS.length - 1) {
      setTimeout(() => setQuestionIndex((prev) => prev + 1), 120)
      return
    }

    setTimeout(() => setState('contact'), 120)
  }

  function backStep() {
    if (state === 'contact') {
      setState('quiz')
      setQuestionIndex(QUESTIONS.length - 1)
      return
    }
    if (state === 'quiz' && questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1)
    }
  }

  async function onContactSubmit(formData: FormData) {
    setState('saving')
    setMessage('')

    const phone = String(formData.get('phone') || '')

    const payload = {
      email: String(formData.get('email') || ''),
      firstName: String(formData.get('firstName') || ''),
      lastName: String(formData.get('lastName') || ''),
      phoneNumber: phone,
      funnelType: 'investor_quiz',
      sessionId,
      quizAnswers: answers,
    }

    const capture = await fetch('/api/leads/capture-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const captureJson = await capture.json().catch(() => ({}))
    if (!capture.ok) {
      setState('error')
      setMessage(captureJson.error || 'Could not save your quiz response.')
      return
    }

    setLeadId(captureJson.lead_id || null)
    setPhoneForOtp(phone)

    const sendOtp = await fetch('/api/otp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    })

    const sendOtpJson = await sendOtp.json().catch(() => ({}))
    if (!sendOtp.ok) {
      setState('error')
      setMessage(sendOtpJson.error || 'Lead saved, but OTP could not be sent.')
      return
    }

    setState('otp')
    setMessage('Almost done. Enter the code sent to your phone to complete your request.')
  }

  async function verifyOtp(formData: FormData) {
    setState('verifying')
    setMessage('')

    const otp = String(formData.get('otp') || '')

    const verify = await fetch('/api/leads/verify-otp-and-send-to-ghl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        otp,
        phone: phoneForOtp,
        sessionId,
      }),
    })

    const verifyJson = await verify.json().catch(() => ({}))
    if (!verify.ok || !verifyJson?.verified) {
      setState('error')
      setMessage(verifyJson.error || 'OTP verification failed. Please try again.')
      return
    }

    setState('done')
    setMessage('You are verified. Your request has been sent to our advisory team.')
  }

  if (state === 'done') {
    return (
      <div className="quiz-success-card">
        <h3>Request Submitted</h3>
        <p>{message}</p>
        {leadId ? <p className="quiz-meta">Reference ID: {leadId}</p> : null}
      </div>
    )
  }

  return (
    <div className="quiz-funnel-shell">
      <div className="quiz-progress-block">
        <div className="quiz-progress-copy">
          <span>Step {Math.min(questionIndex + 1, QUESTIONS.length + 1)} of {QUESTIONS.length + 1}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="quiz-progress-track" aria-hidden="true">
          <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {(state === 'quiz' || state === 'contact' || state === 'saving') && (
        <div className="quiz-card">
          {state === 'quiz' && currentQuestion ? (
            <>
              <h3 className="quiz-question">{currentQuestion.label}</h3>
              <div className="quiz-option-grid">
                {currentQuestion.options.map((option) => {
                  const selected = answers[currentQuestion.key] === option.value
                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={`quiz-option ${selected ? 'is-selected' : ''}`}
                      onClick={() => selectOption(option.value)}
                    >
                      <span className="quiz-option-label">{option.label}</span>
                      {option.hint ? <span className="quiz-option-hint">{option.hint}</span> : null}
                    </button>
                  )
                })}
              </div>
            </>
          ) : null}

          {state === 'contact' || state === 'saving' ? (
            <form
              className="quiz-contact-form"
              onSubmit={(event) => {
                event.preventDefault()
                onContactSubmit(new FormData(event.currentTarget))
              }}
            >
              <h3 className="quiz-question">Where should we send your tailored recommendation?</h3>
              <div className="quiz-form-grid">
                <input name="firstName" placeholder="First name" required />
                <input name="lastName" placeholder="Last name" required />
              </div>
              <input name="email" type="email" placeholder="Email address" required />
              <input name="phone" type="tel" placeholder="Phone number" required />
              <button className="btn btn-primary quiz-cta" type="submit" disabled={state === 'saving'}>
                {state === 'saving' ? 'Submitting...' : 'Continue'}
              </button>
            </form>
          ) : null}

          <div className="quiz-nav-row">
            <button type="button" className="quiz-back-btn" onClick={backStep} disabled={state === 'saving' || (state === 'quiz' && questionIndex === 0)}>
              Back
            </button>
          </div>
        </div>
      )}

      {(state === 'otp' || state === 'verifying' || state === 'error') && (
        <div className="quiz-card">
          <form
            className="quiz-contact-form"
            onSubmit={(event) => {
              event.preventDefault()
              verifyOtp(new FormData(event.currentTarget))
            }}
          >
            <h3 className="quiz-question">Enter your 6-digit verification code</h3>
            <p className="quiz-helper">We sent a code to {phoneForOtp}. This step protects lead quality and speeds advisor routing.</p>
            <input name="otp" inputMode="numeric" maxLength={6} placeholder="123456" required />
            <button className="btn btn-secondary quiz-cta" type="submit" disabled={state === 'verifying'}>
              {state === 'verifying' ? 'Verifying...' : 'Verify & Finish'}
            </button>
          </form>
        </div>
      )}

      {message ? <p className="quiz-message">{message}</p> : null}
      {leadId ? <p className="quiz-meta">Lead ID: {leadId}</p> : null}
    </div>
  )
}
