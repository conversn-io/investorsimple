import type { QuizState } from '@/lib/iul-quiz/types'

const OPTIONS = [
  '401(k)',
  'IRA / Roth IRA',
  'Cash Savings',
  'Active Trading Account',
  'Self-Directed Brokerage',
]

type Props = {
  quiz: QuizState
  update: (patch: Partial<QuizState>) => void
  goTo: (step: number) => void
}

export function Step2Investments({ quiz, update, goTo }: Props) {
  function toggle(value: string) {
    const current = quiz.currentInvestments
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    update({ currentInvestments: next })
  }

  return (
    <>
      <h2>Which of the following do you currently hold?</h2>
      <p className="iul-sub">Select all that apply, or skip if none.</p>
      <div className="iul-tiles">
        {OPTIONS.map((opt) => {
          const selected = quiz.currentInvestments.includes(opt)
          return (
            <button
              key={opt}
              type="button"
              className={`iul-tile${selected ? ' is-selected' : ''}`}
              onClick={() => toggle(opt)}
            >
              <span>{opt}</span>
              <span className="iul-tile-check">{selected ? '\u2713' : ''}</span>
            </button>
          )
        })}
      </div>
      <button type="button" className="iul-cta" onClick={() => goTo(3)}>
        Next Step &rarr;
      </button>
    </>
  )
}
