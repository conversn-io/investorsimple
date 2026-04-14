import { useState } from 'react'
import type { QuizState } from '@/lib/iul-quiz/types'

type Props = {
  quiz: QuizState
  update: (patch: Partial<QuizState>) => void
  goTo: (step: number) => void
}

export function Step5Age({ quiz, update, goTo }: Props) {
  const [error, setError] = useState('')
  const [value, setValue] = useState(quiz.age !== null ? String(quiz.age) : '')

  function submit() {
    const num = parseInt(value, 10)
    if (isNaN(num) || num < 18 || num > 85) {
      setError('Please enter a valid age between 18 and 85')
      return
    }
    setError('')
    update({ age: num })
    goTo(6)
  }

  return (
    <>
      <h2>What is your current age?</h2>
      <div className="iul-form-group">
        <input
          type="number"
          className="iul-input"
          placeholder="Enter your age"
          min={18}
          max={85}
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
