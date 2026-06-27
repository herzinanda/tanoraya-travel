import { getAdminDestinations } from "../../_actions/destinations";
import { readHomepageDestinationIds } from "@/data/homepage-selections";
import { DestinationPicker } from "./DestinationPicker";

export const metadata = { title: "Homepage Destinations" };

export default async function HomepageDestinationsPage() {
  const [destResult, selectedIds] = await Promise.all([
    getAdminDestinations({ pageSize: 100 }),
    Promise.resolve(readHomepageDestinationIds()),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allDestinations = ((destResult?.data ?? []) as any[]).map((d: any) => ({
    documentId: d.documentId,
    title: d.title,
    destinationUrl: d.destinationUrl,
    destinationImages: d.destinationImages ?? null,
  }));

  return (
    <DestinationPicker
      allDestinations={allDestinations}
      initialSelected={selectedIds}
    />
  );
}
