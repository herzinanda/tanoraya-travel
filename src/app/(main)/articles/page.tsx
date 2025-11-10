import NewsClassicsSection from '@/component/main/articles/NewsClassicsSection'
import Breadcrumbs from '@/component/main/shared/Breadcrumbs'
import React from 'react'

const breadcrumbData = {
  pageTitle: "Travel News",
  bgImage: "/img/breadcrumb/breadcrumb.jpg",
  items: [
    { label: "Home", href: "/" },
    { label: "Travel News", href: "/articles" },
  ]
}

const Articles = () => {
  

  return (
    <>
        <Breadcrumbs 
          pageTitle={breadcrumbData.pageTitle}
          bgImage={breadcrumbData.bgImage}
          items={breadcrumbData.items}
        />
        <NewsClassicsSection />
    </>
  )
}

export default Articles