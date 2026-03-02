import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'InvestorSimple',
  description:
    'InvestorSimple - Asymmetric opportunity, intelligently contained. Alternative investment education with institutional-quality insights.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
