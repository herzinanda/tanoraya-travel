'use server'

import { getStrapiURL } from '@/utils/get-strapi-url'

export type QuotePayload = {
  full_name: string
  last_name: string
  booker_title: string
  email: string
  phone: string
  destination_interest: string
  preferred_travel_month: string
  number_of_travellers: number
  budget_range: string
  special_requirements: string
  how_did_you_hear: string
}

export async function submitQuote(payload: QuotePayload) {
  const token = process.env.STRAPI_API_TOKEN
  const url = new URL('/api/bookings', getStrapiURL())

  const res = await fetch(url.href, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({
      data: {
        ...(payload.booker_title && { bookerTitle: payload.booker_title }),
        booker_first_name: payload.full_name,
        booker_last_name: payload.last_name,
        booker_email: payload.email,
        booker_phone: payload.phone,
        book_status: 'pending',
        fill_participant_later: true,
        booker_notes: [
          payload.destination_interest && `Destination: ${payload.destination_interest}`,
          payload.preferred_travel_month && `Travel Month: ${payload.preferred_travel_month}`,
          `Travellers: ${payload.number_of_travellers}`,
          payload.budget_range && `Budget: ${payload.budget_range}`,
          payload.how_did_you_hear && `Source: ${payload.how_did_you_hear}`,
          payload.special_requirements && `Requirements: ${payload.special_requirements}`,
        ].filter(Boolean).join('\n'),
      },
    }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    console.error('[submitQuote] Strapi error:', res.status, JSON.stringify(data, null, 2))
    throw new Error(data?.error?.message ?? `Request failed (${res.status})`)
  }

  return res.json()
}
