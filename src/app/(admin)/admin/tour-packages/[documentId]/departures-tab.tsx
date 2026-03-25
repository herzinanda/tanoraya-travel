"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../_components/ui/card";
import { Button } from "../../../_components/ui/button";
import { Badge } from "../../../_components/ui/badge";
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
import { createDeparture, deleteDeparture } from "../../../_actions/departures";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DeparturesTab({ tourDocumentId, departures, variants }: { tourDocumentId: string; departures: any[]; variants: any[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    const result = await createDeparture(tourDocumentId, formData);
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    setOpen(false);
    router.refresh();
  };

  const statusVariant = (status: string) => {
    switch (status) {
      case "open": return "success" as const;
      case "full": return "warning" as const;
      case "closed": return "destructive" as const;
      default: return "secondary" as const;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Departures ({departures.length})</CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              Add Departure
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Departure</DialogTitle>
            </DialogHeader>
            <form action={handleCreate} className="space-y-4">
              {error && (
                <div className="bg-danger-light text-danger text-sm px-3 py-2 rounded-md">{error}</div>
              )}
              <FormField label="Departure Date" name="departureDate" type="date" required />
              <FormField label="Return Date" name="returnDate" type="date" />
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Available Seats" name="availableSeats" type="number" placeholder="0" required />
                <FormField label="Price Override (Rp)" name="priceOverride" type="number" placeholder="Optional" />
              </div>
              <FormField label="Status" name="status" type="select">
                <option value="open">Open</option>
                <option value="full">Full</option>
                <option value="closed">Closed</option>
              </FormField>
              {variants.length > 0 && (
                <FormField label="Variant" name="variant" type="select">
                  <option value="">No variant</option>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {variants.map((v: any) => (
                    <option key={v.documentId} value={v.documentId}>{v.name}</option>
                  ))}
                </FormField>
              )}
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Adding..." : "Add Departure"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Departure</TableHead>
              <TableHead>Return</TableHead>
              <TableHead>Seats</TableHead>
              <TableHead>Price Override</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Variant</TableHead>
              <TableHead className="w-[60px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departures.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-text-muted">
                  No departures added yet
                </TableCell>
              </TableRow>
            ) : (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              departures.map((dep: any) => (
                <TableRow key={dep.documentId}>
                  <TableCell>{dep.departureDate ? new Date(dep.departureDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "—"}</TableCell>
                  <TableCell>{dep.returnDate ? new Date(dep.returnDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "—"}</TableCell>
                  <TableCell>{dep.availableSeats ?? "—"}</TableCell>
                  <TableCell>{dep.priceOverride ? `Rp ${Number(dep.priceOverride).toLocaleString("id-ID")}` : "—"}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(dep.status)}>{dep.status ?? "—"}</Badge>
                  </TableCell>
                  <TableCell className="text-text-secondary">{dep.variant?.name ?? "—"}</TableCell>
                  <TableCell>
                    <ConfirmDialog
                      title="Delete Departure"
                      description="Are you sure? This cannot be undone."
                      onConfirm={async () => {
                        await deleteDeparture(dep.documentId, tourDocumentId);
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
