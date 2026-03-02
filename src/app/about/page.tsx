import Link from 'next/link'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="about-hero">
          <div className="about-hero-content">
            <div className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>About</span>
            </div>
            <h1 className="about-hero-title">About InvestorSimple</h1>
            <p className="about-hero-lead">An independent editorial platform focused on helping investors think clearly about risk, capital, and long-term wealth.</p>
          </div>
        </section>

        <article className="about-content" id="thesis">
          <div className="about-container">
            <section className="about-section">
              <p className="lead-paragraph">In a financial world dominated by hype, speed, and speculation, we take a different approach. We believe the most durable investment outcomes come not from chasing the next opportunity, but from understanding how downside behaves, how cycles work, and how capital is best protected over time.</p>
            </section>

            <section className="about-section">
              <h2 className="section-heading">Our Approach</h2>
              <p>Our work is grounded in principles long used by institutional investors and family offices: respect for risk, preference for structure over prediction, and an emphasis on assets with tangible value or reliable cash flow.</p>
            </section>

            <section className="about-section about-callout">
              <div className="callout-content">
                <h3>InvestorSimple is not a trading platform.</h3>
                <p>We do not offer stock tips, market predictions, or financial entertainment.</p>
              </div>
            </section>

            <section className="about-section">
              <h2 className="section-heading">Our Focus</h2>
              <p>We focus on frameworks: how assets behave across cycles, how narratives distort decisions, and how portfolios can be built to endure uncertainty.</p>
              <div className="focus-grid">
                <div className="focus-item"><div className="focus-icon"><i className="fas fa-shield-alt" /></div><h4>Risk-First Thinking</h4><p>Understand downside behavior across market environments.</p></div>
                <div className="focus-item"><div className="focus-icon"><i className="fas fa-sync-alt" /></div><h4>Cycle Awareness</h4><p>Evaluate performance across full economic regimes.</p></div>
                <div className="focus-item"><div className="focus-icon"><i className="fas fa-layer-group" /></div><h4>Structural Analysis</h4><p>Focus on durable setups and asymmetry over prediction.</p></div>
                <div className="focus-item"><div className="focus-icon"><i className="fas fa-landmark" /></div><h4>Tangible Value</h4><p>Prioritize assets with utility, cash flow, or real scarcity.</p></div>
              </div>
            </section>

            <section className="about-section about-philosophy">
              <blockquote className="about-quote">
                <p>&quot;We believe wealth is built by staying in the game, not by swinging harder.&quot;</p>
              </blockquote>
              <p>By prioritizing clarity over noise and discipline over excitement, InvestorSimple helps investors make better long-term decisions.</p>
            </section>

            <section className="about-section">
              <h2 className="section-heading">What We Cover</h2>
              <div className="coverage-list">
                <div className="coverage-item"><h4>Alternative Investments</h4><p>Precious metals, real estate, private equity, and infrastructure.</p></div>
                <div className="coverage-item"><h4>Capital Preservation</h4><p>Structures designed to protect wealth across market conditions.</p></div>
                <div className="coverage-item"><h4>Risk Frameworks</h4><p>Downside, position sizing, portfolio construction, and asymmetry.</p></div>
                <div className="coverage-item"><h4>Market Cycles</h4><p>How opportunity and narrative change across regimes.</p></div>
                <div className="coverage-item"><h4>Financial Structures</h4><p>Tax-aware vehicles and long-term wealth architecture.</p></div>
                <div className="coverage-item"><h4>Behavioral Finance</h4><p>How bias and emotion influence investment outcomes.</p></div>
              </div>
            </section>

            <section className="about-section">
              <h2 className="section-heading">What We Don&apos;t Do</h2>
              <div className="dont-list">
                <div className="dont-item"><i className="fas fa-times-circle" /><span>Stock tips or trade recommendations</span></div>
                <div className="dont-item"><i className="fas fa-times-circle" /><span>Market predictions or timing signals</span></div>
                <div className="dont-item"><i className="fas fa-times-circle" /><span>Hype-driven or speculative content</span></div>
                <div className="dont-item"><i className="fas fa-times-circle" /><span>Financial entertainment or clickbait</span></div>
                <div className="dont-item"><i className="fas fa-times-circle" /><span>Get-rich-quick schemes</span></div>
                <div className="dont-item"><i className="fas fa-times-circle" /><span>Personalized financial advice</span></div>
              </div>
            </section>

            <section className="about-section about-commitment">
              <h2 className="section-heading">Our Commitment</h2>
              <div className="commitment-grid">
                <div className="commitment-item"><h4>Editorial Independence</h4><p>Analysis-driven perspective over product promotion.</p></div>
                <div className="commitment-item"><h4>Intellectual Honesty</h4><p>Clear tradeoffs and uncertainty-aware guidance.</p></div>
                <div className="commitment-item"><h4>Long-Term Focus</h4><p>Content designed to stay useful across full cycles.</p></div>
                <div className="commitment-item"><h4>Accessible Sophistication</h4><p>Institutional thinking without unnecessary jargon.</p></div>
              </div>
            </section>

            <section className="about-cta">
              <h2>Ready to think differently about investing?</h2>
              <p>Join investors who prioritize clarity, discipline, and long-term thinking.</p>
              <div className="cta-buttons">
                <a href="/#newsletter" className="btn btn-primary">Subscribe to Insights</a>
                <a href="/#learn" className="btn btn-secondary">Start Learning</a>
              </div>
            </section>
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  )
}
