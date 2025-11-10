import ContactInfo from '@/component/main/contact/ContactInfo'
import ContactSection from '@/component/main/contact/ContactSection'
import MapSection from '@/component/main/contact/MapSection'
import Breadcrumbs from '@/component/main/shared/Breadcrumbs'
import React from 'react'

const breadcrumbData = {
  pageTitle: "Contact Us",
  bgImage: "/img/breadcrumb/breadcrumb.jpg",
  items: [
    { label: "Home", href: "/" },
    { label: "Contact Us", href: "/contact" },
  ]
}

const Contact = () => {
  return (
    <>
        <Breadcrumbs 
          pageTitle={breadcrumbData.pageTitle}
          bgImage={breadcrumbData.bgImage}
          items={breadcrumbData.items}
        />
        <ContactInfo />
        <ContactSection />
        <MapSection />
    </>
  )
}

export default Contact