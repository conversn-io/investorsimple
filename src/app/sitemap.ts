import type { MetadataRoute } from 'next'
import { getPublishedArticles } from '@/lib/articles'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://www.investorsimple.org'
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/articles`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  try {
    const { articles } = await getPublishedArticles(100)
    const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
      url: `${base}/articles/${a.slug}`,
      lastModified: new Date(a.updated_at || a.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
    return [...staticPages, ...articlePages]
  } catch {
    return staticPages
  }
}
