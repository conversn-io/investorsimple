import { NextRequest } from 'next/server'
import { POST as trackEvent } from '@/app/api/analytics/track-event/route'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const wrapped = new Request(request.url, {
    method: 'POST',
    headers: request.headers,
    body: JSON.stringify({
      ...body,
      event_name: body.event_name || 'page_view',
      event_category: body.event_category || 'pageview',
    }),
  })
  return trackEvent(wrapped as unknown as NextRequest)
}
