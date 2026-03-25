import Image from "next/image";
import Link from "next/link";
import React from "react";
import BrandPartners from "./BrandPartners";
import { getActivities } from "@/data/loader";
import { getStrapiURL } from "@/utils/get-strapi-url";
import { HomeActivitiesProps } from "@/types";

function getIconUrl(url: string | null | undefined): string {
  if (!url) return "/img/icon/01.svg";
  if (url.startsWith("http")) return url;
  return new URL(url, getStrapiURL()).href;
}

const ServiceSection = async ({
  title,
  subtitle,
  description,
}: Readonly<HomeActivitiesProps>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let activities: any[] = [];
  try {
    const res = await getActivities();
    if (res?.data) activities = res.data;
  } catch {}

  return (
    <section className="service-section section-padding pb-0 section-bg fix">
      <div className="shape float-bob-y">
        <Image src="/img/shape/plane-2.png" alt="" width={144} height={350} />
      </div>
      <div className="container">
        <div className="service-wrapper">
          <div className="row g-4">
            <div className="col-xl-4">
              <div className="service-content">
                <div className="section-title">
                  <span className="sub-title wow fadeInUp">{subtitle}</span>
                  <h2 className="wow fadeInUp" data-wow-delay=".3s">
                    {title}
                  </h2>
                </div>
                <p className="wow fadeInUp" data-wow-delay=".5s">
                  {description}
                </p>
                <div className="service-button">
                  <div className="array-button">
                    <button className="array-prev">
                      <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <button className="array-next">
                      <i className="fa-solid fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="swiper service-slider">
                <div className="swiper-wrapper">
                  {activities.length > 0 ? (
                    activities.map((activity) => (
                      <div key={activity.documentId || activity.id} className="swiper-slide">
                        <div className="service-box-item">
                          <div className="icon">
                            <Image
                              src={getIconUrl(activity.activityIcon?.url)}
                              alt={activity.activityIcon?.alternativeText || activity.title}
                              width={40}
                              height={40}
                            />
                          </div>
                          <div className="content">
                            <h3>
                              <Link href="/tour-packages">{activity.title}</Link>
                            </h3>
                            <p>{activity.description}</p>
                            <div className="link-btns">
                              <Link href="/tour-packages">
                                View Details
                                <Image
                                  src="/img/icon/theme-arrow.svg"
                                  alt="img"
                                  width={22}
                                  height={16}
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      {["Hiking & Trekking", "Cultural Tour", "Beach Holiday"].map((name, i) => (
                        <div key={i} className="swiper-slide">
                          <div className="service-box-item">
                            <div className="icon">
                              <Image src={`/img/icon/0${i + 1}.svg`} alt={name} width={40} height={40} />
                            </div>
                            <div className="content">
                              <h3><Link href="/tour-packages">{name}</Link></h3>
                              <p>Explore unforgettable experiences with our expert local guides across Indonesia and Southeast Asia.</p>
                              <div className="link-btns">
                                <Link href="/tour-packages">
                                  View Details
                                  <Image src="/img/icon/theme-arrow.svg" alt="img" width={22} height={16} />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <BrandPartners />

        <div className="service-bottom">
          <div className="content">
            <div className="img">
              <Image src="/img/service/1.png" alt="img" width={180} height={60} />
            </div>
            <p>Partnering with you to transform your vision into reality.</p>
          </div>
          <div className="about-button wow fadeInUp" data-wow-delay=".7s">
            <Link href="/contact" className="theme-btn">
              Contact Us Now
              <Image src="/img/icon/white-arrow.svg" alt="img" width={22} height={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
