export function StepThankYou() {
  return (
    <div className="iul-thankyou">
      <h2>You&rsquo;re confirmed. We&rsquo;ll be in touch.</h2>
      <p className="iul-sub">Here&rsquo;s what happens next:</p>

      <ol className="iul-steps-list">
        <li>
          <span className="iul-step-num">1</span>
          <span>We review your information within 24 hours.</span>
        </li>
        <li>
          <span className="iul-step-num">2</span>
          <span>
            An A+ rated IUL specialist will reach out to schedule your strategy session.
          </span>
        </li>
        <li>
          <span className="iul-step-num">3</span>
          <span>
            In your session, we&rsquo;ll structure an IUL strategy aligned with your
            goals and risk profile.
          </span>
        </li>
      </ol>

      <p className="iul-closing">
        We&rsquo;re looking forward to helping you build lasting, protected wealth.
      </p>

      {/* CALENDAR_EMBED — Phase 2: drop Calendly or Cal.com widget here */}
    </div>
  )
}
