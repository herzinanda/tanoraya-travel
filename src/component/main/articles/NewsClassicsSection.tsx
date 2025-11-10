import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewsClassicsSection = () => {
  return (
    <>
      <section className="news-classic-section- section-padding fix">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="news-standard-wrapper">
                <div className="news-standard-items">
                  <div className="news-thumb">
                    <Image
                      src="/img/news/22.jpg"
                      alt="img"
                      width={840}
                      height={500}
                    />
                    <div className="post">
                      <h3>
                        16
                        <span>Dec</span>
                      </h3>
                    </div>
                  </div>
                  <div className="news-content">
                    <ul>
                      <li>
                        <i className="far fa-user"></i>
                        By admin
                      </li>
                      <li>
                        <i className="fa-regular fa-comment"></i>0 Comments
                      </li>
                    </ul>
                    <h3>
                      <Link href="news-details.html">
                        Get Best Advertiser Your Side Pocket.
                      </Link>
                    </h3>
                    <p>
                      Pellentesque egestas rutrum nibh facilisis ultrices.
                      Phasellus in magna ut orci malesuada the sollicitudin.
                      Aenean faucibus scelerisque convallis. Quisque interdum
                      mauris id nunc molestie tincidunt erat gravida. Nullam dui
                      libero, mollis ac quam et, venenatis.
                    </p>
                    <Link href="news-details.html" className="theme-btn">
                      Read More{" "}
                      <Image
                        src="/img/icon/white-arrow.svg"
                        alt=""
                        width={22}
                        height={16}
                      />
                    </Link>
                  </div>
                </div>
                <div className="news-standard-items">
                  <div className="news-thumb">
                    <Image
                      src="/img/news/23.jpg"
                      alt="img"
                      width={840}
                      height={500}
                    />
                    <div className="post">
                      <h3>
                        27
                        <span>Feb</span>
                      </h3>
                    </div>
                  </div>
                  <div className="news-content">
                    <ul>
                      <li>
                        <i className="far fa-user"></i>
                        By admin
                      </li>
                      <li>
                        <i className="fa-regular fa-comment"></i>0 Comments
                      </li>
                    </ul>
                    <h3>
                      <Link href="news-details.html">
                        Supervisor Disapproved of Latest Work.
                      </Link>
                    </h3>
                    <p>
                      Pellentesque egestas rutrum nibh facilisis ultrices.
                      Phasellus in magna ut orci malesuada the sollicitudin.
                      Aenean faucibus scelerisque convallis. Quisque interdum
                      mauris id nunc molestie tincidunt erat gravida. Nullam dui
                      libero, mollis ac quam et, venenatis.
                    </p>
                    <Link href="news-details.html" className="theme-btn">
                      Read More <Image src="/img/icon/white-arrow.svg" alt="" width={22} height={16} />
                    </Link>
                  </div>
                </div>
                <div className="news-standard-items">
                  <div className="news-thumb">
                    <Image
                      src="/img/news/24.jpg"
                      alt="img"
                      width={840}
                      height={500}
                    />
                    <div className="post">
                      <h3>
                        16
                        <span>Dec</span>
                      </h3>
                    </div>
                  </div>
                  <div className="news-content">
                    <ul>
                      <li>
                        <i className="far fa-user"></i>
                        By admin
                      </li>
                      <li>
                        <i className="fa-regular fa-comment"></i>0 Comments
                      </li>
                    </ul>
                    <h3>
                      <Link href="news-details.html">
                        Sakura Dreams and Samurai Tales.
                      </Link>
                    </h3>
                    <p>
                      Pellentesque egestas rutrum nibh facilisis ultrices.
                      Phasellus in magna ut orci malesuada the sollicitudin.
                      Aenean faucibus scelerisque convallis. Quisque interdum
                      mauris id nunc molestie tincidunt erat gravida. Nullam dui
                      libero, mollis ac quam et, venenatis.
                    </p>
                    <Link href="news-details.html" className="theme-btn">
                      Read More <Image src="/img/icon/white-arrow.svg" alt="" width={22} height={16} />
                    </Link>
                  </div>
                </div>
                <div className="page-nav-wrap">
                  <ul>
                    <li className="active">
                      <Link className="page-numbers" href="#">
                        01
                      </Link>
                    </li>
                    <li>
                      <Link className="page-numbers" href="#">
                        02
                      </Link>
                    </li>
                    <li>
                      <Link className="page-numbers" href="#">
                        03
                      </Link>
                    </li>
                    <li>
                      <Link className="page-numbers" href="#">
                        <i className="fal fa-long-arrow-right"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="main-sideber">
                <div className="single-sidebar-widget">
                  <div className="wid-title">
                    <h4>Search</h4>
                  </div>
                  <div className="search-widget">
                    <form action="#">
                      <input type="text" placeholder="Search here" />
                      <button type="submit">
                        <Image
                          src="/img/icon/search_icon.svg"
                          alt=""
                          width={20}
                          height={20}
                        />
                      </button>
                    </form>
                  </div>
                </div>
                <div className="single-sidebar-widget">
                  <div className="wid-title">
                    <h4>Services</h4>
                  </div>
                  <div className="news-widget-categories">
                    <ul>
                      <li>
                        <Link href="news-details.html">Travel</Link>
                        <span>04</span>
                      </li>
                      <li>
                        <Link href="news-details.html">System</Link>
                        <span>03</span>
                      </li>
                      <li>
                        <Link href="news-details.html">Agency</Link>
                        <span>02</span>
                      </li>
                      <li>
                        <Link href="news-details.html">Restaurant</Link>
                        <span>05</span>
                      </li>
                      <li>
                        <Link href="news-details.html">Rant A Car</Link>
                        <span>06</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="single-sidebar-widget">
                  <div className="wid-title">
                    <h4>Recent Post</h4>
                  </div>
                  <div className="recent-post-area">
                    <div className="recent-items">
                      <div className="recent-thumb">
                        <Image
                          src="/img/news/19.jpg"
                          alt="img"
                          width={348}
                          height={160}
                        />
                      </div>
                      <div className="recent-content">
                        <ul>
                          <li>
                            <i className="fa-solid fa-calendar-days"></i>
                            14 Feb, 2024
                          </li>
                        </ul>
                        <h6>
                          <Link href="news-details.html">
                            Enrich Your Mind Envision Your Future Education for
                            Success
                          </Link>
                        </h6>
                      </div>
                    </div>
                    <div className="recent-items">
                      <div className="recent-thumb">
                        <Image
                          src="/img/news/20.jpg"
                          alt="img"
                          width={348}
                          height={160}
                        />
                      </div>
                      <div className="recent-content">
                        <ul>
                          <li>
                            <i className="fa-solid fa-calendar-days"></i>
                            12 Mar, 2024
                          </li>
                        </ul>
                        <h6>
                          <Link href="news-details.html">
                            Quality Assurance Requirements <br /> Web Dev Risk
                            Management
                          </Link>
                        </h6>
                      </div>
                    </div>
                    <div className="recent-items">
                      <div className="recent-thumb">
                        <Image
                          src="/img/news/21.jpg"
                          alt="img"
                          width={348}
                          height={160}
                        />
                      </div>
                      <div className="recent-content">
                        <ul>
                          <li>
                            <i className="fa-solid fa-calendar-days"></i>
                            23 Feb, 2024
                          </li>
                        </ul>
                        <h6>
                          <Link href="news-details.html">
                            Meet Skeleton Svelte Taile Sindey <br /> For
                            Reactive UIs
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="single-sidebar-widget">
                  <div className="wid-title">
                    <h4>Tags</h4>
                  </div>
                  <div className="news-widget-categories">
                    <div className="tagcloud">
                      <Link href="news-details.html">Adventure</Link>
                      <Link href="news-details.html">Traveling</Link>
                      <Link href="news-details.html">Design</Link>
                      <Link href="news-details.html">Travel</Link>
                      <Link href="news-details.html">Change</Link>
                      <Link href="news-details.html">Services</Link>
                      <Link href="news-details.html">World</Link>
                      <Link href="news-details.html">Startup</Link>
                      <Link href="news-details.html">Video</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsClassicsSection;
