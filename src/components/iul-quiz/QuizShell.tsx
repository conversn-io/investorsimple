'use client'

import { useCallback, useState } from 'react'
import { type QuizState, INITIAL_STATE, STEP_NAMES } from '@/lib/iul-quiz/types'
import { Step0Intro } from './steps/Step0Intro'
import { Step1Goal } from './steps/Step1Goal'
import { Step2Investments } from './steps/Step2Investments'
import { Step3MonthlySavings } from './steps/Step3MonthlySavings'
import { Step4FundingGate } from './steps/Step4FundingGate'
import { Step4Disqualified } from './steps/Step4Disqualified'
import { Step5Age } from './steps/Step5Age'
import { Step6State } from './steps/Step6State'
import { Step7Name } from './steps/Step7Name'
import { Step8Email } from './steps/Step8Email'
import { Step9Phone } from './steps/Step9Phone'
import { Step10OTPVerify } from './steps/Step10OTPVerify'
import { StepThankYou } from './steps/StepThankYou'

function pushDataLayer(data: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
    w.dataLayer = w.dataLayer || []
    w.dataLayer.push(data)
  }
}

export function QuizShell() {
  const [quiz, setQuiz] = useState<QuizState>(INITIAL_STATE)

  const update = useCallback((patch: Partial<QuizState>) => {
    setQuiz((prev) => ({ ...prev, ...patch }))
  }, [])

  const goTo = useCallback(
    (step: number) => {
      setQuiz((prev) => {
        const next = { ...prev, step }
        if (STEP_NAMES[step]) {
          pushDataLayer({
            event: 'iul_quiz_step',
            step,
            stepName: STEP_NAMES[step],
          })
        }
        return next
      })
    },
    []
  )

  const disqualify = useCallback(() => {
    pushDataLayer({ event: 'iul_quiz_disqualified', reason: 'no_funding' })
    setQuiz((prev) => ({ ...prev, disqualified: true }))
  }, [])

  const complete = useCallback(() => {
    pushDataLayer({
      event: 'iul_quiz_complete',
      primaryGoal: quiz.primaryGoal,
      monthlySavings: quiz.monthlySavings,
      state: quiz.state,
    })
    setQuiz((prev) => ({ ...prev, step: 11 }))
  }, [quiz.primaryGoal, quiz.monthlySavings, quiz.state])

  // Disqualified screen — no progress bar
  if (quiz.disqualified) {
    return (
      <div className="iul-page">
        <div className="iul-shell">
          <div className="iul-card" key="disqualified">
            <Step4Disqualified />
          </div>
        </div>
      </div>
    )
  }

  const showProgress = quiz.step >= 1 && quiz.step <= 10
  const progress = showProgress ? (quiz.step / 10) * 100 : 0

  return (
    <div className="iul-page">
      <div className="iul-shell">
        {showProgress && (
          <div className="iul-progress">
            <div className="iul-progress-label">
              <span>Step {quiz.step} of 10</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="iul-progress-track">
              <div className="iul-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        <div className="iul-card" key={quiz.step}>
          {quiz.step === 0 && <Step0Intro onNext={() => goTo(1)} />}
          {quiz.step === 1 && <Step1Goal quiz={quiz} update={update} goTo={goTo} />}
          {quiz.step === 2 && <Step2Investments quiz={quiz} update={update} goTo={goTo} />}
          {quiz.step === 3 && <Step3MonthlySavings quiz={quiz} update={update} goTo={goTo} />}
          {quiz.step === 4 && <Step4FundingGate update={update} goTo={goTo} disqualify={disqualify} />}
          {quiz.step === 5 && <Step5Age quiz={quiz} update={update} goTo={goTo} />}
          {quiz.step === 6 && <Step6State quiz={quiz} update={update} goTo={goTo} />}
          {quiz.step === 7 && <Step7Name quiz={quiz} update={update} goTo={goTo} />}
          {quiz.step === 8 && <Step8Email quiz={quiz} update={update} goTo={goTo} />}
          {quiz.step === 9 && <Step9Phone quiz={quiz} update={update} goTo={goTo} />}
          {quiz.step === 10 && <Step10OTPVerify quiz={quiz} update={update} goTo={goTo} complete={complete} />}
          {quiz.step === 11 && <StepThankYou />}
        </div>
      </div>
    </div>
  )
}
