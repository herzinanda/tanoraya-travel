import { Metadata } from 'next'
import { getDestinationPage } from '@/data/loader'
import CTAbgSection from '@/component/main/destinations/CTAbgSection'
import DestinationsSection from '@/component/main/destinations/DestinationsSection'
import DestinationsSection2 from '@/component/main/destinations/DestinationsSection2'

export async function generateMetadata(): Promise<Metadata> {
  const res = await getDestinationPage()
  const data = res?.data

  return {
    title: data?.seoTitle || 'Destinations',
    description:
      data?.seoDescription ||
      'Discover our top travel destinations across Indonesia and Southeast Asia. From Sumatera Utara to Singapore — explore with Tanoraya Travel.',
  }
}

export default async function Destinations() {
  const res = await getDestinationPage()
  const data = res?.data

  return (
    <>
      <CTAbgSection
        title={data?.heroTitle}
        subtitle={data?.heroSubtitle}
        description={data?.heroDescription}
        buttonText={data?.heroButtonText}
        buttonUrl={data?.heroButtonUrl}
        bgImageUrl={data?.heroBgImage?.url}
      />
      <DestinationsSection2 />
      <DestinationsSection
        title={data?.toursTitle}
        subtitle={data?.toursSubtitle}
      />
    </>
  )
}
