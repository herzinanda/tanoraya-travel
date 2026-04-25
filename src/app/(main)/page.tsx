import { getHomePage, getActivePromo } from "@/data/loader";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/component/main/BlockRenderer";
import PromoPopup, { PromoData } from "@/component/main/shared/PromoPopup";
import { getStrapiURL } from "@/utils/get-strapi-url";

async function loader() {
  const data = await getHomePage();
  if (!data) notFound();
  return { ...data.data }
}

export default async function Home() {
  const [data, promoRes] = await Promise.allSettled([
    loader(),
    getActivePromo(),
  ]);

  const blocks = data.status === 'fulfilled' ? data.value?.blocks ?? [] : [];

  let promo: PromoData | null = null;
  if (promoRes.status === 'fulfilled') {
    const d = promoRes.value?.data;
    if (d?.isActive) {
      const rawUrl: string | undefined = d.image?.url;
      const imageUrl = rawUrl
        ? rawUrl.startsWith('http') ? rawUrl : `${getStrapiURL()}${rawUrl}`
        : undefined;
      promo = {
        title: d.title ?? '',
        subtitle: d.subtitle,
        description: d.description,
        badge: d.badge,
        ctaLabel: d.ctaLabel,
        ctaUrl: d.ctaUrl,
        imageUrl,
        imageAlt: d.image?.alternativeText,
        expiresAt: d.expiresAt,
      };
    }
  }

  return (
    <>
      {promo && <PromoPopup promo={promo} />}
      <BlockRenderer blocks={blocks} />
    </>
  );
}
