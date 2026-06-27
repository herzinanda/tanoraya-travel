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
          <span className="sub-title wow fadeInUp">{subtitle || "News & Updates"}</span>
          <h2 className="wow fadeInUp" data-wow-delay=".3s">
            {title || "Our Latest News & Articles"}
          </h2>
        </div>

        <div className="row g-4">
          {posts.map((post, i) => (
            <div
              key={post.documentId || post.id}
              className="col-lg-4 col-md-6 d-flex wow fadeInUp"
              data-wow-delay={`${(i + 1) * 0.2}s`}
            >
              <article className="tn-news-card">
                <div className="tn-news-card__img-wrap">
                  <Image
                    src={getImageUrl(post.coverImage?.url)}
                    alt={post.coverImage?.alternativeText || post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 33vw"
                    className="tn-news-card__img"
                  />
                </div>

                <div className="tn-news-card__body">
                  <div className="tn-news-card__meta">
                    <span className="tn-news-card__date">
                      <i className="fa-regular fa-calendar"></i>
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>

                  <h4 className="tn-news-card__title">
                    <Link href={`/articles/${post.slug}`}>{post.title}</Link>
                  </h4>

                  <div className="tn-news-card__footer">
                    <span className="tn-news-card__author">
                      {post.author || "Tanoraya Travel"}
                    </span>
                    <Link href={`/articles/${post.slug}`} className="tn-news-card__link">
                      Read More <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        <div className="text-center mt-5 wow fadeInUp" data-wow-delay=".3s">
          <Link href="/articles" className="tn-btn-navy">
            See All Articles <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
