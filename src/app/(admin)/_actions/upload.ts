"use server";

import { strapiUpload } from "../_lib/strapi-admin";

export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return null;

  const uploadForm = new FormData();
  uploadForm.append("files", file);

  return strapiUpload(uploadForm);
}
