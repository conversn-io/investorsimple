import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-col">
            <img src="https://www.genspark.ai/api/files/s/jEvdWYbv" alt="InvestorSimple" className="footer-logo" />
            <p className="footer-tagline">Asymmetric opportunity,<br />intelligently contained.</p>
            <div className="social-links">
              <a href="#twitter" aria-label="Twitter"><i className="fab fa-twitter" /></a>
              <a href="#linkedin" aria-label="LinkedIn"><i className="fab fa-linkedin" /></a>
              <a href="#youtube" aria-label="YouTube"><i className="fab fa-youtube" /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Learn</h4>
            <ul className="footer-links">
              <li><a href="/#fundamentals">Investment Fundamentals</a></li>
              <li><a href="/#risk">Risk Management</a></li>
              <li><a href="/#alternatives">Alternative Assets</a></li>
              <li><a href="/#cycles">Market Cycles</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Assets</h4>
            <ul className="footer-links">
              <li><Link href="/assets/precious-metals">Precious Metals</Link></li>
              <li><Link href="/assets/real-estate">Real Estate</Link></li>
              <li><Link href="/assets/private-equity">Private Equity</Link></li>
              <li><Link href="/assets/infrastructure">Infrastructure</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul className="footer-links">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/about#thesis">Our Thesis</Link></li>
              <li><a href="#standards">Editorial Standards</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 InvestorSimple. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Use</a>
            <a href="#disclaimer">Investment Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
