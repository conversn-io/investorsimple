import { useState } from 'react'
import type { QuizState } from '@/lib/iul-quiz/types'

type Props = {
  quiz: QuizState
  update: (patch: Partial<QuizState>) => void
  goTo: (step: number) => void
}

export function Step7Name({ quiz, update, goTo }: Props) {
  const [first, setFirst] = useState(quiz.firstName)
  const [last, setLast] = useState(quiz.lastName)
  const [error, setError] = useState('')

  function submit() {
    if (first.trim().length < 2 || last.trim().length < 2) {
      setError('Please enter your full name (at least 2 characters each)')
      return
    }
    setError('')
    update({ firstName: first.trim(), lastName: last.trim() })
    goTo(8)
  }

  return (
    <>
      <h2>What&rsquo;s your name?</h2>
      <div className="iul-form-group">
        <div className="iul-form-row">
          <input
            className="iul-input"
            placeholder="First name"
            value={first}
            onChange={(e) => setFirst(e.target.value)}
            autoFocus
          />
          <input
            className="iul-input"
            placeholder="Last name"
            value={last}
            onChange={(e) => setLast(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
          />
        </div>
        {error && <p className="iul-error">{error}</p>}
      </div>
      <button type="button" className="iul-cta" onClick={submit}>
        Next Step &rarr;
      </button>
    </>
  )
}
