import { useState } from 'react'
import type { QuizState } from '@/lib/iul-quiz/types'

type Props = {
  quiz: QuizState
  update: (patch: Partial<QuizState>) => void
  goTo: (step: number) => void
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Step8Email({ quiz, update, goTo }: Props) {
  const [value, setValue] = useState(quiz.email)
  const [error, setError] = useState('')

  function submit() {
    if (!EMAIL_RE.test(value)) {
      setError('Please enter a valid email address')
      return
    }
    setError('')
    update({ email: value.trim() })
    goTo(9)
  }

  return (
    <>
      <h2>What&rsquo;s your best email address?</h2>
      <div className="iul-form-group">
        <input
          type="email"
          className="iul-input"
          placeholder="your@email.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          autoFocus
        />
        {error && <p className="iul-error">{error}</p>}
      </div>
      <button type="button" className="iul-cta" onClick={submit}>
        Next Step &rarr;
      </button>
    </>
  )
}
