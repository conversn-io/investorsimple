import { LeadFunnelForm } from '@/components/funnels/LeadFunnelForm'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { FunnelConfig } from '@/content/funnels'

export function LeadFunnelPage({ config }: { config: FunnelConfig }) {
  return (
    <>
      <SiteHeader />
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
                funnelType={config.funnelType}
                ctaLabel={config.cta}
                thankYouPath={config.thankYouPath}
              />
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
