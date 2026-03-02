export type AssetSlug = 'precious-metals' | 'real-estate' | 'private-equity' | 'infrastructure'

export interface AssetPageContent {
  slug: AssetSlug
  heroClass: string
  iconClass: string
  title: string
  lead: string
  description: string
  whyTitle: string
  reasons: { icon: string; title: string; body: string }[]
}

export const assets: Record<AssetSlug, AssetPageContent> = {
  'precious-metals': {
    slug: 'precious-metals',
    heroClass: 'precious-metals-hero',
    iconClass: 'fas fa-coins',
    title: 'Precious Metals',
    lead: 'Physical gold, silver, and platinum as portfolio anchors. Downside protection with no counterparty risk.',
    description:
      'Precious metals investments include physical gold, silver, platinum, and palladium. They function as portfolio insurance against inflation, currency debasement, and financial instability while preserving purchasing power over long cycles.',
    whyTitle: 'Why Invest in Precious Metals in 2026?',
    reasons: [
      { icon: 'fas fa-shield-alt', title: 'Proven Inflation Protection', body: 'Gold has historically preserved purchasing power during inflationary periods and monetary regime shifts.' },
      { icon: 'fas fa-chart-line', title: 'Portfolio Diversification', body: 'Precious metals often behave differently than equities in stressed markets, improving resilience.' },
      { icon: 'fas fa-ban', title: 'Zero Counterparty Risk', body: 'Physical ownership avoids dependence on institutional solvency.' },
      { icon: 'fas fa-globe', title: 'Global Liquidity', body: 'Gold and silver are universally recognized and traded in deep global markets.' },
    ],
  },
  'real-estate': {
    slug: 'real-estate',
    heroClass: 'real-estate-hero',
    iconClass: 'fas fa-building',
    title: 'Real Estate',
    lead: 'Cash-flowing properties and REITs. Tangible assets with intrinsic utility and income generation.',
    description:
      'Real estate investing combines yield and appreciation through residential, commercial, and specialized properties. It provides inflation-sensitive rents, tax advantages, and leverage, with both active and passive implementation paths.',
    whyTitle: 'Why Invest in Real Estate in 2026?',
    reasons: [
      { icon: 'fas fa-coins', title: 'Consistent Cash Flow', body: 'Rental income can provide recurring monthly yield and long-duration income visibility.' },
      { icon: 'fas fa-chart-line', title: 'Inflation Hedge', body: 'Rents and replacement costs typically reprice higher over long inflationary cycles.' },
      { icon: 'fas fa-balance-scale', title: 'Leverage + Tax Structure', body: 'Debt financing and depreciation can materially improve after-tax return profiles.' },
      { icon: 'fas fa-house', title: 'Tangible Utility', body: 'Properties retain utility value because people and businesses require space.' },
    ],
  },
  'private-equity': {
    slug: 'private-equity',
    heroClass: 'private-equity-hero',
    iconClass: 'fas fa-chart-line',
    title: 'Private Equity',
    lead: 'Direct ownership in private enterprises. Long-term capital stewardship beyond public markets.',
    description:
      'Private equity provides access to privately held companies where value can be created through operational execution, governance improvements, and strategic growth. It introduces illiquidity but can offer differentiated return drivers.',
    whyTitle: 'Why Invest in Private Equity?',
    reasons: [
      { icon: 'fas fa-trophy', title: 'Historical Outperformance Potential', body: 'Top managers have historically exceeded broad public equity benchmarks over long periods.' },
      { icon: 'fas fa-rocket', title: 'Private Growth Access', body: 'Investors can access value creation before businesses are listed publicly.' },
      { icon: 'fas fa-screwdriver-wrench', title: 'Operational Value Creation', body: 'Hands-on strategy, cost discipline, and management upgrades drive outcomes beyond multiple expansion.' },
      { icon: 'fas fa-hourglass-half', title: 'Illiquidity Premium', body: 'Longer capital lockups can be rewarded with higher expected returns.' },
    ],
  },
  infrastructure: {
    slug: 'infrastructure',
    heroClass: 'infrastructure-hero',
    iconClass: 'fas fa-road',
    title: 'Infrastructure',
    lead: 'Essential services and utilities. Predictable cash flows with high barriers to entry.',
    description:
      'Infrastructure assets include utilities, transport, communications, and energy systems. Revenues are often contractual or regulated, creating relatively stable long-horizon cash flow with inflation pass-through mechanisms.',
    whyTitle: 'Why Invest in Infrastructure Assets?',
    reasons: [
      { icon: 'fas fa-money-bill-wave', title: 'Predictable Cash Flows', body: 'Long contracts and regulated return structures support recurring distributions.' },
      { icon: 'fas fa-temperature-high', title: 'Inflation Linkage', body: 'Many assets include CPI-linked escalation clauses or periodic rate resets.' },
      { icon: 'fas fa-city', title: 'Barrier-Protected Markets', body: 'Capital intensity and regulation create durable competitive moats.' },
      { icon: 'fas fa-shield-heart', title: 'Defensive Diversifier', body: 'Essential-service demand can make infrastructure more resilient across cycles.' },
    ],
  },
}

export const assetOrder: AssetSlug[] = ['precious-metals', 'real-estate', 'private-equity', 'infrastructure']
