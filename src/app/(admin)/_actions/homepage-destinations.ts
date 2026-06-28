"use server";

import { revalidatePath } from "next/cache";
import { writeHomepageDestinationIds } from "@/data/homepage-selections";

export async function saveHomepageDestinations(ids: string[]) {
  await writeHomepageDestinationIds(ids.slice(0, 6));
  revalidatePath("/");
  return { success: true };
}
