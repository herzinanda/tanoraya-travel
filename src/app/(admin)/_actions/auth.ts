"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession } from "../_lib/session";

export async function loginAction(
  _prevState: { error: string } | null,
  formData: FormData
) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const validUsername = process.env.ADMIN_USERNAME;
  const validPassword = process.env.ADMIN_PASSWORD;

  if (!validUsername || !validPassword) {
    return { error: "Admin credentials are not configured on the server." };
  }

  if (username !== validUsername || password !== validPassword) {
    return { error: "Invalid username or password." };
  }

  await createSession(username);
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}
