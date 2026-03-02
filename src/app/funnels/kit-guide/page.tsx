import { LeadFunnelPage } from '@/components/funnels/LeadFunnelPage'
import { funnelConfigs } from '@/content/funnels'

export default function KitGuideFunnelPage() {
  return <LeadFunnelPage config={funnelConfigs['kit-guide']} />
}
