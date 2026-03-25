import Link from "next/link";
import React from "react";

export interface FAQItem {
  id: string
  question: string
  answer: string
  category?: string
}

// Static fallback content shown when Strapi has no FAQs yet
const STATIC_FAQS: FAQItem[] = [
  { id: 'f1', question: 'How do I book a tour package?', answer: 'You can book directly through our website by visiting the tour detail page and clicking "Book Now", or by submitting a Request A Quote form. Our team will confirm your booking within 24 hours.' },
  { id: 'f2', question: 'What is included in the tour price?', answer: 'Tour prices typically include accommodation, transportation, a professional guide, and entrance fees as listed in each package. Meals and international flights are usually excluded unless stated otherwise.' },
  { id: 'f3', question: 'Can I customise an existing tour package?', answer: 'Yes! We specialise in tailor-made itineraries. Contact us via the Request A Quote page and describe your preferences — dates, budget, interests — and we will build a personalised package for you.' },
  { id: 'f4', question: 'What is your cancellation policy?', answer: 'Cancellations made 30+ days before departure receive a full refund. Cancellations 15–29 days prior receive a 50% refund. Cancellations within 14 days are non-refundable.' },
  { id: 'f5', question: 'Do you provide travel insurance?', answer: 'We strongly recommend travel insurance for all our tours. While we do not sell insurance directly, we can recommend reputable providers covering medical emergencies and trip cancellation.' },
  { id: 'f6', question: 'What payment methods do you accept?', answer: 'We accept bank transfers (BCA, Mandiri, BNI), credit/debit cards, and e-wallets (GoPay, OVO). A 30% deposit is required to secure your booking, with the balance due 14 days before departure.' },
  { id: 'f7', question: 'Is there a minimum group size?', answer: 'Most packages run with as few as 2 participants. Private tours are available for solo travellers and couples. Group tours have their own minimum requirements as listed on each package page.' },
  { id: 'f8', question: 'Do you cater for dietary requirements?', answer: 'Yes. Please inform us of any dietary needs (vegetarian, vegan, gluten-free, halal, etc.) at the time of booking and we will communicate these to our partner hotels and restaurants.' },
]

export default function FAQSection({ faqs }: { faqs?: FAQItem[] }) {
  const items = faqs && faqs.length > 0 ? faqs : STATIC_FAQS

  // Split into two columns
  const mid = Math.ceil(items.length / 2)
  const col1 = items.slice(0, mid)
  const col2 = items.slice(mid)

  return (
    <div className="faq-details-section fix section-padding">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="faq-items style-2">
              <div className="faq-accordion">
                <div className="accordion" id="accordion1">
                  {col1.map((item, i) => {
                    const domId = `faq-a-${i}`
                    const isOpen = i === 0
                    return (
                      <div key={item.id} className="accordion-item mb-3 wow fadeInUp" data-wow-delay={`${i * 0.15 + 0.1}s`}>
                        <h5 className="accordion-header">
                          <button
                            className={`accordion-button${isOpen ? '' : ' collapsed'}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${domId}`}
                            aria-expanded={isOpen}
                            aria-controls={domId}
                          >
                            {item.question}
                          </button>
                        </h5>
                        <div id={domId} className={`accordion-collapse collapse${isOpen ? ' show' : ''}`} data-bs-parent="#accordion1">
                          <div className="accordion-body">{item.answer}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="faq-items style-2">
              <div className="faq-accordion">
                <div className="accordion" id="accordion2">
                  {col2.map((item, i) => {
                    const domId = `faq-b-${i}`
                    return (
                      <div key={item.id} className="accordion-item mb-3 wow fadeInUp" data-wow-delay={`${i * 0.15 + 0.1}s`}>
                        <h5 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${domId}`}
                            aria-expanded={false}
                            aria-controls={domId}
                          >
                            {item.question}
                          </button>
                        </h5>
                        <div id={domId} className="accordion-collapse collapse" data-bs-parent="#accordion2">
                          <div className="accordion-body">{item.answer}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="faq-content-wrapper">
          <div className="faq-title">
            <h2>Still Have Questions?</h2>
            <p>
              Can&apos;t find the answer you&apos;re looking for? Our team is happy to help.
            </p>
            <Link href="/contact" className="theme-btn">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
