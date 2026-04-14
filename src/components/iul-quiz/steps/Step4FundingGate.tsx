import type { QuizState } from '@/lib/iul-quiz/types'

type Props = {
  update: (patch: Partial<QuizState>) => void
  goTo: (step: number) => void
  disqualify: () => void
}

export function Step4FundingGate({ update, goTo, disqualify }: Props) {
  function selectYes() {
    update({ canFundMonthly: true })
    setTimeout(() => goTo(5), 120)
  }

  function selectNo() {
    update({ canFundMonthly: false })
    setTimeout(() => disqualify(), 120)
  }

  return (
    <>
      <h2>Are you in a position to fund an IUL monthly to build cash value?</h2>
      <div className="iul-tiles">
        <button type="button" className="iul-tile" onClick={selectYes}>
          <span>Yes &mdash; I can commit to a monthly plan</span>
          <span className="iul-tile-arrow">&rsaquo;</span>
        </button>
        <button type="button" className="iul-tile" onClick={selectNo}>
          <span>No &mdash; I need immediate financial assistance</span>
          <span className="iul-tile-arrow">&rsaquo;</span>
        </button>
      </div>
    </>
  )
}
