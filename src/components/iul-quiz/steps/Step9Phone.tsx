import { useState } from 'react'
import type { QuizState } from '@/lib/iul-quiz/types'
import { TCPA_TEXT } from '@/lib/iul-quiz/types'

type Props = {
  quiz: QuizState
  update: (patch: Partial<QuizState>) => void
  goTo: (step: number) => void
}

const PHONE_RE = /^\d{10}$/

export function Step9Phone({ quiz, update, goTo }: Props) {
  const [phone, setPhone] = useState(quiz.phone)
  const [countryCode, setCountryCode] = useState(quiz.countryCode)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  async function submit() {
    const digits = phone.replace(/\D/g, '')
    if (!PHONE_RE.test(digits)) {
      setError('Please enter a valid 10-digit phone number')
      return
    }
    setError('')
    setSending(true)

    const fullPhone = `${countryCode}${digits}`

    try {
      const res = await fetch('/api/iul-quiz/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullPhone }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || 'Could not send verification code. Please try again.')
        setSending(false)
        return
      }

      update({ phone: digits, countryCode })
      goTo(10)
    } catch {
      setError('Network error. Please try again.')
      setSending(false)
    }
  }

  return (
    <>
      <h2>What&rsquo;s the best number to reach you?</h2>
      <div className="iul-form-group">
        <div className="iul-phone-row">
          <select
            className="iul-select"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            <option value="+1">+1</option>
          </select>
          <input
            type="tel"
            className="iul-input"
            placeholder="(555) 123-4567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            autoFocus
          />
        </div>
        {error && <p className="iul-error">{error}</p>}
      </div>
      <button
        type="button"
        className="iul-cta"
        onClick={submit}
        disabled={sending}
      >
        {sending ? 'Sending code\u2026' : 'Confirm My Number'}
      </button>
      <p className="iul-tcpa">
        {TCPA_TEXT.replace('{cta}', 'Confirm My Number')}
      </p>
    </>
  )
}
