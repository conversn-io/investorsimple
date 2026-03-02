import { NextRequest, NextResponse } from 'next/server'
import { callreadyQuizDb } from '@/lib/callready-quiz-db'

const SITE_KEY = 'investorsimple.org'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event_name, session_id, user_id, page_url, referrer, user_agent, event_category, event_label, event_value, properties = {} } = body

    if (!event_name || !session_id) {
      return NextResponse.json({ error: 'event_name and session_id are required' }, { status: 400 })
    }

    const { data, error } = await callreadyQuizDb
      .from('analytics_events')
      .insert({
        event_name,
        event_category: event_category ?? 'engagement',
        event_label: event_label ?? event_name,
        event_value: event_value ?? null,
        session_id,
        user_id: user_id ?? session_id,
        page_url: page_url ?? null,
        referrer: referrer ?? null,
        user_agent: user_agent ?? request.headers.get('user-agent') ?? null,
        ip_address: request.headers.get('x-forwarded-for')?.split(',')[0] ?? request.headers.get('x-real-ip') ?? null,
        properties: {
          ...(typeof properties === 'object' ? properties : {}),
          site_key: SITE_KEY,
        },
      })
      .select('id')
      .single()

    if (error) {
      console.warn('track-event insert warning', error.message)
      return NextResponse.json({ success: true, queued: true }, { status: 202 })
    }

    return NextResponse.json({ success: true, event_id: data?.id })
  } catch (error) {
    console.error('track-event error', error)
    return NextResponse.json({ success: true, queued: true }, { status: 202 })
  }
}
