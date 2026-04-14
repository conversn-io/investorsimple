import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IUL Strategy Finder | InvestorSimple',
  description:
    'Find your perfect IUL structure. Answer a few quick questions and get matched with a strategy session — free.',
}

export default function IulFinderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
