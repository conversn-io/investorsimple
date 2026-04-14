import { useEffect, useRef, useState } from 'react'
import type { QuizState } from '@/lib/iul-quiz/types'
import { TCPA_TEXT } from '@/lib/iul-quiz/types'

type Props = {
  quiz: QuizState
  update: (patch: Partial<QuizState>) => void
  goTo: (step: number) => void
  complete: () => void
}

export function Step10OTPVerify({ quiz, update, goTo, complete }: Props) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [verifying, setVerifying] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function handlePaste(e: React.ClipboardEvent) {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length > 0) {
      e.preventDefault()
      setCode(pasted)
    }
  }

  async function submit() {
    if (code.length !== 6) {
      setError('Please enter the 6-digit code')
      return
    }
    setError('')
    setVerifying(true)

    const fullPhone = `${quiz.countryCode}${quiz.phone}`

    try {
      const res = await fetch('/api/iul-quiz/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullPhone, otp: code }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.verified) {
        setError('Invalid code \u2014 please try again')
        setVerifying(false)
        return
      }

      update({ otpVerified: true, tcpaConsented: true })

      // Fire lead submission
      try {
        await fetch('/api/iul-quiz/submit-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            source: 'investorsimple-iul-finder',
            timestamp: new Date().toISOString(),
            firstName: quiz.firstName,
            lastName: quiz.lastName,
            email: quiz.email,
            phone: quiz.phone,
            countryCode: quiz.countryCode,
            age: quiz.age,
            state: quiz.state,
            primaryGoal: quiz.primaryGoal,
            currentInvestments: quiz.currentInvestments,
            monthlySavings: quiz.monthlySavings,
            canFundMonthly: true,
            otpVerified: true,
            tcpaConsented: true,
          }),
        })
      } catch {
        // Lead submission failure should not block the thank-you screen
      }

      complete()
    } catch {
      setError('Network error. Please try again.')
      setVerifying(false)
    }
  }

  function useDifferentNumber() {
    update({ phone: '', otpVerified: false })
    goTo(9)
  }

  return (
    <>
      <h2>Check your messages</h2>
      <p className="iul-sub">
        We sent a verification code to your number. Enter it below for priority placement.
      </p>
      <div className="iul-form-group">
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          maxLength={6}
          className="iul-otp-input"
          placeholder="000000"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          onPaste={handlePaste}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
        />
        {error && <p className="iul-error">{error}</p>}
      </div>
      <button
        type="button"
        className="iul-cta"
        onClick={submit}
        disabled={verifying}
      >
        {verifying ? 'Verifying\u2026' : 'Verify & Submit'}
      </button>
      <button type="button" className="iul-link-btn" onClick={useDifferentNumber}>
        Use a different number
      </button>
      <p className="iul-tcpa">
        {TCPA_TEXT.replace('{cta}', 'Verify & Submit')}
      </p>
    </>
  )
}
