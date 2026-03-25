"use client";

import { Trash2 } from "lucide-react";
import { Button } from "../../_components/ui/button";
import { ConfirmDialog } from "../../_components/shared/confirm-dialog";
import { deleteDestination } from "../../_actions/destinations";
import { useRouter } from "next/navigation";

export function DeleteDestinationButton({
  documentId,
  title,
}: {
  documentId: string;
  title: string;
}) {
  const router = useRouter();

  return (
    <ConfirmDialog
      title="Delete Destination"
      description={`Are you sure you want to delete "${title}"? This action cannot be undone.`}
      onConfirm={async () => {
        await deleteDestination(documentId);
        router.refresh();
      }}
      trigger={
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4 text-danger" />
        </Button>
      }
    />
  );
}
