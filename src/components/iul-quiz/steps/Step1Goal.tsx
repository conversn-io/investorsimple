import type { QuizState } from '@/lib/iul-quiz/types'

const OPTIONS = [
  'Long-Term Cash Value Growth',
  'Policy-Backed Borrowing',
  'Family Protection',
  'Tax-Advantaged Retirement Income',
]

type Props = {
  quiz: QuizState
  update: (patch: Partial<QuizState>) => void
  goTo: (step: number) => void
}

export function Step1Goal({ quiz, update, goTo }: Props) {
  function select(value: string) {
    update({ primaryGoal: value })
    setTimeout(() => goTo(2), 120)
  }

  return (
    <>
      <h2>What is your primary objective?</h2>
      <div className="iul-tiles">
        {OPTIONS.map((opt) => (
          <button
            key={opt}
            type="button"
            className={`iul-tile${quiz.primaryGoal === opt ? ' is-selected' : ''}`}
            onClick={() => select(opt)}
          >
            <span>{opt}</span>
            <span className="iul-tile-arrow">&rsaquo;</span>
          </button>
        ))}
      </div>
    </>
  )
}
