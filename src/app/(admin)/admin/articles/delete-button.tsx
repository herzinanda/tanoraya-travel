"use client";

import { Trash2 } from "lucide-react";
import { Button } from "../../_components/ui/button";
import { ConfirmDialog } from "../../_components/shared/confirm-dialog";
import { deleteArticle } from "../../_actions/articles";
import { useRouter } from "next/navigation";

export function DeleteArticleButton({
  documentId,
  title,
}: {
  documentId: string;
  title: string;
}) {
  const router = useRouter();

  return (
    <ConfirmDialog
      title="Delete Article"
      description={`Are you sure you want to delete "${title}"? This action cannot be undone.`}
      onConfirm={async () => {
        await deleteArticle(documentId);
        router.refresh();
      }}
      trigger={
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      }
    />
  );
}
