import Link from 'next/link'
import { getPublishedArticles } from '@/lib/articles'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'

export const dynamic = 'force-dynamic'

export default async function ArticlesPage() {
  const { articles } = await getPublishedArticles(50)

  return (
    <>
      <SiteHeader />
      <main style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">InvestorSimple Articles</h1>
            <p className="section-subtitle">Publishare-backed content feed for InvestorSimple.</p>
          </div>

          <div className="insights-grid">
            {articles.map((article) => (
              <article className="insight-card" key={article.id}>
                {article.featured_image_url ? (
                  <div className="card-image">
                    <img src={article.featured_image_url} alt={article.title} />
                  </div>
                ) : null}
                <div className="card-content">
                  <h3>{article.title}</h3>
                  <p>{article.excerpt || 'No excerpt available.'}</p>
                  <Link className="card-link" href={`/articles/${article.slug}`}>
                    Read Article <i className="fas fa-arrow-right" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
