import { FunnelOtpVerificationPage } from '@/components/funnels/FunnelOtpVerificationPage'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'

export default function KitGuideVerifyPage() {
  return (
    <>
      <SiteHeader />
      <FunnelOtpVerificationPage funnelLabel="guide" />
      <SiteFooter />
    </>
  )
}
