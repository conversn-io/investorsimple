import { notFound } from 'next/navigation'
import { AssetPage } from '@/components/assets/AssetPage'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { AssetSlug, assets, assetOrder } from '@/content/assets'

export function generateStaticParams() {
  return assetOrder.map((slug) => ({ slug }))
}

export default async function AssetDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const asset = assets[slug as AssetSlug]

  if (!asset) {
    notFound()
  }

  return (
    <>
      <SiteHeader />
      <main>
        <AssetPage asset={asset} />
      </main>
      <SiteFooter />
    </>
  )
}
