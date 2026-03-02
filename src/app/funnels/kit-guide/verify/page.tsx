import { FunnelOtpVerificationPage } from '@/components/funnels/FunnelOtpVerificationPage'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { Suspense } from 'react'

export default function KitGuideVerifyPage() {
  return (
    <>
      <SiteHeader />
      <Suspense fallback={<main className="wl-thankyou-wrap"><section className="wl-thankyou-card wl-verify-card"><p>Preparing secure verification...</p></section></main>}>
        <FunnelOtpVerificationPage funnelLabel="guide" />
      </Suspense>
      <SiteFooter />
    </>
  )
}
