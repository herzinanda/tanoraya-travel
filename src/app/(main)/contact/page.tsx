import ContactInfo from '@/component/main/contact/ContactInfo'
import ContactSection from '@/component/main/contact/ContactSection'
import MapSection from '@/component/main/contact/MapSection'
import Breadcrumbs from '@/component/main/shared/Breadcrumbs'
import React from 'react'

const Contact = () => {
  return (
    <>
        <Breadcrumbs />
        <ContactInfo />
        <ContactSection />
        <MapSection />
    </>
  )
}

export default Contact