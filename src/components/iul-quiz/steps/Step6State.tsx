import { useState } from 'react'
import type { QuizState } from '@/lib/iul-quiz/types'
import { US_STATES } from '@/lib/iul-quiz/types'

type Props = {
  quiz: QuizState
  update: (patch: Partial<QuizState>) => void
  goTo: (step: number) => void
}

export function Step6State({ quiz, update, goTo }: Props) {
  const [error, setError] = useState('')
  const [value, setValue] = useState(quiz.state)

  function submit() {
    if (!value) {
      setError('Please select your state')
      return
    }
    setError('')
    update({ state: value })
    goTo(7)
  }

  return (
    <>
      <h2>What state do you reside in?</h2>
      <div className="iul-form-group">
        <select
          className="iul-select"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          <option value="">Select your state</option>
          {US_STATES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {error && <p className="iul-error">{error}</p>}
      </div>
      <button type="button" className="iul-cta" onClick={submit}>
        Next Step &rarr;
      </button>
    </>
  )
}
