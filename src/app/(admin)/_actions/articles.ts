"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { strapiGet, strapiPost, strapiPut, strapiDelete } from "../_lib/strapi-admin";

export async function getAdminArticles({
  page = 1,
  pageSize = 10,
  search,
}: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}) {
  return strapiGet("/api/blog-posts", {
    populate: {
      coverImage: { fields: ["url", "alternativeText"] },
    },
    fields: ["title", "slug", "category", "author", "publishedAt", "readTime"],
    ...(search?.trim() && { filters: { title: { $containsi: search.trim() } } }),
    pagination: { page, pageSize },
    sort: "publishedAt:desc",
  });
}

export async function getAdminArticle(documentId: string) {
  return strapiGet(`/api/blog-posts/${documentId}`, {
    populate: {
      coverImage: { fields: ["id", "url", "alternativeText"] },
    },
  });
}

export async function checkArticleSlug(slug: string, excludeDocumentId?: string): Promise<boolean> {
  if (!slug) return false;
  const result = await strapiGet("/api/blog-posts", {
    filters: { slug: { $eq: slug } },
    fields: ["slug", "documentId"],
    pagination: { pageSize: 1 },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = (result?.data as any[]) ?? [];
  if (!items.length) return false;
  if (excludeDocumentId && items[0]?.documentId === excludeDocumentId) return false;
  return true;
}

export async function createArticle(_prev: unknown, formData: FormData) {
  const data = extractArticleData(formData);

  const coverImageId = formData.get("coverImage") as string;
  if (coverImageId && coverImageId !== "") {
    const id = parseInt(coverImageId, 10);
    if (!isNaN(id)) data.coverImage = id;
  }

  const result = await strapiPost("/api/blog-posts", data);

  if (!result || result.error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { error: (result?.error as any)?.message ?? "Failed to create article." };
  }

  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}

export async function updateArticle(_prev: unknown, formData: FormData) {
  const documentId = formData.get("documentId") as string;
  const data = extractArticleData(formData);

  const coverImageId = formData.get("coverImage") as string;
  if (coverImageId && coverImageId !== "") {
    const id = parseInt(coverImageId, 10);
    if (!isNaN(id)) data.coverImage = id;
  } else {
    data.coverImage = null;
  }

  const result = await strapiPut(`/api/blog-posts/${documentId}`, data);

  if (!result || result.error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { error: (result?.error as any)?.message ?? "Failed to update article." };
  }

  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}

export async function deleteArticle(documentId: string) {
  const ok = await strapiDelete(`/api/blog-posts/${documentId}`);
  if (!ok) return { error: "Failed to delete article." };
  revalidatePath("/admin/articles");
  return { success: true };
}

function extractArticleData(formData: FormData): Record<string, unknown> {
  const tagsRaw = formData.get("tags") as string;
  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const readTimeRaw = formData.get("readTime") as string;
  const readTime = readTimeRaw ? parseInt(readTimeRaw, 10) || null : null;

  return {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    excerpt: formData.get("excerpt") as string,
    content: formData.get("content") as string,
    category: formData.get("category") as string,
    author: formData.get("author") as string,
    readTime,
    tags,
  };
}
