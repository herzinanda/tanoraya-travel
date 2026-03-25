import { Metadata } from 'next'
import Breadcrumbs from '@/component/main/shared/Breadcrumbs'
import ReactMarkdown from 'react-markdown'
import { getPrivacyPolicy, getTermsOfUse } from '@/data/loader'

export const metadata: Metadata = {
  title: 'Legal & Privacy Policy',
  description: "Read Tanoraya Travel's privacy policy, terms of use, and legal information governing your use of our services.",
}

const STATIC_PRIVACY = `
## 1. Information We Collect
We collect personal information you provide directly to us, including your name, email address, phone number, travel preferences, and payment details when you book a tour or submit an enquiry.

## 2. How We Use Your Information
We use the information we collect to:
- Process and confirm your tour bookings
- Communicate with you about your booking, itinerary, and travel documents
- Send promotional offers and newsletters (if you have opted in)
- Improve our services and website experience
- Comply with legal obligations

## 3. Sharing Your Information
We do not sell your personal data. We may share your information with trusted third-party partners — such as hotels, transport providers, and local guides — solely to fulfil your booking. These partners are required to keep your data confidential.

## 4. Cookies
Our website uses cookies to enhance your browsing experience and analyse site traffic. You can disable cookies through your browser settings, though this may affect some website functionality.

## 5. Data Retention
We retain your personal data for as long as necessary to provide our services and comply with legal obligations, typically no longer than 5 years after your last booking.

## 6. Your Rights
You have the right to access, correct, or delete your personal data at any time. To exercise these rights, please contact us at info@tanoraya.com.

## 7. Contact
**Tanoraya Travel**
Jl. Sisingamangaraja No. 12, Medan, Sumatera Utara
info@tanoraya.com
`.trim()

const STATIC_TERMS = `
## 1. Acceptance of Terms
By accessing and using the Tanoraya Travel website and services, you agree to be bound by these Terms of Use. If you do not agree, please do not use our services.

## 2. Booking & Payment
A booking is confirmed only upon receipt of a deposit (minimum 30% of the total tour price). The remaining balance must be paid no later than 14 days before the departure date. Failure to complete payment may result in cancellation of the booking.

## 3. Cancellation Policy
- **30+ days before departure:** Full refund of deposit
- **15–29 days before departure:** 50% refund of total price
- **Within 14 days of departure:** No refund

Cancellations must be submitted in writing to info@tanoraya.com.

## 4. Changes to Itinerary
Tanoraya Travel reserves the right to make necessary changes to itineraries due to weather, safety concerns, or circumstances beyond our control. We will notify you as soon as possible and offer suitable alternatives.

## 5. Travel Insurance
We strongly recommend that all travellers obtain comprehensive travel insurance covering medical emergencies, trip cancellation, and lost luggage. Tanoraya Travel is not liable for costs arising from inadequate insurance coverage.

## 6. Liability
Tanoraya Travel acts as an agent for accommodation providers, transport companies, and local guides. We are not liable for any injury, loss, damage, or inconvenience arising from services provided by third parties.

## 7. Governing Law
These terms are governed by the laws of the Republic of Indonesia. Any disputes shall be subject to the jurisdiction of the courts of Medan, North Sumatra.

## 8. Contact
For questions about these terms, please contact us at info@tanoraya.com.
`.trim()

function formatDate(d: string | null) {
  if (!d) return 'March 2026'
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
}

export default async function LegalAndPrivacy() {
  let privacyMarkdown: string | null = null
  let termsMarkdown: string | null = null
  let privacyUpdated: string | null = null
  let termsUpdated: string | null = null

  try {
    const [privacyRes, termsRes] = await Promise.allSettled([
      getPrivacyPolicy(),
      getTermsOfUse(),
    ])
    if (privacyRes.status === 'fulfilled' && privacyRes.value?.data?.content) {
      privacyMarkdown = privacyRes.value.data.content
      privacyUpdated = privacyRes.value.data.lastUpdated ?? null
    }
    if (termsRes.status === 'fulfilled' && termsRes.value?.data?.content) {
      termsMarkdown = termsRes.value.data.content
      termsUpdated = termsRes.value.data.lastUpdated ?? null
    }
  } catch {}

  const privacyContent = privacyMarkdown ?? STATIC_PRIVACY
  const termsContent = termsMarkdown ?? STATIC_TERMS

  return (
    <>
      <Breadcrumbs
        pageTitle="Legal & Privacy"
        bgImage="/img/breadcrumb/breadcrumb.jpg"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Legal & Privacy', href: '/legal-and-privacy' },
        ]}
      />

      <section className="section-padding fix">
        <div className="container">
          <ul className="nav nav-tabs mb-5" id="legalTabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="privacy-tab"
                data-bs-toggle="tab"
                data-bs-target="#privacy"
                type="button"
                role="tab"
              >
                Privacy Policy
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="terms-tab"
                data-bs-toggle="tab"
                data-bs-target="#terms"
                type="button"
                role="tab"
              >
                Terms of Use
              </button>
            </li>
          </ul>

          <div className="tab-content" id="legalTabsContent">
            <div className="tab-pane fade show active" id="privacy" role="tabpanel">
              <div className="row justify-content-center">
                <div className="col-lg-9">
                  <p className="text-muted mb-4"><small>Last updated: {formatDate(privacyUpdated)}</small></p>
                  <div className="rich-text-content">
                    <ReactMarkdown>{privacyContent}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>

            <div className="tab-pane fade" id="terms" role="tabpanel">
              <div className="row justify-content-center">
                <div className="col-lg-9">
                  <p className="text-muted mb-4"><small>Last updated: {formatDate(termsUpdated)}</small></p>
                  <div className="rich-text-content">
                    <ReactMarkdown>{termsContent}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
