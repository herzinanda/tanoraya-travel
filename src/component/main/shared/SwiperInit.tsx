'use client'
import { useEffect } from 'react'

interface SwiperInitProps {
  selector: string
  slidesPerView?: number
  spaceBetween?: number
  loop?: boolean
  /** Autoplay delay in ms. Pass `false` to disable autoplay entirely. */
  autoplayDelay?: number | false
  speed?: number
  paginationEl?: string
  breakpoints?: Record<number, { slidesPerView: number }>
}

export default function SwiperInit({
  selector,
  slidesPerView = 4,
  spaceBetween = 24,
  loop = true,
  autoplayDelay = 2000,
  speed = 2000,
  paginationEl,
  breakpoints,
}: SwiperInitProps) {
  // Object props get a fresh identity on every render, which would otherwise
  // destroy and rebuild the slider on each one.
  const breakpointsKey = JSON.stringify(breakpoints ?? null)

  useEffect(() => {
    let instances: { destroy: () => void }[] = []
    let cancelled = false

    Promise.all([
      import('swiper'),
      import('swiper/modules'),
    ]).then(([{ default: Swiper }, { Pagination, Autoplay }]) => {
      if (cancelled) return

      // Init each element individually rather than handing Swiper the selector:
      // a selector matching several elements makes the constructor return an
      // array (whose `.destroy` is undefined, so cleanup would leak), and
      // Swiper has no re-init guard — a second instance on an already-mounted
      // element leaves both alive, fighting over the same wrapper transform.
      const elements = Array.from(
        document.querySelectorAll<HTMLElement & { swiper?: unknown }>(selector),
      ).filter((el) => !el.swiper)

      instances = elements.map((el) =>
        new Swiper(el, {
          modules: paginationEl ? [Pagination, Autoplay] : [Autoplay],
          loop,
          speed,
          slidesPerView,
          spaceBetween,
          ...(autoplayDelay !== false && {
            autoplay: { delay: autoplayDelay, disableOnInteraction: false },
          }),
          ...(paginationEl && {
            // Scope the dots to this slider's own section when possible.
            pagination: {
              el: el.closest('section')?.querySelector<HTMLElement>(paginationEl) ?? paginationEl,
              clickable: true,
            },
          }),
          breakpoints: (breakpointsKey && JSON.parse(breakpointsKey)) || {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: slidesPerView },
          },
        }),
      )
    })

    return () => {
      cancelled = true
      instances.forEach((instance) => instance.destroy())
      instances = []
    }
  }, [selector, slidesPerView, spaceBetween, loop, autoplayDelay, speed, paginationEl, breakpointsKey])

  return null
}
