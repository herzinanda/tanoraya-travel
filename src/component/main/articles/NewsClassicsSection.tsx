import Image from "next/image";
import Link from "next/link";
import { getArticles } from "@/data/loader";
import { getStrapiURL } from "@/utils/get-strapi-url";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getImageUrl(url: any): string | null {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return new URL(url, getStrapiURL()).href;
}

function formatDate(dateStr: string): { day: string; month: string } {
  const d = new Date(dateStr);
  return {
    day: d.getDate().toString(),
    month: d.toLocaleString("en-US", { month: "short" }),
  };
}

const NewsClassicsSection = async ({ page = 1 }: { page?: number }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let articles: any[] = [];
  let totalPages = 1;

  try {
    const res = await getArticles({ page, pageSize: 9 });
    if (res?.data) {
      articles = res.data;
      totalPages = res.meta?.pagination?.pageCount ?? 1;
    }
  } catch (err) {
    console.error("Failed to fetch articles:", err);
  }

  return (
    <section className="news-classic-section- section-padding fix">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="news-standard-wrapper">
              {articles.length === 0 ? (
                <div className="py-5 text-center">
                  <p>No articles found. Check back soon!</p>
                </div>
              ) : (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                articles.map((article: any) => {
                  const imgUrl = getImageUrl(article.coverImage?.url);
                  const date = formatDate(article.publishedAt ?? new Date().toISOString());
                  return (
                    <div key={article.documentId} className="news-standard-items">
                      <div className="news-thumb">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imgUrl || "/img/news/22.jpg"}
                          alt={article.coverImage?.alternativeText ?? article.title}
                          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                        />
                        <div className="post">
                          <h3>
                            {date.day}
                            <span>{date.month}</span>
                          </h3>
                        </div>
                      </div>
                      <div className="news-content">
                        <ul>
                          <li>
                            <i className="far fa-user"></i>
                            By {article.author ?? "Admin"}
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
                        <h3>
                          <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                        </h3>
                        {article.excerpt && <p>{article.excerpt}</p>}
                        <Link href={`/articles/${article.slug}`} className="theme-btn">
                          Read More{" "}
                          <Image src="/img/icon/white-arrow.svg" alt="" width={22} height={16} />
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="page-nav-wrap">
                  <ul>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <li key={p} className={p === page ? "active" : ""}>
                        <Link className="page-numbers" href={`/articles?page=${p}`}>
                          {String(p).padStart(2, "0")}
                        </Link>
                      </li>
                    ))}
                    {page < totalPages && (
                      <li>
                        <Link className="page-numbers" href={`/articles?page=${page + 1}`}>
                          <i className="fal fa-long-arrow-right"></i>
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="main-sideber">
              <div className="single-sidebar-widget">
                <div className="wid-title">
                  <h4>Search</h4>
                </div>
                <div className="search-widget">
                  <form action="/articles" method="GET">
                    <input type="text" name="search" placeholder="Search here" />
                    <button type="submit">
                      <Image src="/img/icon/search_icon.svg" alt="" width={20} height={20} />
                    </button>
                  </form>
                </div>
              </div>
              <div className="single-sidebar-widget">
                <div className="wid-title">
                  <h4>Categories</h4>
                </div>
                <div className="news-widget-categories">
                  <ul>
                    {["Tips", "Destination", "News", "Travel"].map((cat) => (
                      <li key={cat}>
                        <Link href={`/articles?category=${cat.toLowerCase()}`}>{cat}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsClassicsSection;
