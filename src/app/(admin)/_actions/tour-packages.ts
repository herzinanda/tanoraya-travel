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
    fields: ["title", "slug", "duration", "isFeatured", "tourCode", "publishedAt"],
    status: "draft",
    ...(search?.trim() && { filters: { title: { $containsi: search.trim() } } }),
    pagination: { page, pageSize },
    sort: "title:asc",
  });
}

export async function getAdminTourPackage(documentId: string) {
  return strapiGet(`/api/tour-packages/${documentId}`, {
    populate: "*",
    status: "draft",
  });
}

export async function getAllDestinationsForSelect() {
  return strapiGet("/api/destinations", {
    fields: ["title", "destinationUrl"],
    pagination: { pageSize: 100 },
    sort: "title:asc",
  });
}

export async function createTourPackage(_prev: unknown, formData: FormData) {
  const data = extractTourData(formData);

  // ImageUpload uploads immediately and stores the Strapi media ID in a hidden input
  const thumbnailId = Number(formData.get("tourImageThumbnail"));
  if (thumbnailId) data.tourImageThumbnail = thumbnailId;

  const galleryIds = (formData.getAll("galleryImages") as string[]).map(Number).filter(Boolean);
  if (galleryIds.length > 0) data.galleryImages = galleryIds;

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

  // ImageUpload uploads immediately and stores the Strapi media ID in a hidden input
  const thumbnailId = Number(formData.get("tourImageThumbnail"));
  if (thumbnailId) data.tourImageThumbnail = thumbnailId;

  // Merge existing gallery IDs with any newly uploaded ones
  const existingIds = (formData.get("existingGalleryIds") as string)
    ?.split(",").map(Number).filter(Boolean) ?? [];
  const newGalleryIds = (formData.getAll("galleryImages") as string[]).map(Number).filter(Boolean);
  const allGalleryIds = [...existingIds, ...newGalleryIds];
  if (allGalleryIds.length > 0) data.galleryImages = allGalleryIds;

  const result = await strapiPut(`/api/tour-packages/${documentId}`, data);

  if (!result || result.error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { error: (result?.error as any)?.message ?? "Failed to update tour package." };
  }

  revalidatePath("/admin/tour-packages");
  redirect(`/admin/tour-packages/${documentId}`);
}

export async function updateTourComponents(
  documentId: string,
  data: Record<string, unknown>,
) {
  const result = await strapiPut(`/api/tour-packages/${documentId}`, data);
  if (!result || result.error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { error: (result?.error as any)?.message ?? "Failed to update." };
  }
  revalidatePath(`/admin/tour-packages/${documentId}`);
  return { success: true };
}

export async function uploadItineraryFile(documentId: string, formData: FormData) {
  const file = formData.get("itinerary_file") as File | null;
  if (!file || file.size === 0) return { error: "No file selected." };

  const uploadForm = new FormData();
  uploadForm.append("files", file);
  const uploaded = await strapiUpload(uploadForm);
  if (!uploaded) return { error: "Upload failed." };

  const result = await strapiPut(`/api/tour-packages/${documentId}`, {
    itinerary_file: uploaded.id,
  });

  if (!result || result.error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { error: (result?.error as any)?.message ?? "Failed to update." };
  }

  revalidatePath(`/admin/tour-packages/${documentId}`);
  return { success: true };
}

export async function deleteTourPackage(documentId: string) {
  const ok = await strapiDelete(`/api/tour-packages/${documentId}`);
  if (!ok) return { error: "Failed to delete tour package." };
  revalidatePath("/admin/tour-packages");
  return { success: true };
}

export async function publishTourPackage(documentId: string) {
  const result = await strapiPut(`/api/tour-packages/${documentId}`, {
    publishedAt: new Date().toISOString(),
  });
  if (!result || result.error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { error: (result?.error as any)?.message ?? "Failed to publish." };
  }
  revalidatePath("/admin/tour-packages");
  revalidatePath(`/admin/tour-packages/${documentId}`);
  return { success: true };
}

export async function unpublishTourPackage(documentId: string) {
  const result = await strapiPut(`/api/tour-packages/${documentId}`, {
    publishedAt: null,
  });
  if (!result || result.error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { error: (result?.error as any)?.message ?? "Failed to unpublish." };
  }
  revalidatePath("/admin/tour-packages");
  revalidatePath(`/admin/tour-packages/${documentId}`);
  return { success: true };
}

function extractTourData(formData: FormData): Record<string, unknown> {
  const destination = formData.get("destination") as string;

  return {
    // Price is required in Strapi schema; set 0 as default since pricing is managed in departures
    Price: 0,
    tourCode: (formData.get("tourCode") as string) || undefined,
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    tour_description: formData.get("tour_description") as string,
    duration: Number(formData.get("duration")) || 1,
    durationNights: Number(formData.get("durationNights")) || undefined,
    minGroupSize: Number(formData.get("minGroupSize")) || undefined,
    maxGroupSize: Number(formData.get("maxGroupSize")) || undefined,
    difficulty: (formData.get("difficulty") as string) || undefined,
    isFeatured: formData.get("isFeatured") === "on",
    destination: destination || null,
    metaTitle: (formData.get("metaTitle") as string) || undefined,
    metaDescription: (formData.get("metaDescription") as string) || undefined,
  };
}
