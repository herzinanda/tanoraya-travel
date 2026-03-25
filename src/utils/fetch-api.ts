type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
};

interface FetchAPIOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  authToken?: string;
  body?: Record<string, unknown>;
  next?: NextFetchRequestConfig;
}

export async function fetchAPI(url: string, options: FetchAPIOptions) {
  const { method, authToken, body, next } = options;

  // Use explicit token, then fall back to env var
  const token = authToken ?? process.env.STRAPI_API_TOKEN;

  const headers: RequestInit & { next?: NextFetchRequestConfig } = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
    ...(next && { next }),
  };

  try {
    const response = await fetch(url, headers);
    const contentType = response.headers.get("content-type");
    if (!response.ok) {
      console.error(`[fetchAPI] ${method} ${url} → ${response.status} ${response.statusText}`);
      return null;
    }
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error(`[fetchAPI] Network error on ${method} ${url}:`, error);
    throw error;
  }
}