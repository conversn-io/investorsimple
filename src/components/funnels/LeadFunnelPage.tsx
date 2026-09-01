import Link from 'next/link'
import { LeadFunnelForm } from '@/components/funnels/LeadFunnelForm'
import { FunnelConfig } from '@/content/funnels'

export function LeadFunnelPage({ config }: { config: FunnelConfig }) {
  return (
    <>
      <nav className="wl-nav">
        <div className="wl-nav-inner">
          <Link href="/" aria-label="InvestorSimple home">
            <img src="/InvestorSimple-Logo.png" alt="InvestorSimple" className="wl-nav-logo" />
          </Link>
        </div>
      </nav>
      <main className="wl-page-wrap">
        <section className="wl-hero">
          <div className="wl-shell">
            <div className="wl-copy">
              <span className="wl-kicker">InvestorSimple Special Report</span>
              <h1>{config.headline}</h1>
              <p>{config.subheadline}</p>
              <div className="wl-benefits">
                <h3>{config.offerTitle}</h3>
                <ul>
                  {config.offerBullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="wl-panel">
              <div className="wl-image-wrap">
                <img src={config.heroImage} alt={config.headline} />
              </div>
              <LeadFunnelForm
                slug={config.slug}
                funnelType={config.funnelType}
                ctaLabel={config.cta}
                thankYouPath={config.thankYouPath}
              />
            </aside>
          </div>
        </section>
      </main>
      <footer className="wl-footer">
        <div className="wl-footer-inner">
          <p>&copy; 2026 InvestorSimple. All rights reserved.</p>
          <div className="wl-footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Use</a>
          </div>
        </div>
      </footer>
    </>
  )
}
