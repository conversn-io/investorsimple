import { notFound } from 'next/navigation'
import { getArticleBySlug } from '@/lib/articles'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'

export const dynamic = 'force-dynamic'

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { article } = await getArticleBySlug(slug)

  if (!article) notFound()

  return (
    <>
      <SiteHeader />
      <main style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <article className="about-content">
          <div className="about-container">
            <h1 className="section-heading" style={{ marginBottom: '24px' }}>{article.title}</h1>
            <p className="section-subtitle" style={{ margin: '0 0 24px', textAlign: 'left' }}>
              Published {new Date(article.created_at).toLocaleDateString()}
            </p>
            {article.featured_image_url ? <img src={article.featured_image_url} alt={article.title} /> : null}
            <div style={{ marginTop: '24px' }} dangerouslySetInnerHTML={{ __html: article.html_body || `<p>${article.content || ''}</p>` }} />
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
