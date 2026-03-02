import Link from 'next/link'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'

type FunnelThankYouProps = {
  title: string
  subtitle: string
}

export function FunnelThankYouPage({ title, subtitle }: FunnelThankYouProps) {
  return (
    <>
      <SiteHeader />
      <main className="wl-thankyou-wrap">
        <section className="wl-thankyou-card">
          <span className="wl-kicker">Request Received</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>

          <div className="wl-next-steps">
            <h3>Next Steps</h3>
            <ol>
              <li>Check your email for your requested resource and confirmation details.</li>
              <li>Keep your phone nearby in case a strategist calls to confirm fit.</li>
              <li>Review your current allocations and top questions before your next conversation.</li>
            </ol>
          </div>

          <div className="wl-actions">
            <Link className="btn btn-primary" href="/quiz">Take Full Investor Quiz</Link>
            <Link className="btn btn-secondary" href="/articles">Read Latest Insights</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
