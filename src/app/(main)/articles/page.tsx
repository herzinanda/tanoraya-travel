import { Metadata } from 'next'
import NewsClassicsSection from '@/component/main/articles/NewsClassicsSection'
import Breadcrumbs from '@/component/main/shared/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Travel Blog',
  description: 'Explore travel tips, destination guides, and inspiring stories from Tanoraya Travel. Plan your next adventure with expert insights.',
}

const breadcrumbData = {
  pageTitle: "Travel Blog",
  bgImage: "/img/breadcrumb/breadcrumb.jpg",
  items: [
    { label: "Home", href: "/" },
    { label: "Travel Blog", href: "/articles" },
  ]
}

export default async function Articles({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page } = await searchParams
  const currentPage = Math.max(1, Number(page ?? 1))

  return (
    <>
      <Breadcrumbs
        pageTitle={breadcrumbData.pageTitle}
        bgImage={breadcrumbData.bgImage}
        items={breadcrumbData.items}
      />
      <NewsClassicsSection page={currentPage} />
    </>
  )
}
