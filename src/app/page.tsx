import Link from 'next/link'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { NewsletterForm } from '@/components/home/NewsletterForm'

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Asymmetric opportunity,<br />intelligently contained.</h1>
              <p className="hero-subtitle">Alternative investment education with institutional-quality insights for everyday investors. Understanding risk before return.</p>
              <div className="hero-cta">
                <a href="#learn" className="btn btn-primary">Start Learning</a>
                <Link href="/about" className="btn btn-secondary">Our Thesis</Link>
              </div>
            </div>
            <div className="hero-stats">
              <div className="stat-item"><div className="stat-icon"><i className="fas fa-shield-alt" /></div><div className="stat-content"><h3>Risk First</h3><p>Downside protection before upside potential</p></div></div>
              <div className="stat-item"><div className="stat-icon"><i className="fas fa-landmark" /></div><div className="stat-content"><h3>Tangible Assets</h3><p>Real value over pure abstractions</p></div></div>
              <div className="stat-item"><div className="stat-icon"><i className="fas fa-clock" /></div><div className="stat-content"><h3>Long-Term Thinking</h3><p>Patience as competitive advantage</p></div></div>
            </div>
          </div>
        </section>

        <section className="featured-insights" id="insights">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Featured Insights</h2>
              <p className="section-subtitle">Institutional perspectives on markets, risk, and capital</p>
            </div>
            <div className="insights-grid">
              <article className="insight-card featured"><div className="card-image"><span className="card-tag">Market Analysis</span><img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop" alt="Gold bars" /></div><div className="card-content"><h3>Why Precious Metals Matter in 2026</h3><p>Structural inflation and monetary intervention are features of modern systems, not anomalies.</p><div className="card-meta"><span className="meta-item"><i className="far fa-clock" /> 8 min read</span><span className="meta-item"><i className="far fa-calendar" /> Feb 1, 2026</span></div><a href="#" className="card-link">Read More <i className="fas fa-arrow-right" /></a></div></article>
              <article className="insight-card"><div className="card-image"><span className="card-tag">Risk Management</span><img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop" alt="Financial charts" /></div><div className="card-content"><h3>The Asymmetric Return Framework</h3><p>How to identify investments where downside is defined and upside is not capped.</p><div className="card-meta"><span className="meta-item"><i className="far fa-clock" /> 12 min read</span><span className="meta-item"><i className="far fa-calendar" /> Jan 28, 2026</span></div><a href="#" className="card-link">Read More <i className="fas fa-arrow-right" /></a></div></article>
              <article className="insight-card"><div className="card-image"><span className="card-tag">Alternative Assets</span><img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop" alt="Real estate" /></div><div className="card-content"><h3>Real Assets in an Abstract World</h3><p>Why tangible investments with physical presence and intrinsic utility anchor portfolios.</p><div className="card-meta"><span className="meta-item"><i className="far fa-clock" /> 10 min read</span><span className="meta-item"><i className="far fa-calendar" /> Jan 25, 2026</span></div><a href="#" className="card-link">Read More <i className="fas fa-arrow-right" /></a></div></article>
            </div>
          </div>
        </section>

        <section className="asset-categories" id="assets">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Alternative Asset Categories</h2>
              <p className="section-subtitle">Explore tangible investments with structural advantages</p>
            </div>
            <div className="categories-grid">
              <div className="category-card"><div className="category-icon"><i className="fas fa-coins" /></div><h3>Precious Metals</h3><p>Physical gold, silver, and platinum as portfolio anchors.</p><ul className="category-features"><li><i className="fas fa-check" /> Store of value</li><li><i className="fas fa-check" /> Inflation hedge</li><li><i className="fas fa-check" /> Physical ownership</li></ul><Link href="/assets/precious-metals" className="btn btn-outline">Explore <i className="fas fa-arrow-right" /></Link></div>
              <div className="category-card"><div className="category-icon"><i className="fas fa-building" /></div><h3>Real Estate</h3><p>Cash-flowing properties and REITs with intrinsic utility.</p><ul className="category-features"><li><i className="fas fa-check" /> Cash flow potential</li><li><i className="fas fa-check" /> Tangible value</li><li><i className="fas fa-check" /> Tax advantages</li></ul><Link href="/assets/real-estate" className="btn btn-outline">Explore <i className="fas fa-arrow-right" /></Link></div>
              <div className="category-card"><div className="category-icon"><i className="fas fa-chart-line" /></div><h3>Private Equity</h3><p>Direct ownership in private enterprises with long-term focus.</p><ul className="category-features"><li><i className="fas fa-check" /> Illiquidity premium</li><li><i className="fas fa-check" /> Control rights</li><li><i className="fas fa-check" /> Operational value</li></ul><Link href="/assets/private-equity" className="btn btn-outline">Explore <i className="fas fa-arrow-right" /></Link></div>
              <div className="category-card"><div className="category-icon"><i className="fas fa-road" /></div><h3>Infrastructure</h3><p>Essential services with stable income and high barriers to entry.</p><ul className="category-features"><li><i className="fas fa-check" /> Stable income</li><li><i className="fas fa-check" /> Monopolistic assets</li><li><i className="fas fa-check" /> Long-term contracts</li></ul><Link href="/assets/infrastructure" className="btn btn-outline">Explore <i className="fas fa-arrow-right" /></Link></div>
            </div>
          </div>
        </section>

        <section className="thesis-section" id="about">
          <div className="container">
            <div className="thesis-content">
              <div className="thesis-text" id="learn">
                <span className="thesis-label">Our Editorial Perspective</span>
                <h2 className="thesis-title">Wealth is built by respecting downside, not chasing upside.</h2>
                <p className="thesis-body">InvestorSimple exists because most investing content optimizes for attention, not outcomes.</p>
                <p className="thesis-body">The most durable outcomes come from setups where downside is defined and upside is not capped.</p>
                <div className="thesis-pillars">
                  <div className="pillar" id="fundamentals"><h4>What We&apos;re For</h4><ul><li>Asymmetric risk-return</li><li>Tangible assets over abstractions</li><li>Long-term thinking</li><li>Institutional quality insights</li></ul></div>
                  <div className="pillar" id="risk"><h4>What We&apos;re Skeptical Of</h4><ul><li>Over-diversification</li><li>Index fund absolutism</li><li>Fiat as store of value</li><li>Hype and speculation</li></ul></div>
                </div>
                <Link href="/about" className="btn btn-primary">Read Full Thesis</Link>
              </div>
              <div className="thesis-visual" id="alternatives">
                <div className="protected-ascent">
                  <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg"><path d="M 50 150 L 50 250 Q 50 280 80 280 L 120 280 Q 150 280 150 250 L 150 150" fill="none" stroke="#C9A24D" strokeWidth="3" opacity="0.5" /><path d="M 50 150 Q 100 30 150 150" fill="none" stroke="#C9A24D" strokeWidth="4" /><path d="M 100 30 L 90 50 L 110 50 Z" fill="#C9A24D" /></svg>
                  <p className="visual-caption">Protected Ascent™<br /><small id="cycles">Downside protection with unconstrained upside</small></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="tools-section" id="tools">
          <div className="container">
            <div className="section-header"><h2 className="section-title">Investment Tools</h2><p className="section-subtitle">Practical frameworks for risk-aware decision making</p></div>
            <div className="tools-grid">
              <div className="tool-card"><div className="tool-header"><i className="fas fa-calculator" /><h3>Risk Calculator</h3></div><p>Quantify downside exposure and position sizing based on your tolerance and capital base.</p><a href="#" className="btn btn-text">Launch Tool <i className="fas fa-arrow-right" /></a></div>
              <div className="tool-card"><div className="tool-header"><i className="fas fa-chart-pie" /><h3>Portfolio Analyzer</h3></div><p>Evaluate allocation through asymmetric risk-return and tangible value lenses.</p><a href="#" className="btn btn-text">Launch Tool <i className="fas fa-arrow-right" /></a></div>
              <div className="tool-card"><div className="tool-header"><i className="fas fa-balance-scale" /><h3>Asset Comparator</h3></div><p>Compare alternative assets across risk, liquidity, and return characteristics.</p><a href="#" className="btn btn-text">Launch Tool <i className="fas fa-arrow-right" /></a></div>
              <div className="tool-card"><div className="tool-header"><i className="fas fa-list-check" /><h3>Investment Checklist</h3></div><p>Structured due diligence framework for evaluating alternative investments.</p><a href="#" className="btn btn-text">Launch Tool <i className="fas fa-arrow-right" /></a></div>
            </div>
          </div>
        </section>

        <section className="newsletter-section" id="newsletter">
          <div className="container">
            <div className="newsletter-content">
              <div className="newsletter-text">
                <h2>Institutional insights,<br />delivered weekly.</h2>
                <p>Alternative investment perspectives, risk frameworks, and market analysis. No hype. No speculation. Just structural thinking.</p>
                <ul className="newsletter-benefits">
                  <li><i className="fas fa-check-circle" /> Weekly market analysis</li>
                  <li><i className="fas fa-check-circle" /> Alternative asset research</li>
                  <li><i className="fas fa-check-circle" /> Risk management frameworks</li>
                  <li><i className="fas fa-check-circle" /> Exclusive investment tools</li>
                </ul>
              </div>
              <div className="newsletter-form">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
