"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../_components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../../../_components/ui/card";
import { Button } from "../../../_components/ui/button";
import { FormField } from "../../../_components/shared/form-field";
import { ImageUpload } from "../../../_components/shared/image-upload";
import { updateTourPackage, getAllDestinationsForSelect } from "../../../_actions/tour-packages";
import { getStrapiMedia } from "@/component/main/home/StrapiImage";
import { DeparturesTab } from "./departures-tab";
import { VariantsTab } from "./variants-tab";
import { ComponentsTab } from "./components-tab";

function jsonToLines(val: unknown): string {
  if (Array.isArray(val)) return val.join("\n");
  if (typeof val === "string") return val;
  return "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function EditTourTabs({ tour, departures, variants }: { tour: any; departures: any[]; variants: any[] }) {
  const [state, formAction, isPending] = useActionState(updateTourPackage, null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [destinations, setDestinations] = useState<any[]>([]);

  useEffect(() => {
    getAllDestinationsForSelect().then((res) => {
      if (res?.data) setDestinations(res.data as unknown[]);
    });
  }, []);

  const thumbnailUrl = tour.tourImageThumbnail?.url
    ? getStrapiMedia(tour.tourImageThumbnail.url)
    : null;

  // Existing gallery images
  const galleryImages = Array.isArray(tour.galleryImages)
    ? tour.galleryImages
    : Array.isArray(tour.tourGalleries)
      ? tour.tourGalleries
      : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/tour-packages">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Tour Package</h1>
          <p className="text-muted-foreground text-sm mt-1">{tour.title}</p>
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="components">
            Content
          </TabsTrigger>
          <TabsTrigger value="departures">
            Departures ({departures.length})
          </TabsTrigger>
          <TabsTrigger value="variants">
            Variants ({variants.length})
          </TabsTrigger>
        </TabsList>

        {/* Details Tab */}
        <TabsContent value="details">
          <form action={formAction} className="space-y-6 max-w-3xl">
            <input type="hidden" name="documentId" value={tour.documentId} />
            <input
              type="hidden"
              name="existingGalleryIds"
              value={galleryImages.map((img: { id: number }) => img.id).join(",")}
            />

            {state?.error && (
              <div className="bg-destructive/10 text-destructive text-sm px-4 py-3 rounded-md border border-destructive/20">
                {state.error}
              </div>
            )}

            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <FormField label="Title" name="title" defaultValue={tour.title} required />
                  </div>
                  <FormField label="Tour Code" name="tourCode" defaultValue={tour.tourCode ?? ""} hint="3-5 char code for booking ref" />
                </div>

                <FormField label="URL Slug" name="slug" defaultValue={tour.slug} required hint="Used in the URL: /tour-packages/[slug]" />

                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Base Price (Rp)" name="Price" type="number" defaultValue={tour.Price} required />
                  <FormField label="Price Per Person (Rp)" name="pricePerPerson" type="number" defaultValue={tour.pricePerPerson ?? ""} hint="Display price, optional" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Discount Price (Rp)" name="discountPrice" type="number" defaultValue={tour.discountPrice ?? ""} hint="Strikethrough price, optional" />
                  <div />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Duration (Days)" name="duration" type="number" defaultValue={tour.duration} required />
                  <FormField label="Duration (Nights)" name="durationNights" type="number" defaultValue={tour.durationNights ?? ""} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Min Group Size" name="minGroupSize" type="number" defaultValue={tour.minGroupSize ?? ""} />
                  <FormField label="Max Group Size" name="maxGroupSize" type="number" defaultValue={tour.maxGroupSize ?? ""} />
                </div>

                <FormField label="Difficulty" name="difficulty" type="select" defaultValue={tour.difficulty ?? ""}>
                  <option value="">— Select —</option>
                  <option value="easy">Easy</option>
                  <option value="moderate">Moderate</option>
                  <option value="challenging">Challenging</option>
                </FormField>

                <FormField label="Destination" name="destination" type="select" defaultValue={tour.destination?.documentId ?? ""} hint="Link to a destination">
                  <option value="">— No destination —</option>
                  {destinations.map((d: { documentId: string; title: string }) => (
                    <option key={d.documentId} value={d.documentId}>{d.title}</option>
                  ))}
                </FormField>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    id="isFeatured"
                    defaultChecked={tour.isFeatured}
                    className="h-4 w-4 rounded border-input accent-primary cursor-pointer"
                  />
                  <label htmlFor="isFeatured" className="text-sm font-medium cursor-pointer">Featured Tour</label>
                </div>
              </CardContent>
            </Card>

            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <FormField label="Description" name="tour_description" type="textarea" defaultValue={tour.tour_description} rows={6} />
                <FormField label="Highlights" name="highlights" type="textarea" defaultValue={jsonToLines(tour.highlights)} rows={4} hint="One per line" />
                <FormField label="Inclusions" name="inclusions" type="textarea" defaultValue={jsonToLines(tour.inclusions)} rows={4} hint="One per line" />
                <FormField label="Exclusions" name="exclusions" type="textarea" defaultValue={jsonToLines(tour.exclusions)} rows={4} hint="One per line" />
                <FormField label="Map Embed URL" name="mapEmbedSrc" defaultValue={tour.mapEmbedSrc} />
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Thumbnail Image</label>
                  <ImageUpload name="tourImageThumbnail" currentImageUrl={thumbnailUrl} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Gallery Images</label>
                  {galleryImages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {galleryImages.map((img: { id: number; url: string; alternativeText?: string }) => (
                        <div key={img.id} className="relative">
                          <img
                            src={getStrapiMedia(img.url) ?? ""}
                            alt={img.alternativeText || "Gallery"}
                            className="h-20 w-20 rounded-md border object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <ImageUpload name="galleryImages" multiple />
                  <p className="text-xs text-muted-foreground mt-1">Upload additional gallery images</p>
                </div>
              </CardContent>
            </Card>

            {/* SEO */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">SEO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <FormField label="Meta Title" name="metaTitle" defaultValue={tour.metaTitle ?? ""} placeholder="SEO title (defaults to tour title)" />
                <FormField label="Meta Description" name="metaDescription" type="textarea" defaultValue={tour.metaDescription ?? ""} placeholder="SEO description..." rows={3} />
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin/tour-packages">Cancel</Link>
              </Button>
            </div>
          </form>
        </TabsContent>

        {/* Components Tab */}
        <TabsContent value="components">
          <ComponentsTab tour={tour} />
        </TabsContent>

        {/* Departures Tab */}
        <TabsContent value="departures">
          <DeparturesTab
            tourDocumentId={tour.documentId}
            departures={departures}
            variants={variants}
          />
        </TabsContent>

        {/* Variants Tab */}
        <TabsContent value="variants">
          <VariantsTab
            tourDocumentId={tour.documentId}
            variants={variants}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
