export type FunnelConfig = {
  slug: 'kit-guide' | 'web-conference'
  funnelType: string
  headline: string
  subheadline: string
  offerTitle: string
  offerBullets: string[]
  cta: string
  thankYouPath: string
  heroImage: string
}

export const funnelConfigs: Record<FunnelConfig['slug'], FunnelConfig> = {
  'kit-guide': {
    slug: 'kit-guide',
    funnelType: 'investor_kit_guide',
    headline: 'Claim Your Free Alternative Asset Guide',
    subheadline:
      'Get a concise breakdown of how precious metals, real assets, and defensive allocations can fit into long-term retirement planning.',
    offerTitle: 'What You Receive',
    offerBullets: [
      'Step-by-step IRA rollover and account structure overview',
      'Risk-first allocation framework for uncertain markets',
      'Fee, liquidity, and custody checklist before committing capital',
      'Tax and timing considerations to discuss with your advisor',
    ],
    cta: 'Send Me the Free Guide',
    thankYouPath: '/funnels/kit-guide/thank-you',
    heroImage:
      'https://images.unsplash.com/photo-1554224155-3a589877462f?w=1200&h=900&fit=crop',
  },
  'web-conference': {
    slug: 'web-conference',
    funnelType: 'investor_web_conference',
    headline: 'Reserve Your One-on-One Market Briefing',
    subheadline:
      'Book a private strategy call to review inflation, interest-rate risk, and where alternative assets may improve your downside protection.',
    offerTitle: 'What We Cover On The Call',
    offerBullets: [
      'Portfolio stress points and concentration risk',
      'How precious metals and real assets behave across cycles',
      'Rollover timeline, minimums, and execution steps',
      'A clear action plan based on your risk profile and horizon',
    ],
    cta: 'Reserve My Briefing',
    thankYouPath: '/funnels/web-conference/thank-you',
    heroImage:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=900&fit=crop',
  },
}
