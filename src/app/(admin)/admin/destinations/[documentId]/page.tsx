import { getAdminDestination } from "../../../_actions/destinations";
import { EditDestinationForm } from "./edit-form";
import { notFound } from "next/navigation";

export const metadata = { title: "Edit Destination" };

export default async function EditDestinationPage({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) {
  const { documentId } = await params;
  const result = await getAdminDestination(documentId);

  if (!result?.data) notFound();

  return <EditDestinationForm destination={result.data} />;
}
