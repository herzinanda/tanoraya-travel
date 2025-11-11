import React from "react";

// --- MOCK DATA ---
// In a real app, you would fetch this data based on the 'slug'
import Avatar1 from "../../../../../public/img/activities/11.jpg";
import Avatar2 from "../../../../../public/img/activities/12.jpg";
import { DestinationType } from "@/types/destination-detail";
import { SidebarDataType } from "@/types/sidebar-destination-details";
import DestinationContent from "@/component/main/destinations/DestinationContent";
import ReviewSection from "@/component/main/destinations/ReviewSection";
import Sidebar from "@/component/sidebar/Sidebar";
import Breadcrumbs from "@/component/main/shared/Breadcrumbs";

const MOCK_DESTINATION: DestinationType = {
  id: "south-africa",
  title: "Explore the Beautiful Charm of South Africa",
  mainImage: { src: "/img/destinations/20.jpg", alt: "South Africa Landscape" },
  descriptionHtml: `
    <p>Consectetur adipisicing elit sed do eiusmod tempor is incididunt ut labore et dolore
    of magna aliqua. ut enim ad minim veniam made of owl the quis nostrud exercitation
    ullamco laboris nisi ut aliquip ex ea dolor commodo consequat duis aute irure and
    dolor in reprehenderit.</p>
    <p class="mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. At volutpat diam ut venenatis tellus in
    metus. Sem et tortor consequat id porta.</p>
  `,
  galleryImages: [
    { src: "/img/destinations/21.jpg", alt: "Gallery Image 1" },
    { src: "/img/destinations/22.jpg", alt: "Gallery Image 2" },
  ],
  mapEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6678.7619084840835!2d144.9618311901502!3d-37.81450084255415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b4758afc1d%3A0x3119cc820fdfc62e!2sEnvato!5e0!3m2!1sen!2sbd!4v1641984054261!5m2!1sen!2sbd",
  reviews: [
    {
      id: "r1",
      author: "Alexander Cameron",
      avatar: { src: Avatar1, alt: "Alexander" },
      rating: 5,
      comment:
        "Neque porro est qui dolorem ipsum quia quaed inventor veritatis et quasi architecto var sed efficitur turpis gilla sed sit amet finibus eros.",
    },
    {
      id: "r2",
      author: "Ralph Edwards",
      avatar: { src: Avatar2, alt: "Ralph" },
      rating: 5,
      comment:
        "Neque porro est qui dolorem ipsum quia quaed inventor veritatis et quasi architecto var sed efficitur turpis gilla sed.",
    },
  ],
};

const MOCK_SIDEBAR: SidebarDataType = {
  recentTours: [
    {
      id: "t1",
      title: "Enrich Your Mind Envision Your Future",
      href: "/destination/tour-1",
      image: { src: "/img/destinations/23.jpg", alt: "Tour 1" },
      rating: 5,
    },
    {
      id: "t2",
      title: "Quality Assurance Requirements Web Dev",
      href: "/destination/tour-2",
      image: { src: "/img/destinations/24.jpg", alt: "Tour 2" },
      rating: 5,
    },
    {
      id: "t3",
      title: "Meet Skeleton Svelte Taile Sindey",
      href: "/destination/tour-3",
      image: { src: "/img/destinations/25.jpg", alt: "Tour 3" },
      rating: 5,
    },
  ],
};
// --- END MOCK DATA ---

// Async function to fetch data (simulated)
async function getDestinationData(slug: string): Promise<DestinationType> {
  // In a real app:
  // const res = await fetch(`https://api.example.com/destinations/${slug}`);
  // const data = await res.json();
  // return data;

  // For now, return mock data
  return Promise.resolve(MOCK_DESTINATION);
}

async function getSidebarData(): Promise<SidebarDataType> {
  return Promise.resolve(MOCK_SIDEBAR);
}

// The Page Component (Server Component)
export default async function DestinationDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const destination = await getDestinationData(params.slug);
  const sidebarData = await getSidebarData();


  return (
    <>
      <Breadcrumbs
        pageTitle={destination.title}
        bgImage="/img/breadcrumb/breadcrumb.jpg"
      />

      <section className="destination-details-section section-padding fix">
        <div className="container">
          <div className="row g-4">
            {/* --- Main Content Column --- */}
            <div className="col-lg-8">
              <div className="destination-details-wrapper">
                {/* 2. Pass data to components */}
                <DestinationContent destination={destination} />
                <ReviewSection reviews={destination.reviews} />
              </div>
            </div>

            {/* --- Sidebar Column --- */}
            {/* 3. Pass data to the sidebar */}
            <Sidebar data={sidebarData} />
          </div>
        </div>
      </section>
    </>
  );
}
