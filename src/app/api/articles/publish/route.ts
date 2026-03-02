import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) throw new Error('Missing Supabase credentials')
  return createClient(supabaseUrl, supabaseKey)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { article_id, slug, secret } = body

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }

    let articleSlug = slug
    if (!articleSlug && article_id) {
      const supabase = getSupabaseClient()
      const { data } = await supabase.from('articles').select('slug').eq('id', article_id).single()
      articleSlug = data?.slug
    }

    if (!articleSlug) {
      return NextResponse.json({ error: 'slug or article_id required' }, { status: 400 })
    }

    return NextResponse.json({ success: true, path: `/articles/${articleSlug}` })
  } catch (error) {
    console.error('publish webhook error', error)
    return NextResponse.json({ error: 'Error processing publish webhook' }, { status: 500 })
  }
}
