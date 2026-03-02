import Link from 'next/link'
import { AssetPageContent, assetOrder } from '@/content/assets'

export function AssetPage({ asset }: { asset: AssetPageContent }) {
  const otherAssets = assetOrder.filter((slug) => slug !== asset.slug)

  return (
    <>
      <section className={`asset-hero ${asset.heroClass}`}>
        <div className="asset-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <a href="/#assets">Assets</a>
            <span>/</span>
            <span>{asset.title}</span>
          </div>
          <div className="asset-icon-large">
            <i className={asset.iconClass} />
          </div>
          <h1 className="asset-hero-title">{asset.title}</h1>
          <p className="asset-hero-lead">{asset.lead}</p>
        </div>
      </section>

      <article className="asset-content">
        <div className="asset-container">
          <section className="asset-section">
            <h2 className="section-heading">What Is {asset.title} Investing?</h2>
            <p className="lead-text">{asset.description}</p>
          </section>

          <section className="asset-section">
            <h2 className="section-heading">{asset.whyTitle}</h2>
            <div className="reason-grid">
              {asset.reasons.map((reason) => (
                <div className="reason-card" key={reason.title}>
                  <div className="reason-icon">
                    <i className={reason.icon} />
                  </div>
                  <h3>{reason.title}</h3>
                  <p>{reason.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="asset-section takeaways-section">
            <h2 className="section-heading">Key Takeaways</h2>
            <div className="takeaways-grid">
              <div className="takeaway-item"><span className="takeaway-number">1</span><p>Prioritize <strong>downside structure</strong> before upside expectations.</p></div>
              <div className="takeaway-item"><span className="takeaway-number">2</span><p>Size positions relative to liquidity, volatility, and time horizon.</p></div>
              <div className="takeaway-item"><span className="takeaway-number">3</span><p>Use this asset as part of a <strong>portfolio system</strong>, not an isolated bet.</p></div>
              <div className="takeaway-item"><span className="takeaway-number">4</span><p>Evaluate in multi-year cycles, not short-term market narratives.</p></div>
            </div>
          </section>

          <section className="asset-cta">
            <h2>Explore Other Alternative Assets</h2>
            <div className="asset-nav-grid">
              {otherAssets.map((slug) => {
                const label = slug.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())
                const icon = slug === 'real-estate' ? 'fas fa-building' : slug === 'private-equity' ? 'fas fa-chart-line' : slug === 'infrastructure' ? 'fas fa-road' : 'fas fa-coins'
                return (
                  <Link href={`/assets/${slug}`} className="asset-nav-card" key={slug}>
                    <i className={icon} />
                    <h3>{label}</h3>
                    <p>View {label} guide</p>
                  </Link>
                )
              })}
            </div>
          </section>
        </div>
      </article>
    </>
  )
}
