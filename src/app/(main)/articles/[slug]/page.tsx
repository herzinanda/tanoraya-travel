import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Breadcrumbs from '@/component/main/shared/Breadcrumbs'
import { RichTextRenderer } from '@/component/main/articles/RichTextRenderer'
import ShareButtons from '@/component/main/articles/ShareButtons'
import { getArticleBySlug, getArticles, getRelatedArticles } from '@/data/loader'
import RelatedArticles from '@/component/main/articles/RelatedArticles'
import { getStrapiURL } from '@/utils/get-strapi-url'

function getImageUrl(url: string | null | undefined): string | null {
  if (!url) return null
  if (url.startsWith('http')) return url
  return new URL(url, getStrapiURL()).href
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateStaticParams() {
  try {
    const res = await getArticles({ pageSize: 100 })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (res?.data ?? []).map((a: any) => ({ slug: a.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  try {
    const res = await getArticleBySlug(slug)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const article = res?.data?.[0] as any
    if (!article) return {}
    return {
      title: `${article.seo_title ?? article.title} | Tanoraya Travel`,
      description: article.seo_description ?? article.excerpt ?? '',
    }
  } catch {
    return {}
  }
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let article: any = null
  try {
    const res = await getArticleBySlug(slug)
    article = res?.data?.[0] ?? null
  } catch (err) {
    console.error('Failed to fetch article:', err)
  }

  if (!article) notFound()

  // Fetch related articles by same category, excluding current
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let relatedArticles: any[] = []
  if (article.category) {
    try {
      const rel = await getRelatedArticles(article.category, slug)
      relatedArticles = rel?.data ?? []
    } catch {}
  }

  const featuredImgUrl = getImageUrl(article.coverImage?.url)
  const publishDate = formatDate(article.publishedAt ?? new Date().toISOString())

  return (
    <>
      <Breadcrumbs
        pageTitle={article.title}
        bgImage={featuredImgUrl ?? '/img/breadcrumb/breadcrumb.jpg'}
        items={[
          { label: 'Home', href: '/' },
          { label: 'Travel Blog', href: '/articles' },
          { label: article.title, href: `/articles/${slug}` },
        ]}
      />

      <section className="news-classic-section- section-padding fix">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8">
              <div className="blog-post-details">
                <div className="single-blog-post">
                  {/* Featured Image */}
                  {featuredImgUrl && (
                    <div className="post-featured-thumb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={featuredImgUrl}
                        alt={article.coverImage?.alternativeText ?? article.title}
                        style={{ width: '100%', height: 'auto', borderRadius: '10px', display: 'block' }}
                      />
                    </div>
                  )}

                  <div className="post-content">
                    {/* Meta */}
                    <ul className="post-list d-flex align-items-center flex-wrap gap-3">
                      <li>
                        <i className="fa-regular fa-user"></i>
                        By {article.author ?? 'Admin'}
                      </li>
                      <li>
                        <i className="fa-regular fa-calendar"></i>
                        {publishDate}
                      </li>
                      {article.category && (
                        <li>
                          <i className="fa-solid fa-tag"></i>
                          {article.category}
                        </li>
                      )}
                      {article.readTime && (
                        <li>
                          <i className="fa-regular fa-clock"></i>
                          {article.readTime} min read
                        </li>
                      )}
                    </ul>

                    <h3 className="mt-3 mb-3">{article.title}</h3>

                    {/* Rich Text Content */}
                    <RichTextRenderer content={article.content ?? []} />
                  </div>
                </div>

                {/* Tags + Share */}
                <div className="row tag-share-wrap mt-4 mb-5">
                  <div className="col-lg-8 col-12">
                    {article.category && (
                      <div className="tagcloud">
                        <Link href={`/articles?category=${article.category.toLowerCase()}`}>
                          {article.category}
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className="col-lg-4 col-12 mt-3 mt-lg-0 text-lg-end">
                    <ShareButtons
                      url={`${process.env.NEXT_PUBLIC_SITE_URL}/articles/${slug}`}
                      title={article.title}
                    />
                  </div>
                </div>

                {/* Author Box */}
                {article.author && (
                  <div className="blog-single-comment d-flex gap-4 pt-4 pb-4">
                    <div className="content">
                      <h5>{article.author}</h5>
                      <p className="mt-2">Travel writer at Tanoraya Travel</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="main-sideber">
                <RelatedArticles articles={relatedArticles} />
                <div className="single-sidebar-widget">
                  <div className="wid-title">
                    <h4>Categories</h4>
                  </div>
                  <div className="news-widget-categories">
                    <ul>
                      {['Tips', 'Destination', 'News', 'Travel'].map((cat) => (
                        <li key={cat}>
                          <Link href={`/articles?category=${cat.toLowerCase()}`}>{cat}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="single-sidebar-widget">
                  <div className="wid-title">
                    <h4>Back to Blog</h4>
                  </div>
                  <Link href="/articles" className="theme-btn d-inline-flex align-items-center gap-2">
                    <i className="fa-solid fa-arrow-left"></i> All Articles
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
