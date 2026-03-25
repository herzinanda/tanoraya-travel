'use server'

import { getStrapiURL } from '@/utils/get-strapi-url'

export type ContactPayload = {
  name: string
  phone: string
  email: string
  message: string
}

export async function submitContact(payload: ContactPayload) {
  const token = process.env.STRAPI_API_TOKEN
  const url = new URL('/api/contact-submissions', getStrapiURL())

  const res = await fetch(url.href, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({
      data: {
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        message: payload.message,
        isRead: false,
      },
    }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    console.error('[submitContact] Strapi error:', res.status, JSON.stringify(data, null, 2))
    throw new Error(data?.error?.message ?? `Request failed (${res.status})`)
  }

  return res.json()
}
