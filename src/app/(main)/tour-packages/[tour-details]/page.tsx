import React from 'react';
import TourBookingForm from '@/component/sidebar/TourBookingForm';
import BookingPromoCard from '@/component/sidebar/BookingPromoCard';

// --- MOCK DATA ---
// We'll create mock data that fits our new types
import Avatar1 from "../../../../../public/img/activities/11.jpg";
import Avatar2 from "../../../../../public/img/activities/12.jpg";
import { TourPackageType } from '@/types/tour-detail';
import Breadcrumbs from '@/component/main/shared/Breadcrumbs';
import TourImageSlider from '@/component/main/tour-packages/TourImageSlider';
import TourDescription from '@/component/main/tour-packages/TourDescription';
import TourFeatures from '@/component/main/tour-packages/TourFeatures';
import TourInfoGrid from '@/component/main/tour-packages/TourInfoGrid';
import TourPlanAccordion from '@/component/main/tour-packages/TourPlanAccordion';
import TourReviewSection from '@/component/main/tour-packages/TourReviewSection';

const MOCK_TOUR_DATA: TourPackageType = {
  id: 'ghorepani-poon-hill',
  title: 'Ghorepani Poon Hill Trek',
  locations: 'Bhutan, Maldives, Pokhara',
  descriptionHtml: `
    <p class="mb-3">Consectetur adipisicing elit sed do eiusmod tempor is incididunt ut
    labore et dolore of magna aliqua. ut enim ad minim veniam made of owl the quis nostrud
    exercitation ullamco laboris nisi ut aliquip ex ea dolor commodo consequat duis
    aute irure and dolor in reprehenderit.Nullam semper quam mauris nec mollis felis
    aliquam eu ut non gravida mi quam mauris nec mollis felis aliquam phasellus.</p>
    <p>Consectetur adipisicing elit sed do eiusmod tempor is incididunt ut labore et
    dolore of magna aliqua. ut enim ad minim veniam made of owl the quis nostrud
    exercitation ullamco laboris nisi ut aliquip ex ea dolor commodo consequat duis
    aute irure and dolor in reprehenderit.Nullam semper quam mauris.</p>
  `,
  galleryImages: [
    { src: '/img/package/5.jpg', alt: 'Gallery 1' },
    { src: '/img/package/6.jpg', alt: 'Gallery 2' },
    { src: '/img/package/7.jpg', alt: 'Gallery 3' },
    { src: '/img/package/8.jpg', alt: 'Gallery 4' },
  ],
  features: [
    'Trusted, Local Travel Experts',
    'Flexible, Hassle-Free Bookings',
    'Real-Time Itinerary Updates',
    'Flexible Cancellation Policies',
    'Customized Travel Experiences',
    'Exclusive Travel Deals',
  ],
  infoGrid: [
    { id: 'i1', icon: { src: '/img/icon/27.svg', alt: '' }, label: 'Accommodation', value: '5 Star Hotel' },
    { id: 'i2', icon: { src: '/img/icon/28.svg', alt: '' }, label: 'Admission Free', value: 'No' },
    { id: 'i3', icon: { src: '/img/icon/29.svg', alt: '' }, label: 'Arrival City', value: 'London' },
    { id: 'i4', icon: { src: '/img/icon/30.svg', alt: '' }, label: 'Language', value: 'English' },
    { id: 'i5', icon: { src: '/img/icon/31.svg', alt: '' }, label: 'Hotel Transfer', value: 'Available' },
    { id: 'i6', icon: { src: '/img/icon/32.svg', alt: '' }, label: 'Next Tour', value: 'Available' },
    { id: 'i7', icon: { src: '/img/icon/33.svg', alt: '' }, label: '01 Guide', value: 'Guided' },
    { id: 'i8', icon: { src: '/img/icon/34.svg', alt: '' }, label: 'Maximum Age', value: '60' },
  ],
  tourPlan: [
    { id: 'p1', title: 'Arrival in Phuket and Patong Beach Exploration', descriptionHtml: '<p>Consectetur adipisicing elit sed do eiusmod tempor...</p>', image: { src: '/img/activities/13.jpg', alt: 'Phuket' } },
    { id: 'p2', title: 'Phi Phi Islands Snorkeling Adventure', descriptionHtml: '<p>Consectetur adipisicing elit sed do eiusmod tempor...</p>', image: { src: '/img/activities/13.jpg', alt: 'Phi Phi' } },
    { id: 'p3', title: 'Phang Nga Bay Cruise and Cultural Immersion', descriptionHtml: '<p>Consectetur adipisicing elit sed do eiusmod tempor...</p>', image: { src: '/img/activities/13.jpg', alt: 'Phang Nga' } },
    { id: 'p4', title: 'Leisure Day and Departure', descriptionHtml: '<p>Consectetur adipisicing elit sed do eiusmod tempor...</p>', image: { src: '/img/activities/13.jpg', alt: 'Departure' } },
  ],
  mapEmbedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6678.7619084840835!2d144.9618311901502!3d-37.81450084255415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b4758afc1d%3A0x3119cc820fdfc62e!2sEnvato!5e0!3m2!1sen!2sbd!4v1641984054261!5m2!1sen!2sbd',
  reviewSummary: {
    averageRating: 4.9,
    reviewCount: 484,
    categories: [
      { id: 'services', label: 'Services', percentage: 90 },
      { id: 'safety', label: 'Safety', percentage: 80 },
      { id: 'guides', label: 'Guides', percentage: 70 },
      { id: 'foods', label: 'Foods', percentage: 95 },
      { id: 'hotels', label: 'Hotels', percentage: 75 },
      { id: 'places', label: 'Places', percentage: 85 },
    ],
  },
  reviews: [
    { id: 'r1', author: 'Alexander Cameron', avatar: { src: Avatar1, alt: 'Alexander' }, rating: 5, comment: 'Neque porro est qui dolorem ipsum quia quaed inventor veritatis et quasi architecto var sed efficitur turpis gilla sed sit amet finibus eros.' },
    { id: 'r2', author: 'Ralph Edwards', avatar: { src: Avatar2, alt: 'Ralph' }, rating: 5, comment: 'Neque porro est qui dolorem ipsum quia quaed inventor veritatis et quasi architecto var sed efficitur turpis gilla sed.' },
  ],
  price: 198,
  promoCard: {
    image: { src: '/img/activities/16.jpg', alt: 'Promo' },
    titleHtml: 'Book Now And Enjoy <br> Amazing Savings!',
  },
};
// --- END MOCK DATA ---

// Async function to fetch data (simulated)
async function getTourData(slug: string): Promise<TourPackageType> {
  // In a real app:
  // const res = await fetch(`https://api.example.com/tour-packages/${slug}`);
  // const data = await res.json();
  // return data;
  return Promise.resolve(MOCK_TOUR_DATA);
}


// The Page Component (Server Component)
export default async function TourDetailsPage({ params }: { params: { slug: string } }) {
  
  // 1. Fetch data on the server
  const tour = await getTourData(params.slug);

  return (
    <>
      {/* 2. Use the smart Breadcrumbs component */}
      <Breadcrumbs 
        pageTitle={tour.title} 
        bgImage="/img/breadcrumb/breadcrumb.jpg" 
      />

      {/* 3. Render the main section */}
      <section className="tour-section section-padding fix">
        <div className="container">
          <div className="activities-details-wrapper">
            <div className="row g-4">
              
              {/* --- Main Content Column (Left) --- */}
              <div className="col-lg-8">
                <div className="activities-details-content">
                  <TourImageSlider images={tour.galleryImages} />
                  <TourDescription 
                    title={tour.title} 
                    locations={tour.locations} 
                    descriptionHtml={tour.descriptionHtml} 
                  />
                  <TourFeatures features={tour.features} />
                  <TourInfoGrid info={tour.infoGrid} />
                  <TourPlanAccordion plan={tour.tourPlan} />
                  <div className="map-area">
                    <h3>View in Map</h3>
                    <div className="google-map">
                      <iframe
                        src={tour.mapEmbedSrc}
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                  <TourReviewSection 
                    summary={tour.reviewSummary}
                    reviews={tour.reviews}
                  />
                </div>
              </div>

              {/* --- Sidebar Column (Right) --- */}
              <div className="col-lg-4">
                <div className="main-bar">
                  <TourBookingForm basePrice={tour.price} />
                  <BookingPromoCard 
                    image={tour.promoCard.image} 
                    titleHtml={tour.promoCard.titleHtml} 
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}