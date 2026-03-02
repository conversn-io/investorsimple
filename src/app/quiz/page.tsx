import { InvestorQuizForm } from '@/components/quiz/InvestorQuizForm'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'

export default function QuizPage() {
  return (
    <>
      <SiteHeader />
      <main style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">Investor Qualification Quiz</h1>
            <p className="section-subtitle">Capture preferences, verify contact info, and route the lead to CallReady + GHL.</p>
          </div>
          <div className="newsletter-form" style={{ maxWidth: '720px', margin: '0 auto' }}>
            <InvestorQuizForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
