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
    fields: ["title", "slug", "Price", "duration", "isFeatured", "tourCode"],
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

export async function getAllDestinationsForSelect() {
  return strapiGet("/api/destinations", {
    fields: ["title", "destinationUrl"],
    pagination: { pageSize: 100 },
    sort: "title:asc",
  });
}

export async function createTourPackage(_prev: unknown, formData: FormData) {
  const data = extractTourData(formData);

  // Upload thumbnail
  const thumbnailFile = formData.get("tourImageThumbnail") as File | null;
  if (thumbnailFile && thumbnailFile.size > 0) {
    const uploadForm = new FormData();
    uploadForm.append("files", thumbnailFile);
    const uploaded = await strapiUpload(uploadForm);
    if (uploaded) data.tourImageThumbnail = uploaded.id;
  }

  // Upload gallery images
  const galleryIds = await uploadMultipleFiles(formData, "galleryImages");
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

  // Upload thumbnail if new file provided
  const thumbnailFile = formData.get("tourImageThumbnail") as File | null;
  if (thumbnailFile && thumbnailFile.size > 0) {
    const uploadForm = new FormData();
    uploadForm.append("files", thumbnailFile);
    const uploaded = await strapiUpload(uploadForm);
    if (uploaded) data.tourImageThumbnail = uploaded.id;
  }

  // Upload new gallery images
  const galleryIds = await uploadMultipleFiles(formData, "galleryImages");
  if (galleryIds.length > 0) {
    // Get existing gallery IDs to merge
    const existingIds = formData.get("existingGalleryIds") as string;
    const existing = existingIds ? existingIds.split(",").map(Number).filter(Boolean) : [];
    data.galleryImages = [...existing, ...galleryIds];
  }

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

async function uploadMultipleFiles(formData: FormData, fieldName: string): Promise<number[]> {
  const files = formData.getAll(fieldName) as File[];
  const ids: number[] = [];
  for (const file of files) {
    if (file && file.size > 0) {
      const uploadForm = new FormData();
      uploadForm.append("files", file);
      const uploaded = await strapiUpload(uploadForm);
      if (uploaded) ids.push(uploaded.id);
    }
  }
  return ids;
}

function linesToJson(text: string | null): string[] {
  if (!text) return [];
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function extractTourData(formData: FormData): Record<string, unknown> {
  const destination = formData.get("destination") as string;

  return {
    tourCode: (formData.get("tourCode") as string) || undefined,
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    tour_description: formData.get("tour_description") as string,
    Price: Number(formData.get("Price")) || 0,
    pricePerPerson: Number(formData.get("pricePerPerson")) || undefined,
    discountPrice: Number(formData.get("discountPrice")) || undefined,
    duration: Number(formData.get("duration")) || 1,
    durationNights: Number(formData.get("durationNights")) || undefined,
    minGroupSize: Number(formData.get("minGroupSize")) || undefined,
    maxGroupSize: Number(formData.get("maxGroupSize")) || undefined,
    difficulty: (formData.get("difficulty") as string) || undefined,
    isFeatured: formData.get("isFeatured") === "on",
    destination: destination || null,
    highlights: linesToJson(formData.get("highlights") as string),
    inclusions: linesToJson(formData.get("inclusions") as string),
    exclusions: linesToJson(formData.get("exclusions") as string),
    mapEmbedSrc: formData.get("mapEmbedSrc") as string,
    metaTitle: (formData.get("metaTitle") as string) || undefined,
    metaDescription: (formData.get("metaDescription") as string) || undefined,
  };
}
