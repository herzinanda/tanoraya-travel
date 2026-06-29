"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, GripVertical, Upload, FileDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../_components/ui/card";
import { Button } from "../../../_components/ui/button";
import { Input } from "../../../_components/ui/input";
import { Textarea } from "../../../_components/ui/textarea";
import { Label } from "../../../_components/ui/label";
import { updateTourComponents, uploadItineraryFile } from "../../../_actions/tour-packages";
import { getStrapiMedia } from "@/component/main/home/StrapiImage";

type StringItem = { value: string };
type BenefitItem = { id?: number; tour_benefit_item: string };
type FacilityItem = {
  id?: number;
  __component: string;
  type_of_facilities: string;
  tour_facilities_text: string;
};
type ItineraryItem = {
  id?: number;
  __component: string;
  title: string;
  itinerary_description: string;
};

function toStringItems(arr: unknown): StringItem[] {
  if (!Array.isArray(arr)) return [];
  return arr.map((v) => ({ value: typeof v === "string" ? v : String(v) }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ComponentsTab({ tour }: { tour: any }) {
  const router = useRouter();

  // Highlights
  const [highlights, setHighlights] = useState<StringItem[]>(toStringItems(tour.highlights));
  const [highlightSaving, setHighlightSaving] = useState(false);

  // Inclusions
  const [inclusions, setInclusions] = useState<StringItem[]>(toStringItems(tour.inclusions));
  const [inclusionSaving, setInclusionSaving] = useState(false);

  // Exclusions
  const [exclusions, setExclusions] = useState<StringItem[]>(toStringItems(tour.exclusions));
  const [exclusionSaving, setExclusionSaving] = useState(false);

  // Tour Benefits
  const [benefits, setBenefits] = useState<BenefitItem[]>(
    Array.isArray(tour.tour_benefit) ? tour.tour_benefit : []
  );
  const [benefitSaving, setBenefitSaving] = useState(false);

  // Tour Facilities
  const [facilities, setFacilities] = useState<FacilityItem[]>(
    Array.isArray(tour.tour_facilities) ? tour.tour_facilities : []
  );
  const [facilitySaving, setFacilitySaving] = useState(false);

  // Itinerary
  const [itinerary, setItinerary] = useState<ItineraryItem[]>(
    Array.isArray(tour.itinerary) ? tour.itinerary : []
  );
  const [itinerarySaving, setItinerarySaving] = useState(false);

  // Itinerary File
  const [fileUploading, setFileUploading] = useState(false);
  const [fileMsg, setFileMsg] = useState("");

  const existingFile = tour.itinerary_file;
  const existingFileUrl = existingFile?.url ? getStrapiMedia(existingFile.url) : null;

  // ── Highlights ──
  const saveHighlights = async () => {
    setHighlightSaving(true);
    const values = highlights.filter((h) => h.value.trim()).map((h) => h.value);
    await updateTourComponents(tour.documentId, { highlights: values });
    setHighlightSaving(false);
    router.refresh();
  };

  // ── Inclusions ──
  const saveInclusions = async () => {
    setInclusionSaving(true);
    const values = inclusions.filter((h) => h.value.trim()).map((h) => h.value);
    await updateTourComponents(tour.documentId, { inclusions: values });
    setInclusionSaving(false);
    router.refresh();
  };

  // ── Exclusions ──
  const saveExclusions = async () => {
    setExclusionSaving(true);
    const values = exclusions.filter((h) => h.value.trim()).map((h) => h.value);
    await updateTourComponents(tour.documentId, { exclusions: values });
    setExclusionSaving(false);
    router.refresh();
  };

  // ── Benefits ──
  const addBenefit = () => setBenefits([...benefits, { tour_benefit_item: "" }]);
  const removeBenefit = (idx: number) => setBenefits(benefits.filter((_, i) => i !== idx));
  const updateBenefit = (idx: number, value: string) => {
    const updated = [...benefits];
    updated[idx] = { ...updated[idx], tour_benefit_item: value };
    setBenefits(updated);
  };
  const saveBenefits = async () => {
    setBenefitSaving(true);
    const cleaned = benefits
      .filter((b) => b.tour_benefit_item.trim())
      .map((b) => ({ tour_benefit_item: b.tour_benefit_item }));
    await updateTourComponents(tour.documentId, { tour_benefit: cleaned });
    setBenefitSaving(false);
    router.refresh();
  };

  // ── Facilities ──
  const addFacility = () =>
    setFacilities([...facilities, { __component: "tour.tour-facilities-item", type_of_facilities: "", tour_facilities_text: "" }]);
  const removeFacility = (idx: number) => setFacilities(facilities.filter((_, i) => i !== idx));
  const updateFacility = (idx: number, field: string, value: string) => {
    const updated = [...facilities];
    updated[idx] = { ...updated[idx], [field]: value };
    setFacilities(updated);
  };
  const saveFacilities = async () => {
    setFacilitySaving(true);
    const cleaned = facilities
      .filter((f) => f.type_of_facilities.trim() || f.tour_facilities_text.trim())
      .map((f) => ({
        __component: "tour.tour-facilities-item",
        type_of_facilities: f.type_of_facilities,
        tour_facilities_text: f.tour_facilities_text,
      }));
    await updateTourComponents(tour.documentId, { tour_facilities: cleaned });
    setFacilitySaving(false);
    router.refresh();
  };

  // ── Itinerary ──
  const addItinerary = () =>
    setItinerary([...itinerary, { __component: "tour.tour-itinerary-item", title: "", itinerary_description: "" }]);
  const removeItinerary = (idx: number) => setItinerary(itinerary.filter((_, i) => i !== idx));
  const updateItinerary = (idx: number, field: string, value: string) => {
    const updated = [...itinerary];
    updated[idx] = { ...updated[idx], [field]: value };
    setItinerary(updated);
  };
  const moveItinerary = (idx: number, dir: -1 | 1) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= itinerary.length) return;
    const updated = [...itinerary];
    [updated[idx], updated[newIdx]] = [updated[newIdx], updated[idx]];
    setItinerary(updated);
  };
  const saveItinerary = async () => {
    setItinerarySaving(true);
    const cleaned = itinerary
      .filter((item) => item.title.trim())
      .map((item) => ({
        __component: "tour.tour-itinerary-item",
        title: item.title,
        itinerary_description: item.itinerary_description,
      }));
    await updateTourComponents(tour.documentId, { itinerary: cleaned });
    setItinerarySaving(false);
    router.refresh();
  };

  // ── Itinerary File Upload ──
  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFileUploading(true);
    setFileMsg("");
    const formData = new FormData(e.currentTarget);
    const result = await uploadItineraryFile(tour.documentId, formData);
    setFileUploading(false);
    if (result.error) {
      setFileMsg(result.error);
    } else {
      setFileMsg("File uploaded successfully!");
      router.refresh();
    }
  };

  function StringListSection({
    title,
    items,
    setItems,
    onSave,
    saving,
    placeholder,
  }: {
    title: string;
    items: StringItem[];
    setItems: (items: StringItem[]) => void;
    onSave: () => void;
    saving: boolean;
    placeholder: string;
  }) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">{title} ({items.length})</CardTitle>
          <Button type="button" size="sm" variant="outline" onClick={() => setItems([...items, { value: "" }])}>
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {items.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">No items added yet</p>
          )}
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                value={item.value}
                onChange={(e) => {
                  const updated = [...items];
                  updated[i] = { value: e.target.value };
                  setItems(updated);
                }}
                placeholder={placeholder}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setItems(items.filter((_, idx) => idx !== i))}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
          {items.length > 0 && (
            <Button onClick={onSave} disabled={saving} size="sm">
              {saving ? "Saving..." : `Save ${title}`}
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* ── Highlights ── */}
      <StringListSection
        title="Highlights"
        items={highlights}
        setItems={setHighlights}
        onSave={saveHighlights}
        saving={highlightSaving}
        placeholder="e.g. Stunning sunrise at Mount Bromo"
      />

      {/* ── Inclusions ── */}
      <StringListSection
        title="Inclusions"
        items={inclusions}
        setItems={setInclusions}
        onSave={saveInclusions}
        saving={inclusionSaving}
        placeholder="e.g. Hotel accommodation (3 nights)"
      />

      {/* ── Exclusions ── */}
      <StringListSection
        title="Exclusions"
        items={exclusions}
        setItems={setExclusions}
        onSave={saveExclusions}
        saving={exclusionSaving}
        placeholder="e.g. International flights"
      />

      {/* ── Tour Benefits ── */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Tour Benefits ({benefits.length})</CardTitle>
          <Button type="button" size="sm" variant="outline" onClick={addBenefit}>
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {benefits.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">No benefits added yet</p>
          )}
          {benefits.map((b, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                value={b.tour_benefit_item}
                onChange={(e) => updateBenefit(i, e.target.value)}
                placeholder="e.g. Free airport transfer"
              />
              <Button type="button" variant="ghost" size="icon" onClick={() => removeBenefit(i)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
          {benefits.length > 0 && (
            <Button onClick={saveBenefits} disabled={benefitSaving} size="sm">
              {benefitSaving ? "Saving..." : "Save Benefits"}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* ── Tour Facilities ── */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Tour Facilities ({facilities.length})</CardTitle>
          <Button type="button" size="sm" variant="outline" onClick={addFacility}>
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {facilities.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">No facilities added yet</p>
          )}
          {facilities.map((f, i) => (
            <div key={i} className="flex items-start gap-2 border rounded-md p-3">
              <div className="flex-1 space-y-2">
                <div>
                  <Label className="text-xs">Type</Label>
                  <Input
                    value={f.type_of_facilities}
                    onChange={(e) => updateFacility(i, "type_of_facilities", e.target.value)}
                    placeholder="e.g. Accommodation, Transport, Meals"
                  />
                </div>
                <div>
                  <Label className="text-xs">Value</Label>
                  <Input
                    value={f.tour_facilities_text}
                    onChange={(e) => updateFacility(i, "tour_facilities_text", e.target.value)}
                    placeholder="e.g. 4-Star Hotel, Private Bus"
                  />
                </div>
              </div>
              <Button type="button" variant="ghost" size="icon" onClick={() => removeFacility(i)} className="mt-5">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
          {facilities.length > 0 && (
            <Button onClick={saveFacilities} disabled={facilitySaving} size="sm">
              {facilitySaving ? "Saving..." : "Save Facilities"}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* ── Itinerary ── */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Itinerary ({itinerary.length})</CardTitle>
          <Button type="button" size="sm" variant="outline" onClick={addItinerary}>
            <Plus className="h-4 w-4 mr-1" /> Add Day
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {itinerary.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">No itinerary items added yet</p>
          )}
          {itinerary.map((item, i) => (
            <div key={i} className="border rounded-md p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">Day {i + 1}</span>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => moveItinerary(i, -1)}
                    disabled={i === 0}
                    className="h-7 w-7"
                  >
                    <GripVertical className="h-3 w-3 rotate-180" />
                    <span className="sr-only">Move up</span>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => moveItinerary(i, 1)}
                    disabled={i === itinerary.length - 1}
                    className="h-7 w-7"
                  >
                    <GripVertical className="h-3 w-3" />
                    <span className="sr-only">Move down</span>
                  </Button>
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeItinerary(i)} className="h-7 w-7">
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Title</Label>
                  <Input
                    value={item.title}
                    onChange={(e) => updateItinerary(i, "title", e.target.value)}
                    placeholder="e.g. Arrival & City Tour"
                  />
                </div>
                <div>
                  <Label className="text-xs">Description (HTML supported)</Label>
                  <Textarea
                    value={item.itinerary_description}
                    onChange={(e) => updateItinerary(i, "itinerary_description", e.target.value)}
                    placeholder="Day activities description..."
                    rows={4}
                  />
                </div>
              </div>
            </div>
          ))}
          {itinerary.length > 0 && (
            <Button onClick={saveItinerary} disabled={itinerarySaving} size="sm">
              {itinerarySaving ? "Saving..." : "Save Itinerary"}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* ── Itinerary File ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Itinerary File (PDF)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {existingFileUrl && (
            <div className="flex items-center gap-3 p-3 border rounded-md bg-muted/30">
              <FileDown className="h-5 w-5 text-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{existingFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {existingFile.ext} &middot; {Math.round((existingFile.size || 0)).toLocaleString()} KB
                </p>
              </div>
              <a
                href={existingFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline flex-shrink-0"
              >
                Download
              </a>
            </div>
          )}
          <form onSubmit={handleFileUpload} className="flex items-end gap-3">
            <div className="flex-1">
              <Label className="text-xs">{existingFileUrl ? "Replace file" : "Upload file"}</Label>
              <Input type="file" name="itinerary_file" accept=".pdf,.doc,.docx" />
            </div>
            <Button type="submit" size="sm" disabled={fileUploading}>
              <Upload className="h-4 w-4 mr-1" />
              {fileUploading ? "Uploading..." : "Upload"}
            </Button>
          </form>
          {fileMsg && (
            <p className={`text-xs ${fileMsg.includes("success") ? "text-green-600" : "text-destructive"}`}>
              {fileMsg}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Visitors can download this file from the tour detail page, below the itinerary section.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
