import { getStrapiURL } from "@/utils/get-strapi-url";
import qs from "qs";

const BASE_URL = getStrapiURL();

function getHeaders(isJson = true): HeadersInit {
  const token = process.env.STRAPI_API_TOKEN;
  return {
    ...(isJson && { "Content-Type": "application/json" }),
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export async function strapiGet<T = unknown>(
  path: string,
  query?: Record<string, unknown>
): Promise<{ data: T; meta?: Record<string, unknown> } | null> {
  const url = new URL(path, BASE_URL);
  if (query) url.search = qs.stringify(query);

  const res = await fetch(url.href, {
    method: "GET",
    headers: getHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    console.error(`[strapiGet] ${res.status} ${res.statusText} — ${url.href}`);
    return null;
  }
  return res.json();
}

export async function strapiPost<T = unknown>(
  path: string,
  data: Record<string, unknown>
): Promise<{ data: T; error?: unknown } | null> {
  const url = new URL(path, BASE_URL);

  const res = await fetch(url.href, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ data }),
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    console.error(`[strapiPost] ${res.status}`, json);
    return json;
  }
  return json;
}

export async function strapiPut<T = unknown>(
  path: string,
  data: Record<string, unknown>
): Promise<{ data: T; error?: unknown } | null> {
  const url = new URL(path, BASE_URL);

  const res = await fetch(url.href, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ data }),
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    console.error(`[strapiPut] ${res.status}`, json);
    return json;
  }
  return json;
}

export async function strapiDelete(path: string): Promise<boolean> {
  const url = new URL(path, BASE_URL);

  const res = await fetch(url.href, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!res.ok) {
    console.error(`[strapiDelete] ${res.status} ${res.statusText}`);
    return false;
  }
  return true;
}

export async function strapiUpload(formData: FormData): Promise<{ id: number; url: string } | null> {
  const token = process.env.STRAPI_API_TOKEN;
  const url = new URL("/api/upload", BASE_URL);

  const res = await fetch(url.href, {
    method: "POST",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      // Do NOT set Content-Type — the browser sets the multipart boundary
    },
    body: formData,
  });

  if (!res.ok) {
    console.error(`[strapiUpload] ${res.status}`);
    return null;
  }

  const json = await res.json();
  // Strapi upload returns an array of uploaded files
  const file = Array.isArray(json) ? json[0] : json;
  return file ? { id: file.id, url: file.url } : null;
}

/**
 * Fetch a simple count of entries for a content type.
 */
export async function strapiCount(path: string, filters?: Record<string, unknown>): Promise<number> {
  const res = await strapiGet(path, {
    pagination: { pageSize: 1 },
    ...(filters && { filters }),
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (res?.meta as any)?.pagination?.total ?? 0;
}
