'use client'
import { useEffect } from 'react'

interface SwiperInitProps {
  selector: string
  slidesPerView?: number
  spaceBetween?: number
  loop?: boolean
  paginationEl?: string
  breakpoints?: Record<number, { slidesPerView: number }>
}

export default function SwiperInit({
  selector,
  slidesPerView = 4,
  spaceBetween = 24,
  loop = true,
  paginationEl,
  breakpoints,
}: SwiperInitProps) {
  useEffect(() => {
    let instance: { destroy?: () => void } | null = null

    Promise.all([
      import('swiper'),
      import('swiper/modules'),
    ]).then(([{ default: Swiper }, { Pagination, Autoplay }]) => {
      instance = new Swiper(selector, {
        modules: paginationEl ? [Pagination, Autoplay] : [Autoplay],
        loop,
        slidesPerView,
        spaceBetween,
        ...(paginationEl && {
          pagination: { el: paginationEl, clickable: true },
        }),
        breakpoints: breakpoints ?? {
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
          1200: { slidesPerView: slidesPerView },
        },
      })
    })

    return () => {
      if (instance?.destroy) instance.destroy()
    }
  }, [selector, slidesPerView, spaceBetween, loop, paginationEl, breakpoints])

  return null
}
