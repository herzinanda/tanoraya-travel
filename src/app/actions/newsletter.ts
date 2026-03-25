'use server'

import { fetchAPI } from '@/utils/fetch-api'
import { getStrapiURL } from '@/utils/get-strapi-url'

export async function subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: 'Please enter a valid email address.' }
  }

  try {
    const url = new URL('/api/newsletter-subscribers', getStrapiURL())
    const res = await fetchAPI(url.href, {
      method: 'POST',
      body: { data: { email, isActive: true } },
    })

    if (!res || res.error) {
      const errMsg = res?.error?.message ?? ''
      if (errMsg.includes('unique') || errMsg.includes('duplicate')) {
        return { success: false, message: 'This email is already subscribed.' }
      }
      return { success: false, message: 'Failed to subscribe. Please try again.' }
    }

    return { success: true, message: 'Thank you for subscribing!' }
  } catch {
    return { success: false, message: 'Failed to subscribe. Please try again.' }
  }
}
