'use client'

import { FormEvent, useState } from 'react'

export function NewsletterForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="form-success">
        <i className="fas fa-check-circle" />
        <h3>Welcome to InvestorSimple</h3>
        <p>Check your email for confirmation and your first insights.</p>
      </div>
    )
  }

  return (
    <form id="newsletterForm" onSubmit={onSubmit}>
      <div className="form-group">
        <input type="email" id="email" placeholder="Your email address" required />
      </div>
      <div className="form-group">
        <label className="checkbox-label">
          <input type="checkbox" id="interests" />
          <span>I&apos;m interested in: <strong>Precious Metals, Real Estate, Private Equity</strong></span>
        </label>
      </div>
      <button type="submit" className="btn btn-primary btn-block">Subscribe Now</button>
      <p className="form-disclaimer">No spam. Unsubscribe anytime. Your data is protected.</p>
    </form>
  )
}
