import { InvestorQuizForm } from '@/components/quiz/InvestorQuizForm'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'

export default function QuizPage() {
  return (
    <>
      <SiteHeader />
      <main className="quiz-page-wrap">
        <div className="quiz-page-inner">
          <span className="quiz-kicker">2-Minute Assessment</span>
          <h1 className="quiz-title">Find Your Best Investor Strategy Match</h1>
          <p className="quiz-subtitle">
            Structured like top-performing lead funnels: fast one-question steps, clear progress, and instant advisor routing after verification.
          </p>
          <div className="newsletter-form">
            <InvestorQuizForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
