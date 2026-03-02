import { LeadFunnelPage } from '@/components/funnels/LeadFunnelPage'
import { funnelConfigs } from '@/content/funnels'

export default function WebConferenceFunnelPage() {
  return <LeadFunnelPage config={funnelConfigs['web-conference']} />
}
