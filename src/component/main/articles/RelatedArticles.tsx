import Image from 'next/image'
import Link from 'next/link'
import { getStrapiURL } from '@/utils/get-strapi-url'

function getImageUrl(url: string | null | undefined): string {
  if (!url) return '/img/news/1.jpg'
  if (url.startsWith('http')) return url
  return new URL(url, getStrapiURL()).href
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function RelatedArticles({ articles }: { articles: any[] }) {
  if (!articles || articles.length === 0) return null

  return (
    <div className="single-sidebar-widget">
      <div className="wid-title">
        <h4>Related Articles</h4>
      </div>
      <div className="related-articles-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {articles.map((article) => (
          <Link
            key={article.documentId || article.id}
            href={`/articles/${article.slug}`}
            style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', textDecoration: 'none' }}
          >
            <div style={{ flexShrink: 0, borderRadius: '6px', overflow: 'hidden' }}>
              <Image
                src={getImageUrl(article.coverImage?.url)}
                alt={article.coverImage?.alternativeText || article.title}
                width={72}
                height={72}
                style={{ objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div>
              <h6 style={{
                fontSize: '14px',
                fontWeight: 600,
                lineHeight: 1.4,
                margin: '0 0 4px',
                color: '#1a1a2e',
                transition: 'color 0.2s',
              }}>
                {article.title}
              </h6>
              <span style={{ fontSize: '12px', color: '#888' }}>
                {article.readTime ? `${article.readTime} min read · ` : ''}
                {formatDate(article.publishedAt)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
