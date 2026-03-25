"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../_components/ui/card";
import { Button } from "../../../_components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../_components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../_components/ui/dialog";
import { FormField } from "../../../_components/shared/form-field";
import { ConfirmDialog } from "../../../_components/shared/confirm-dialog";
import { createVariant, deleteVariant } from "../../../_actions/departures";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function VariantsTab({ tourDocumentId, variants }: { tourDocumentId: string; variants: any[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    const result = await createVariant(tourDocumentId, formData);
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    setOpen(false);
    router.refresh();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Variants ({variants.length})</CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              Add Variant
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Variant</DialogTitle>
            </DialogHeader>
            <form action={handleCreate} className="space-y-4">
              {error && (
                <div className="bg-danger-light text-danger text-sm px-3 py-2 rounded-md">{error}</div>
              )}
              <FormField label="Name" name="name" placeholder="e.g. Standard, Premium" required />
              <FormField label="Description" name="description" type="textarea" placeholder="Optional description" rows={3} />
              <FormField label="Price Modifier (Rp)" name="priceModifier" type="number" placeholder="0" hint="Additional cost for this variant" />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Adding..." : "Add Variant"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price Modifier</TableHead>
              <TableHead className="w-[60px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variants.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-text-muted">
                  No variants added yet
                </TableCell>
              </TableRow>
            ) : (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              variants.map((v: any) => (
                <TableRow key={v.documentId}>
                  <TableCell className="font-medium">{v.name}</TableCell>
                  <TableCell className="text-text-secondary">{v.description ?? "—"}</TableCell>
                  <TableCell>
                    {v.priceModifier
                      ? `+Rp ${Number(v.priceModifier).toLocaleString("id-ID")}`
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <ConfirmDialog
                      title="Delete Variant"
                      description={`Delete variant "${v.name}"? This cannot be undone.`}
                      onConfirm={async () => {
                        await deleteVariant(v.documentId, tourDocumentId);
                        router.refresh();
                      }}
                      trigger={
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-danger" />
                        </Button>
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
