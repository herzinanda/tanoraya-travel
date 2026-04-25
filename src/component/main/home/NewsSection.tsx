import Image from "next/image";
import Link from "next/link";
import { getArticles } from "@/data/loader";
import { getStrapiURL } from "@/utils/get-strapi-url";

function getImageUrl(url: string | null | undefined): string {
  if (!url) return "/img/news/1.jpg";
  if (url.startsWith("http")) return url;
  return new URL(url, getStrapiURL()).href;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const NewsSection = async ({ title, subtitle }: { title?: string; subtitle?: string } = {}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let posts: any[] = [];
  try {
    const res = await getArticles({ page: 1, pageSize: 3 });
    if (res?.data) posts = res.data;
  } catch {}

  if (posts.length === 0) return null;

  return (
    <section className="news-section section-padding fix">
      <div className="container">
        <div className="section-title text-center">
          <span className="sub-title wow fadeInUp">{subtitle || 'News & Updates'}</span>
          <h2 className="wow fadeInUp" data-wow-delay=".3s">
            {title || 'Our Latest News & Articles'}
          </h2>
        </div>
        <div className="row">
          {posts.map((post, i) => (
            <div
              key={post.documentId || post.id}
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay={`${(i + 1) * 0.2}s`}
            >
              <div className="news-items">
                <div className="news-image">
                  <Image
                    src={getImageUrl(post.coverImage?.url)}
                    alt={post.coverImage?.alternativeText || post.title}
                    width={420}
                    height={450}
                    style={{ objectFit: "cover" }}
                  />
                  <div className="news-content">
                    <h4>
                      <Link href={`/articles/${post.slug}`}>{post.title}</Link>
                    </h4>
                    <div className="author-items">
                      <div className="author-info">
                        <h6>{post.author || "Tanoraya Travel"}</h6>
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
