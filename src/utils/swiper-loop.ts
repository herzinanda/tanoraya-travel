/**
 * Swiper turns loop mode off when a slider has fewer slides than
 * `slidesPerView + loopedSlides` (see `loopCreate` in swiper-core), and a
 * non-looping slider stops autoplaying once it reaches the last slide.
 *
 * `loopedSlides` is `max(slidesPerGroup, ceil(slidesPerView / 2))`, so
 * `slidesPerView * 2` is a safe minimum. Repeat the items until we reach it.
 */
export function padForLoop<T>(items: T[], maxSlidesPerView: number): T[] {
  const minimum = maxSlidesPerView * 2
  if (items.length === 0 || items.length >= minimum) return items

  const padded: T[] = []
  while (padded.length < minimum) padded.push(...items)
  return padded
}
