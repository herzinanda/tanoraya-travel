"use server";

import crypto from "crypto";
import { redirect } from "next/navigation";
import { createSession, destroySession } from "../_lib/session";
import { getStrapiURL } from "@/utils/get-strapi-url";

export async function loginAction(
  _prevState: { error: string } | null,
  formData: FormData
) {
  const email = formData.get("identifier") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please enter your email and password." };
  }

  let res: Response;
  try {
    res = await fetch(new URL("/admin/login", getStrapiURL()).href, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": getStrapiURL(),
      },
      body: JSON.stringify({
        email,
        password,
        deviceId: crypto.randomUUID(),
        rememberMe: false,
      }),
    });
  } catch {
    return { error: "Unable to connect to Strapi. Make sure it is running." };
  }

  const data = await res.json().catch(() => null);

  if (!res.ok || !data || data.error) {
    const message = data?.error?.message ?? "Invalid email or password.";
    return { error: message };
  }

  const user = data.data?.user;
  const token = data.data?.token;

  if (!user || !token) {
    return { error: "Unexpected response from server." };
  }

  const username =
    [user.firstname as string, user.lastname as string].filter(Boolean).join(" ") ||
    (user.email as string);

  await createSession({
    username,
    email: user.email as string,
    strapiToken: token,
  });

  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}
