import { Metadata } from 'next'
import FAQSection, { FAQItem } from "@/component/main/faq/FAQSection";
import Breadcrumbs from "@/component/main/shared/Breadcrumbs";
import { getFAQs } from '@/data/loader';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Find answers to frequently asked questions about Tanoraya Travel tour packages, booking process, payments, and travel policies.',
}

export default async function FAQPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let faqs: FAQItem[] = []
  try {
    const res = await getFAQs()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    faqs = (res?.data ?? []).map((item: any) => ({
      id: item.documentId || String(item.id),
      question: item.question ?? '',
      answer: item.answer ?? '',
      category: item.category,
    }))
  } catch {}

  return (
    <>
      <Breadcrumbs
        pageTitle="Frequently Asked Questions"
        bgImage="/img/breadcrumb/breadcrumb.jpg"
        items={[
          { label: 'Home', href: '/' },
          { label: 'FAQ', href: '/faq' },
        ]}
      />
      <FAQSection faqs={faqs} />
    </>
  );
}
