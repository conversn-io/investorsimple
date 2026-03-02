import { supabase } from './supabase'

const SITE_ID = process.env.NEXT_PUBLIC_PUBLISHARE_SITE_ID || process.env.PUBLISHARE_SITE_ID || 'investorsimple'

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  html_body: string | null
  status: string
  created_at: string
  updated_at: string
  featured_image_url: string | null
}

export async function getPublishedArticles(limit = 30) {
  const { data, error } = await supabase
    .from('articles')
    .select('id,title,slug,excerpt,content,html_body,status,created_at,updated_at,featured_image_url,site_id')
    .eq('status', 'published')
    .eq('site_id', SITE_ID)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) return { articles: [] as Article[], error }
  return { articles: (data || []) as Article[], error: null }
}

export async function getArticleBySlug(slug: string) {
  const { data, error } = await supabase
    .from('articles')
    .select('id,title,slug,excerpt,content,html_body,status,created_at,updated_at,featured_image_url,site_id')
    .eq('slug', slug)
    .eq('status', 'published')
    .eq('site_id', SITE_ID)
    .maybeSingle()

  if (error) return { article: null as Article | null, error }
  return { article: (data as Article | null) || null, error: null }
}
