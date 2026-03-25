'use server'

import { getStrapiURL } from '@/utils/get-strapi-url'

export type Participant = {
  title: string
  first_name: string
  last_name: string
  id_type: 'KTP' | 'Passport'
  id_number: string
}

export type BookingPayload = {
  bookerTitle: string
  booker_first_name: string
  booker_last_name: string
  booker_phone: string
  booker_email: string
  fill_participant_later: boolean
  tour_departure_id: string
  participants: Participant[]
}

export async function submitBooking(payload: BookingPayload) {
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
        bookerTitle: payload.bookerTitle,
        booker_first_name: payload.booker_first_name,
        booker_last_name: payload.booker_last_name,
        booker_phone: payload.booker_phone,
        booker_email: payload.booker_email,
        fill_participant_later: payload.fill_participant_later,
        book_status: 'pending',
        participants: payload.fill_participant_later ? [] : payload.participants,
        ...(payload.tour_departure_id && { tour_departure: payload.tour_departure_id }),
      },
    }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data?.error?.message ?? `Request failed (${res.status})`)
  }

  return res.json()
}
