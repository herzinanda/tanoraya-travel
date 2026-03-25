import { Metadata } from 'next'
import { Suspense } from 'react'
import Breadcrumbs from '@/component/main/shared/Breadcrumbs'
import RequestAQuoteForm from '@/component/main/RequestAQuoteForm'
import { getDestinations } from '@/data/loader'

export const metadata: Metadata = {
  title: 'Request a Quote',
  description: 'Request a custom travel quote from Tanoraya Travel. Tell us your destination, dates, and preferences and we will craft the perfect itinerary for you.',
}

async function QuoteFormLoader() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let destinations: any[] = []
  try {
    const res = await getDestinations()
    if (res?.data) destinations = res.data
  } catch {}
  return <RequestAQuoteForm destinations={destinations} />
}

export default function RequestAQuotePage() {
  return (
    <>
      <Breadcrumbs
        pageTitle="Request A Quote"
        bgImage="/img/breadcrumb/breadcrumb.jpg"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Request A Quote', href: '/request-a-quote' },
        ]}
      />

      <section className="contact-section section-padding fix">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb-5">
                <span className="sub-title wow fadeInUp">Get In Touch</span>
                <h2 className="wow fadeInUp" data-wow-delay=".3s">
                  Request A Custom Quote
                </h2>
                <p className="mt-3">
                  Tell us about your dream trip and our team will craft a personalised itinerary and quote within 24 hours.
                </p>
              </div>
              <Suspense fallback={
                <div style={{ padding: '40px 0', textAlign: 'center', color: '#999' }}>
                  Loading form...
                </div>
              }>
                <QuoteFormLoader />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
