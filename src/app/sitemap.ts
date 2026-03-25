import { MetadataRoute } from 'next'
import { getTourPackages, getArticles, getDestinations } from '@/data/loader'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const staticRoutes = [
  { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
  { url: '/tour-packages', priority: 0.9, changeFrequency: 'daily' as const },
  { url: '/tour-packages/tour', priority: 0.8, changeFrequency: 'daily' as const },
  { url: '/destination', priority: 0.8, changeFrequency: 'weekly' as const },
  { url: '/articles', priority: 0.8, changeFrequency: 'daily' as const },
  { url: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
  { url: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
  { url: '/faq', priority: 0.6, changeFrequency: 'monthly' as const },
  { url: '/request-a-quote', priority: 0.7, changeFrequency: 'monthly' as const },
  { url: '/legal-and-privacy', priority: 0.3, changeFrequency: 'yearly' as const },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [toursRes, articlesRes, destinationsRes] = await Promise.allSettled([
    getTourPackages({ pageSize: 200 }),
    getArticles({ pageSize: 200 }),
    getDestinations(),
  ])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tours: any[] = toursRes.status === 'fulfilled' ? (toursRes.value?.data ?? []) : []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const articles: any[] = articlesRes.status === 'fulfilled' ? (articlesRes.value?.data ?? []) : []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const destinations: any[] = destinationsRes.status === 'fulfilled' ? (destinationsRes.value?.data ?? []) : []

  const tourRoutes: MetadataRoute.Sitemap = tours
    .filter((t) => t.slug)
    .map((t) => ({
      url: `${BASE}/tour-packages/${t.slug}`,
      lastModified: t.updatedAt ? new Date(t.updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }))

  const articleRoutes: MetadataRoute.Sitemap = articles
    .filter((a) => a.slug)
    .map((a) => ({
      url: `${BASE}/articles/${a.slug}`,
      lastModified: a.updatedAt ? new Date(a.updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  const destinationRoutes: MetadataRoute.Sitemap = destinations
    .filter((d) => d.destinationUrl)
    .map((d) => ({
      url: `${BASE}/destination/${d.destinationUrl}`,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }))

  return [
    ...staticRoutes.map(({ url, ...rest }) => ({ url: `${BASE}${url}`, ...rest })),
    ...tourRoutes,
    ...articleRoutes,
    ...destinationRoutes,
  ]
}
