"use server";

import { revalidatePath } from "next/cache";
import { strapiGet, strapiPut, strapiUpload } from "../_lib/strapi-admin";

export async function getAdminPromo() {
  return strapiGet("/api/promo-popup", {
    populate: {
      image: { fields: ["url", "alternativeText"] },
    },
  });
}

export async function updatePromo(_prev: unknown, formData: FormData) {
  const data: Record<string, unknown> = {
    title: formData.get("title") as string,
    subtitle: formData.get("subtitle") as string,
    description: formData.get("description") as string,
    badge: formData.get("badge") as string,
    ctaLabel: formData.get("ctaLabel") as string,
    ctaUrl: formData.get("ctaUrl") as string,
    isActive: formData.get("isActive") === "on",
    expiresAt: formData.get("expiresAt") as string || null,
  };

  const imageFile = formData.get("image") as File | null;
  if (imageFile && imageFile.size > 0) {
    const uploadForm = new FormData();
    uploadForm.append("files", imageFile);
    const uploaded = await strapiUpload(uploadForm);
    if (uploaded) data.image = uploaded.id;
  }

  const result = await strapiPut("/api/promo-popup", data);

  if (!result || result.error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { error: (result?.error as any)?.message ?? "Failed to update promo." };
  }

  revalidatePath("/admin/promo");
  return { success: true };
}
