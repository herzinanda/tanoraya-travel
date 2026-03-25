'use server'

import { getStrapiURL } from '@/utils/get-strapi-url'

export type ReviewPayload = {
  reviewerName: string
  reviewerEmail: string
  tourSlug: string
  rating_overall: number
  rating_safety: number
  rating_food: number
  rating_guide: number
  rating_places: number
  comment: string
}

export async function submitReview(payload: ReviewPayload) {
  const token = process.env.STRAPI_API_TOKEN
  const url = new URL('/api/reviews', getStrapiURL())

  const res = await fetch(url.href, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({
      data: {
        reviewerName: payload.reviewerName,
        reviewerEmail: payload.reviewerEmail,
        rating_overall: payload.rating_overall,
        rating_safety: payload.rating_safety,
        rating_food: payload.rating_food,
        rating_guide: payload.rating_guide,
        rating_places: payload.rating_places,
        comment: payload.comment,
        isApproved: false,
      },
    }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data?.error?.message ?? `Request failed (${res.status})`)
  }

  return res.json()
}
