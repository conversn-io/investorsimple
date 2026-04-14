import type { QuizState } from '@/lib/iul-quiz/types'

const OPTIONS = [
  'Less than $300',
  '$300 \u2013 $500',
  '$500 \u2013 $1,000',
  '$1,000+',
]

type Props = {
  quiz: QuizState
  update: (patch: Partial<QuizState>) => void
  goTo: (step: number) => void
}

export function Step3MonthlySavings({ quiz, update, goTo }: Props) {
  function select(value: string) {
    update({ monthlySavings: value })
    setTimeout(() => goTo(4), 120)
  }

  return (
    <>
      <h2>How much do you set aside in savings each month?</h2>
      <div className="iul-tiles">
        {OPTIONS.map((opt) => (
          <button
            key={opt}
            type="button"
            className={`iul-tile${quiz.monthlySavings === opt ? ' is-selected' : ''}`}
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
