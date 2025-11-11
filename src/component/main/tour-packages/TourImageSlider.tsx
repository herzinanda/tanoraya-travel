"use client";

import React from 'react';
import Image from 'next/image';
import { ImageType } from '@/types';
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
  const [thumbsSwiper, setThumbsSwiper] = React.useState<any>(null); // State for thumbs swiper instance

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
            <div className="thumb">
              <Image 
                src={image.src} 
                alt={image.alt} 
                width={800} 
                height={500}
                className="w-100 h-auto"
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
            <div className="thumb">
              <Image 
                src={image.src} 
                alt={image.alt} 
                width={200} 
                height={150} 
                className="w-100 h-auto"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TourImageSlider;