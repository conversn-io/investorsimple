import type { MetadataRoute } from 'next'
const PUBLISHARE_URL = 'https://vpysqshhafthuxvokwqj.supabase.co'
const PUBLISHARE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZweXNxc2hoYWZ0aHV4dm9rd3FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNTY3ODcsImV4cCI6MjA2NTkzMjc4N30.fza16gc2qHpGzzMFa1H3O6W-YIsVTsCLH9uYy9pR31I'
export const revalidate = 3600
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const res = await fetch(`${PUBLISHARE_URL}/functions/v1/serve-sitemap?host=investorsimple.org`, {
      headers: { apikey: PUBLISHARE_ANON, Authorization: `Bearer ${PUBLISHARE_ANON}` },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const xml = await res.text()
    const now = new Date()
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => ({
      url: m[1], lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7,
    }))
  } catch { return [] }
}
