'use client'

import Link from 'next/link'
import { useState } from 'react'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar" id="navbar">
      <div className="nav-container">
        <Link href="/" className="nav-logo" aria-label="InvestorSimple home">
          <img src="https://www.genspark.ai/api/files/s/CPNKYPxL" alt="InvestorSimple" className="logo-dark" />
          <img src="https://www.genspark.ai/api/files/s/jEvdWYbv" alt="InvestorSimple" className="logo-light" />
        </Link>

        <button
          className={`nav-toggle ${open ? 'active' : ''}`}
          id="navToggle"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`nav-menu ${open ? 'active' : ''}`} id="navMenu">
          <li><Link href="/" className="nav-link">Home</Link></li>
          <li className="nav-dropdown">
            <a href="/#learn" className="nav-link">Learn <i className="fas fa-chevron-down" /></a>
            <ul className="dropdown-menu">
              <li><a href="/#fundamentals">Investment Fundamentals</a></li>
              <li><a href="/#risk">Risk Management</a></li>
              <li><a href="/#alternatives">Alternative Assets</a></li>
              <li><a href="/#cycles">Market Cycles</a></li>
            </ul>
          </li>
          <li className="nav-dropdown">
            <a href="/#assets" className="nav-link">Assets <i className="fas fa-chevron-down" /></a>
            <ul className="dropdown-menu">
              <li><Link href="/assets/precious-metals">Precious Metals</Link></li>
              <li><Link href="/assets/real-estate">Real Estate</Link></li>
              <li><Link href="/assets/private-equity">Private Equity</Link></li>
              <li><Link href="/assets/infrastructure">Infrastructure</Link></li>
            </ul>
          </li>
          <li><a href="/#insights" className="nav-link">Insights</a></li>
          <li><a href="/#tools" className="nav-link">Tools</a></li>
          <li><Link href="/about" className="nav-link">About</Link></li>
        </ul>

        <a href="/#newsletter" className="btn-cta">Subscribe</a>
      </div>
    </nav>
  )
}
