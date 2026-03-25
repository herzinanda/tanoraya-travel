"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { strapiGet, strapiPost, strapiPut, strapiDelete, strapiUpload } from "../_lib/strapi-admin";

export async function getAdminDestinations({
  page = 1,
  pageSize = 10,
  search,
}: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}) {
  return strapiGet("/api/destinations", {
    populate: {
      destinationImages: { fields: ["url", "alternativeText"] },
    },
    fields: ["documentId", "title", "destinationUrl", "description"],
    ...(search?.trim() && { filters: { title: { $containsi: search.trim() } } }),
    pagination: { page, pageSize },
    sort: "title:asc",
  });
}

export async function getAdminDestination(documentId: string) {
  return strapiGet(`/api/destinations/${documentId}`, {
    populate: "*",
  });
}

export async function createDestination(_prev: unknown, formData: FormData) {
  const title = formData.get("title") as string;
  const destinationUrl = formData.get("destinationUrl") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("destinationImages") as File | null;

  const data: Record<string, unknown> = {
    title,
    destinationUrl,
    description,
  };

  // Upload image if provided
  if (imageFile && imageFile.size > 0) {
    const uploadForm = new FormData();
    uploadForm.append("files", imageFile);
    const uploaded = await strapiUpload(uploadForm);
    if (uploaded) {
      data.destinationImages = uploaded.id;
    }
  }

  const result = await strapiPost("/api/destinations", data);

  if (!result || result.error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const msg = (result?.error as any)?.message ?? "Failed to create destination.";
    return { error: msg };
  }

  revalidatePath("/admin/destinations");
  redirect("/admin/destinations");
}

export async function updateDestination(_prev: unknown, formData: FormData) {
  const documentId = formData.get("documentId") as string;
  const title = formData.get("title") as string;
  const destinationUrl = formData.get("destinationUrl") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("destinationImages") as File | null;

  const data: Record<string, unknown> = {
    title,
    destinationUrl,
    description,
  };

  if (imageFile && imageFile.size > 0) {
    const uploadForm = new FormData();
    uploadForm.append("files", imageFile);
    const uploaded = await strapiUpload(uploadForm);
    if (uploaded) {
      data.destinationImages = uploaded.id;
    }
  }

  const result = await strapiPut(`/api/destinations/${documentId}`, data);

  if (!result || result.error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const msg = (result?.error as any)?.message ?? "Failed to update destination.";
    return { error: msg };
  }

  revalidatePath("/admin/destinations");
  redirect("/admin/destinations");
}

export async function deleteDestination(documentId: string) {
  const ok = await strapiDelete(`/api/destinations/${documentId}`);
  if (!ok) return { error: "Failed to delete destination." };
  revalidatePath("/admin/destinations");
  return { success: true };
}
