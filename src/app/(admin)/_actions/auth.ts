"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession } from "../_lib/session";
import { getStrapiURL } from "@/utils/get-strapi-url";

export async function loginAction(
  _prevState: { error: string } | null,
  formData: FormData
) {
  const identifier = formData.get("identifier") as string;
  const password = formData.get("password") as string;

  if (!identifier || !password) {
    return { error: "Please enter your email and password." };
  }

  try {
    const res = await fetch(new URL("/api/auth/local", getStrapiURL()).href, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      const message = data?.error?.message ?? "Invalid email or password.";
      return { error: message };
    }

    // Store user info in the session
    await createSession({
      username: data.user.username,
      email: data.user.email,
      strapiToken: data.jwt,
    });
  } catch {
    return { error: "Unable to connect to the server. Please try again." };
  }

  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}
