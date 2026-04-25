'use server'

import { getStrapiURL } from '@/utils/get-strapi-url'

export type BookingPayload = {
  bookerTitle: string
  booker_first_name: string
  booker_last_name: string
  booker_phone: string
  booker_email: string
  booker_notes?: string
  tour_departure_id: string
  num_participants: number
  book_status?: 'pending' | 'quote_requested'
  tour_code?: string
  booking_type?: 'book' | 'quote' | 'custom'
}

const TYPE_PREFIX: Record<string, string> = {
  book: 'BO',
  quote: 'QR',
  custom: 'CD',
}

/**
 * Generate a structured booking reference:
 * {TYPE}-{TOURCODE}{YYMM}-{NNNN}
 *
 * e.g. BO-DNT2604-0001, QR-BLI2604-0002, CD-DNT2604-0003
 */
async function generateBookingRef(
  tourCode: string,
  bookingType: string,
): Promise<string> {
  const now = new Date()
  const yy = String(now.getFullYear()).slice(-2)
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const prefix = TYPE_PREFIX[bookingType] || 'BO'
  const code = (tourCode || 'GEN').toUpperCase()
  const pattern = `${prefix}-${code}${yy}${mm}-`

  // Query Strapi for existing bookings with same prefix this month
  const token = process.env.STRAPI_API_TOKEN
  let seq = 1
  try {
    const searchUrl = new URL('/api/bookings', getStrapiURL())
    searchUrl.searchParams.set('filters[booking_ref][$startsWith]', pattern)
    searchUrl.searchParams.set('sort', 'booking_ref:DESC')
    searchUrl.searchParams.set('pagination[pageSize]', '1')
    searchUrl.searchParams.set('fields[0]', 'booking_ref')

    const res = await fetch(searchUrl.href, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })

    if (res.ok) {
      const json = await res.json()
      const lastRef = json?.data?.[0]?.booking_ref as string | undefined
      if (lastRef) {
        // Extract the sequence number from the last part: "BO-DNT2604-0012" → 12
        const lastSeq = parseInt(lastRef.split('-').pop() || '0', 10)
        seq = lastSeq + 1
      }
    }
  } catch {
    // If query fails, fallback to timestamp-based sequence
    seq = parseInt(String(now.getTime()).slice(-4), 10)
  }

  return `${pattern}${String(seq).padStart(4, '0')}`
}

export async function submitBooking(payload: BookingPayload) {
  const token = process.env.STRAPI_API_TOKEN
  const url = new URL('/api/bookings', getStrapiURL())

  const bookingRef = await generateBookingRef(
    payload.tour_code || '',
    payload.booking_type || 'book',
  )

  const res = await fetch(url.href, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({
      data: {
        booking_ref: bookingRef,
        bookerTitle: payload.bookerTitle,
        booker_first_name: payload.booker_first_name,
        booker_last_name: payload.booker_last_name,
        booker_phone: payload.booker_phone,
        booker_email: payload.booker_email,
        booker_notes: payload.booker_notes || '',
        book_status: payload.book_status ?? 'pending',
        ...(payload.tour_departure_id && { tour_departure: payload.tour_departure_id }),
      },
    }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data?.error?.message ?? `Request failed (${res.status})`)
  }

  const result = await res.json()

  // Return the booking_ref as the reference ID instead of documentId
  return {
    ...result,
    bookingRef,
  }
}
