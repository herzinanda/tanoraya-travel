"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Pencil, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../_components/ui/card";
import { Button } from "../../../_components/ui/button";
import { Badge } from "../../../_components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../../../_components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "../../../_components/ui/dialog";
import { FormField } from "../../../_components/shared/form-field";
import { ConfirmDialog } from "../../../_components/shared/confirm-dialog";
import { createDeparture, updateDeparture, deleteDeparture } from "../../../_actions/departures";
import { parsePriceTierCSV } from "@/utils/price-tiers";
import type { PriceTier } from "@/types/tour-detail";

// ─── Tier Editor ─────────────────────────────────────────────────────────────

function TierEditor({ tiers, onChange }: { tiers: PriceTier[]; onChange: (t: PriceTier[]) => void }) {
  const csvRef = useRef<HTMLInputElement>(null);

  const addRow = () =>
    onChange([...tiers, { minPax: 1, maxPax: null, pricePerPerson: 0 }]);

  const remove = (i: number) => onChange(tiers.filter((_, idx) => idx !== i));

  const update = (i: number, key: keyof PriceTier, val: string) => {
    const next = [...tiers];
    if (key === "maxPax") next[i] = { ...next[i], maxPax: val === "" ? null : Number(val) };
    else next[i] = { ...next[i], [key]: Number(val) };
    onChange(next);
  };

  const handleCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const parsed = parsePriceTierCSV(ev.target?.result as string);
      if (parsed.length > 0) onChange(parsed);
    };
    reader.readAsText(file);
    if (csvRef.current) csvRef.current.value = "";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Group Pricing Tiers</span>
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" onClick={addRow}>
            <Plus className="h-3 w-3 mr-1" /> Add Row
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => csvRef.current?.click()}>
            <Upload className="h-3 w-3 mr-1" /> CSV
          </Button>
          <input ref={csvRef} type="file" accept=".csv" className="hidden" onChange={handleCSV} />
        </div>
      </div>

      {tiers.length === 0 ? (
        <p className="text-xs text-muted-foreground py-2 leading-relaxed">
          No tiers — a single fixed price from <strong>Price Override</strong> above is used.<br />
          CSV format (header required): <code>min_pax,max_pax,price_per_person</code><br />
          Leave max_pax blank for unlimited.
        </p>
      ) : (
        <div className="rounded-md border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium">Min Pax</th>
                <th className="px-3 py-2 text-left text-xs font-medium">Max Pax</th>
                <th className="px-3 py-2 text-left text-xs font-medium">Price / Person (Rp)</th>
                <th className="px-3 py-2 w-8" />
              </tr>
            </thead>
            <tbody>
              {tiers.map((row, i) => (
                <tr key={i} className="border-t">
                  <td className="px-3 py-1">
                    <input type="number" min={1} value={row.minPax}
                      onChange={(e) => update(i, "minPax", e.target.value)}
                      className="w-16 rounded border border-input bg-background px-2 py-1 text-sm" />
                  </td>
                  <td className="px-3 py-1">
                    <input type="number" min={1} placeholder="∞" value={row.maxPax ?? ""}
                      onChange={(e) => update(i, "maxPax", e.target.value)}
                      className="w-16 rounded border border-input bg-background px-2 py-1 text-sm" />
                  </td>
                  <td className="px-3 py-1">
                    <input type="number" min={0} value={row.pricePerPerson}
                      onChange={(e) => update(i, "pricePerPerson", e.target.value)}
                      className="w-36 rounded border border-input bg-background px-2 py-1 text-sm" />
                  </td>
                  <td className="px-3 py-1">
                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(i)}>
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Departure Form (shared by Add + Edit) ────────────────────────────────────

function DepartureForm({
  defaultValues,
  variants,
  tiers,
  onTiersChange,
  loading,
  error,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValues?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variants: any[];
  tiers: PriceTier[];
  onTiersChange: (t: PriceTier[]) => void;
  loading: boolean;
  error: string | null;
}) {
  const toInputDate = (s?: string | null) => (s ? s.split("T")[0] : "");

  return (
    <div className="space-y-4">
      {error && <div className="bg-destructive/10 text-destructive text-sm px-3 py-2 rounded-md">{error}</div>}
      <FormField label="Departure Date" name="departureDate" type="date" required
        defaultValue={toInputDate(defaultValues?.departureDate)} />
      <FormField label="Return Date" name="returnDate" type="date"
        defaultValue={toInputDate(defaultValues?.returnDate)} />
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Available Seats" name="availableSeats" type="number" placeholder="0" required
          defaultValue={defaultValues?.availableSeats != null ? String(defaultValues.availableSeats) : ""} />
        <FormField label="Price Override (Rp)" name="priceOverride" type="number" placeholder="Optional"
          defaultValue={defaultValues?.priceOverride ? String(defaultValues.priceOverride) : ""} />
      </div>
      <FormField label="Status" name="status" type="select"
        defaultValue={defaultValues?.statusValue ?? defaultValues?.status ?? "available"}>
        <option value="available">Available</option>
        <option value="limited">Limited Seats</option>
        <option value="sold_out">Sold Out</option>
      </FormField>
      {variants.length > 0 && (
        <FormField label="Variant" name="variant" type="select"
          defaultValue={defaultValues?.variant?.documentId ?? ""}>
          <option value="">No variant</option>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {variants.map((v: any) => (
            <option key={v.documentId} value={v.documentId}>{v.name}</option>
          ))}
        </FormField>
      )}
      <TierEditor tiers={tiers} onChange={onTiersChange} />
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Saving..." : defaultValues ? "Save Changes" : "Add Departure"}
      </Button>
    </div>
  );
}

// ─── Add Dialog ───────────────────────────────────────────────────────────────

function AddDepartureDialog({
  tourDocumentId, variants, onDone,
}: {
  tourDocumentId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variants: any[];
  onDone: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tiers, setTiers] = useState<PriceTier[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    fd.set("priceTiers", JSON.stringify(tiers));
    const result = await createDeparture(tourDocumentId, fd);
    setLoading(false);
    if (result.error) { setError(result.error); return; }
    setTiers([]);
    setOpen(false);
    onDone();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm"><Plus className="h-4 w-4" /> Add Departure</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Add Departure</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit}>
          <DepartureForm variants={variants} tiers={tiers} onTiersChange={setTiers} loading={loading} error={error} />
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Edit Dialog ──────────────────────────────────────────────────────────────

function EditDepartureDialog({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dep, tourDocumentId, variants, onDone,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dep: any;
  tourDocumentId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variants: any[];
  onDone: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tiers, setTiers] = useState<PriceTier[]>(
    Array.isArray(dep.priceTiers) ? dep.priceTiers : []
  );

  const handleOpen = (v: boolean) => {
    setOpen(v);
    if (v) setTiers(Array.isArray(dep.priceTiers) ? dep.priceTiers : []);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    fd.set("priceTiers", JSON.stringify(tiers));
    const result = await updateDeparture(dep.documentId, tourDocumentId, fd);
    setLoading(false);
    if (result.error) { setError(result.error); return; }
    setOpen(false);
    onDone();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Edit Departure</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit}>
          <DepartureForm defaultValues={dep} variants={variants} tiers={tiers} onTiersChange={setTiers} loading={loading} error={error} />
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Tab ─────────────────────────────────────────────────────────────────

const fmtIDR = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

export function DeparturesTab({
  tourDocumentId, departures, variants,
}: {
  tourDocumentId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  departures: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variants: any[];
}) {
  const router = useRouter();

  const statusVariant = (s: string) => {
    if (s === "available") return "success" as const;
    if (s === "limited") return "warning" as const;
    if (s === "sold_out") return "destructive" as const;
    return "secondary" as const;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Departures ({departures.length})</CardTitle>
        <AddDepartureDialog
          tourDocumentId={tourDocumentId}
          variants={variants}
          onDone={() => router.refresh()}
        />
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Departure</TableHead>
              <TableHead>Return</TableHead>
              <TableHead>Seats</TableHead>
              <TableHead>Price Override</TableHead>
              <TableHead>Tiers</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Variant</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departures.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No departures yet
                </TableCell>
              </TableRow>
            ) : (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              departures.map((dep: any) => (
                <TableRow key={dep.documentId}>
                  <TableCell>
                    {dep.departureDate
                      ? new Date(dep.departureDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                      : "—"}
                  </TableCell>
                  <TableCell>
                    {dep.returnDate
                      ? new Date(dep.returnDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                      : "—"}
                  </TableCell>
                  <TableCell>{dep.availableSeats ?? "—"}</TableCell>
                  <TableCell>
                    {dep.priceOverride ? fmtIDR(Number(dep.priceOverride)) : "—"}
                  </TableCell>
                  <TableCell>
                    {Array.isArray(dep.priceTiers) && dep.priceTiers.length > 0 ? (
                      <Badge variant="secondary">{dep.priceTiers.length} tier{dep.priceTiers.length > 1 ? "s" : ""}</Badge>
                    ) : (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(dep.statusValue ?? dep.status)}>
                      {dep.statusValue ?? dep.status ?? "—"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{dep.variant?.name ?? "—"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <EditDepartureDialog
                        dep={dep}
                        tourDocumentId={tourDocumentId}
                        variants={variants}
                        onDone={() => router.refresh()}
                      />
                      <ConfirmDialog
                        title="Delete Departure"
                        description="Are you sure? This cannot be undone."
                        onConfirm={async () => {
                          await deleteDeparture(dep.documentId, tourDocumentId);
                          router.refresh();
                        }}
                        trigger={
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        }
                      />
                    </div>
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
