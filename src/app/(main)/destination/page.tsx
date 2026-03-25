import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Destinations',
  description: 'Discover our top travel destinations across Indonesia and Southeast Asia. From Sumatera Utara to Singapore — explore with Tanoraya Travel.',
}

import CTAbgSection from '@/component/main/destinations/CTAbgSection'
import DestinationsSection from '@/component/main/destinations/DestinationsSection'
import DestinationsSection2 from '@/component/main/destinations/DestinationsSection2'
import React from 'react'

const Destinations = () => {
  return (
    <>
      <DestinationsSection2 />
      <CTAbgSection />
      <DestinationsSection />
    </>
  )
}

export default Destinations