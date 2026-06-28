import { getStrapiURL } from "@/utils/get-strapi-url";

const BASE_URL = getStrapiURL();

async function fetchStrapiSettings() {
  try {
    const token = process.env.STRAPI_API_TOKEN;
    const res = await fetch(`${BASE_URL}/api/site-setting`, {
      headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

export async function readHomepageDestinationIds(): Promise<string[]> {
  const data = await fetchStrapiSettings();
  if (!data?.featuredDestinationIds) return [];
  try {
    const parsed = JSON.parse(data.featuredDestinationIds);
    return Array.isArray(parsed) ? parsed.slice(0, 6) : [];
  } catch {
    return [];
  }
}

export async function writeHomepageDestinationIds(ids: string[]): Promise<void> {
  const token = process.env.STRAPI_API_TOKEN;
  await fetch(`${BASE_URL}/api/site-setting`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({
      data: { featuredDestinationIds: JSON.stringify(ids.slice(0, 6)) },
    }),
  });
}
