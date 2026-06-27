import { NextRequest, NextResponse } from "next/server";
import { getStrapiURL } from "@/utils/get-strapi-url";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file || file.size === 0) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const BASE_URL = getStrapiURL();
  const token = process.env.STRAPI_API_TOKEN;
  const url = new URL("/api/upload", BASE_URL);

  const uploadForm = new FormData();
  uploadForm.append("files", file);

  const res = await fetch(url.href, {
    method: "POST",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: uploadForm,
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(`[api/admin/upload] Strapi upload failed: ${res.status}`, body);
    return NextResponse.json({ error: "Upload to Strapi failed" }, { status: 500 });
  }

  const json = await res.json();
  const uploaded = Array.isArray(json) ? json[0] : json;

  if (!uploaded) {
    return NextResponse.json({ error: "No file data returned" }, { status: 500 });
  }

  return NextResponse.json({ id: uploaded.id, url: uploaded.url });
}
