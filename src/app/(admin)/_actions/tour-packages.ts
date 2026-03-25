"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { strapiGet, strapiPost, strapiPut, strapiDelete, strapiUpload } from "../_lib/strapi-admin";

export async function getAdminTourPackages({
  page = 1,
  pageSize = 10,
  search,
}: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}) {
  return strapiGet("/api/tour-packages", {
    populate: {
      tourImageThumbnail: { fields: ["url", "alternativeText"] },
      destination: { fields: ["title", "destinationUrl"] },
    },
    fields: ["documentId", "title", "slug", "Price", "totalDays", "isFeatured"],
    ...(search?.trim() && { filters: { title: { $containsi: search.trim() } } }),
    pagination: { page, pageSize },
    sort: "title:asc",
  });
}

export async function getAdminTourPackage(documentId: string) {
  return strapiGet(`/api/tour-packages/${documentId}`, {
    populate: "*",
  });
}

export async function createTourPackage(_prev: unknown, formData: FormData) {
  const data = extractTourData(formData);
  const thumbnailFile = formData.get("tourImageThumbnail") as File | null;

  if (thumbnailFile && thumbnailFile.size > 0) {
    const uploadForm = new FormData();
    uploadForm.append("files", thumbnailFile);
    const uploaded = await strapiUpload(uploadForm);
    if (uploaded) data.tourImageThumbnail = uploaded.id;
  }

  const result = await strapiPost("/api/tour-packages", data);

  if (!result || result.error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { error: (result?.error as any)?.message ?? "Failed to create tour package." };
  }

  revalidatePath("/admin/tour-packages");
  redirect("/admin/tour-packages");
}

export async function updateTourPackage(_prev: unknown, formData: FormData) {
  const documentId = formData.get("documentId") as string;
  const data = extractTourData(formData);
  const thumbnailFile = formData.get("tourImageThumbnail") as File | null;

  if (thumbnailFile && thumbnailFile.size > 0) {
    const uploadForm = new FormData();
    uploadForm.append("files", thumbnailFile);
    const uploaded = await strapiUpload(uploadForm);
    if (uploaded) data.tourImageThumbnail = uploaded.id;
  }

  const result = await strapiPut(`/api/tour-packages/${documentId}`, data);

  if (!result || result.error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { error: (result?.error as any)?.message ?? "Failed to update tour package." };
  }

  revalidatePath("/admin/tour-packages");
  redirect(`/admin/tour-packages/${documentId}`);
}

export async function deleteTourPackage(documentId: string) {
  const ok = await strapiDelete(`/api/tour-packages/${documentId}`);
  if (!ok) return { error: "Failed to delete tour package." };
  revalidatePath("/admin/tour-packages");
  return { success: true };
}

function extractTourData(formData: FormData): Record<string, unknown> {
  return {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    Price: Number(formData.get("Price")) || 0,
    totalDays: Number(formData.get("totalDays")) || 1,
    description: formData.get("description") as string,
    isFeatured: formData.get("isFeatured") === "on",
    destination: formData.get("destination") || null,
    highlights: formData.get("highlights") as string,
    inclusions: formData.get("inclusions") as string,
    exclusions: formData.get("exclusions") as string,
    mapEmbedSrc: formData.get("mapEmbedSrc") as string,
  };
}
