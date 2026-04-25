import { Metadata } from 'next'
import NewsClassicsSection from '@/component/main/articles/NewsClassicsSection'
import Breadcrumbs from '@/component/main/shared/Breadcrumbs'
import { getBlogPage } from '@/data/loader'
import { getStrapiURL } from '@/utils/get-strapi-url'

function getImageUrl(url: string | null | undefined): string | null {
  if (!url) return null
  if (url.startsWith('http')) return url
  return new URL(url, getStrapiURL()).href
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await getBlogPage()
    const data = res?.data
    if (!data) return { title: 'Travel Blog | Tanoraya Travel' }
    return {
      title: `${data.title ?? 'Travel Blog'} | Tanoraya Travel`,
      description: data.description ?? 'Explore travel tips, destination guides, and inspiring stories from Tanoraya Travel.',
    }
  } catch {
    return { title: 'Travel Blog | Tanoraya Travel' }
  }
}

export default async function Articles({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page } = await searchParams
  const currentPage = Math.max(1, Number(page ?? 1))

  let pageTitle = 'Travel Blog'
  let bgImage = '/img/breadcrumb/breadcrumb.jpg'

  try {
    const res = await getBlogPage()
    const data = res?.data
    if (data) {
      pageTitle = data.title ?? pageTitle
      const img = getImageUrl(data.breadcrumbImage?.url)
      if (img) bgImage = img
    }
  } catch {}

  return (
    <>
      <Breadcrumbs
        pageTitle={pageTitle}
        bgImage={bgImage}
        items={[
          { label: 'Home', href: '/' },
          { label: pageTitle, href: '/articles' },
        ]}
      />
      <NewsClassicsSection page={currentPage} />
    </>
  )
}
