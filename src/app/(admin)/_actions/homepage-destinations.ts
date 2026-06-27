"use server";

import { revalidatePath } from "next/cache";
import { writeHomepageDestinationIds } from "@/data/homepage-selections";

export async function saveHomepageDestinations(ids: string[]) {
  writeHomepageDestinationIds(ids.slice(0, 6));
  revalidatePath("/");
  return { success: true };
}
