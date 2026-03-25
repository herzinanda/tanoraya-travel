"use client";

import { Trash2 } from "lucide-react";
import { Button } from "../../_components/ui/button";
import { ConfirmDialog } from "../../_components/shared/confirm-dialog";
import { deleteTourPackage } from "../../_actions/tour-packages";
import { useRouter } from "next/navigation";

export function DeleteTourButton({
  documentId,
  title,
}: {
  documentId: string;
  title: string;
}) {
  const router = useRouter();

  return (
    <ConfirmDialog
      title="Delete Tour Package"
      description={`Are you sure you want to delete "${title}"? This will also remove all associated departures and variants.`}
      onConfirm={async () => {
        await deleteTourPackage(documentId);
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
