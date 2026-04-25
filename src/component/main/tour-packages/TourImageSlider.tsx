"use client";

import React from 'react';

import { ImageType } from '@/types/index';
import { getStrapiMedia } from '@/component/main/home/StrapiImage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

type TourImageSliderProps = {
  images: ImageType[];
};

const TourImageSlider = ({ images }: TourImageSliderProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [thumbsSwiper, setThumbsSwiper] = React.useState<any>(null);

  return (
    <div className="activities-content-items">
      {/* Main Slider */}
      <Swiper
        modules={[Navigation, Thumbs]}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className="swiper imgSlider2"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="thumb" style={{ borderRadius: 20, overflow: 'hidden', height: 460 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getStrapiMedia(image.src as string) || ''}
                alt={image.alt}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Slider */}
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs, FreeMode]}
        spaceBetween={10}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        className="swiper imgSlider"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="thumb" style={{ borderRadius: 12, overflow: 'hidden', height: 120, cursor: 'pointer' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getStrapiMedia(image.src as string) || ''}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TourImageSlider;
