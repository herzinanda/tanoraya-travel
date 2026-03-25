import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tour Packages',
  description: 'Browse all Tanoraya Travel tour packages — from Lake Toba adventures to ASEAN multi-country journeys. Find the perfect trip for you.',
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