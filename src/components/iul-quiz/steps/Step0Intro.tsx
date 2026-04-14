export function Step0Intro({ onNext }: { onNext: () => void }) {
  return (
    <div className="iul-intro">
      <h2>Find Your Perfect IUL Structure</h2>
      <p className="iul-sub">
        Answer a few quick questions. We&rsquo;ll match you with the right strategy
        and book your free session.
      </p>
      <button type="button" className="iul-cta" onClick={onNext}>
        Begin Assessment &rarr;
      </button>
    </div>
  )
}
