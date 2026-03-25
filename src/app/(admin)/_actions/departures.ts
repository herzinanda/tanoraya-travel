"use server";

import { revalidatePath } from "next/cache";
import { strapiGet, strapiPost, strapiPut, strapiDelete } from "../_lib/strapi-admin";

export async function getAdminDepartures(tourDocumentId: string) {
  return strapiGet("/api/tour-departures", {
    filters: {
      tour_package: { documentId: { $eq: tourDocumentId } },
    },
    populate: { variant: true },
    pagination: { pageSize: 100 },
    sort: "departureDate:asc",
  });
}

export async function createDeparture(tourDocumentId: string, formData: FormData) {
  const data: Record<string, unknown> = {
    departureDate: formData.get("departureDate") as string,
    returnDate: formData.get("returnDate") as string || null,
    availableSeats: Number(formData.get("availableSeats")) || 0,
    priceOverride: Number(formData.get("priceOverride")) || null,
    status: formData.get("status") as string || "open",
    tour_package: tourDocumentId,
    variant: formData.get("variant") || null,
  };

  const result = await strapiPost("/api/tour-departures", data);

  if (!result || result.error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { error: (result?.error as any)?.message ?? "Failed to create departure." };
  }

  revalidatePath(`/admin/tour-packages/${tourDocumentId}`);
  return { success: true };
}

export async function updateDeparture(
  departureDocId: string,
  tourDocumentId: string,
  formData: FormData
) {
  const data: Record<string, unknown> = {
    departureDate: formData.get("departureDate") as string,
    returnDate: formData.get("returnDate") as string || null,
    availableSeats: Number(formData.get("availableSeats")) || 0,
    priceOverride: Number(formData.get("priceOverride")) || null,
    status: formData.get("status") as string || "open",
    variant: formData.get("variant") || null,
  };

  const result = await strapiPut(`/api/tour-departures/${departureDocId}`, data);

  if (!result || result.error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { error: (result?.error as any)?.message ?? "Failed to update departure." };
  }

  revalidatePath(`/admin/tour-packages/${tourDocumentId}`);
  return { success: true };
}

export async function deleteDeparture(departureDocId: string, tourDocumentId: string) {
  const ok = await strapiDelete(`/api/tour-departures/${departureDocId}`);
  if (!ok) return { error: "Failed to delete departure." };
  revalidatePath(`/admin/tour-packages/${tourDocumentId}`);
  return { success: true };
}

export async function getAdminVariants(tourDocumentId: string) {
  return strapiGet("/api/tour-variants", {
    filters: {
      tour_package: { documentId: { $eq: tourDocumentId } },
    },
    pagination: { pageSize: 50 },
  });
}

export async function createVariant(tourDocumentId: string, formData: FormData) {
  const data: Record<string, unknown> = {
    name: formData.get("name") as string,
    description: formData.get("description") as string || null,
    priceModifier: Number(formData.get("priceModifier")) || 0,
    tour_package: tourDocumentId,
  };

  const result = await strapiPost("/api/tour-variants", data);

  if (!result || result.error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { error: (result?.error as any)?.message ?? "Failed to create variant." };
  }

  revalidatePath(`/admin/tour-packages/${tourDocumentId}`);
  return { success: true };
}

export async function deleteVariant(variantDocId: string, tourDocumentId: string) {
  const ok = await strapiDelete(`/api/tour-variants/${variantDocId}`);
  if (!ok) return { error: "Failed to delete variant." };
  revalidatePath(`/admin/tour-packages/${tourDocumentId}`);
  return { success: true };
}
