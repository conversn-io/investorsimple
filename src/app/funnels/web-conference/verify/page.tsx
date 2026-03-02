import { FunnelOtpVerificationPage } from '@/components/funnels/FunnelOtpVerificationPage'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'

export default function WebConferenceVerifyPage() {
  return (
    <>
      <SiteHeader />
      <FunnelOtpVerificationPage funnelLabel="conference" />
      <SiteFooter />
    </>
  )
}
