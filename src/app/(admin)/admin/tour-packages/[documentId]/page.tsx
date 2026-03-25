import { notFound } from "next/navigation";
import { getAdminTourPackage } from "../../../_actions/tour-packages";
import { getAdminDepartures, getAdminVariants } from "../../../_actions/departures";
import { EditTourTabs } from "./edit-tour-tabs";

export const metadata = { title: "Edit Tour Package" };

export default async function EditTourPage({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) {
  const { documentId } = await params;

  const [tourResult, departuresResult, variantsResult] = await Promise.all([
    getAdminTourPackage(documentId),
    getAdminDepartures(documentId),
    getAdminVariants(documentId),
  ]);

  if (!tourResult?.data) notFound();

  return (
    <EditTourTabs
      tour={tourResult.data}
      departures={(departuresResult?.data as unknown[]) ?? []}
      variants={(variantsResult?.data as unknown[]) ?? []}
    />
  );
}
