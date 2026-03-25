"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../_components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../../../_components/ui/card";
import { Button } from "../../../_components/ui/button";
import { FormField } from "../../../_components/shared/form-field";
import { ImageUpload } from "../../../_components/shared/image-upload";
import { updateTourPackage } from "../../../_actions/tour-packages";
import { getStrapiMedia } from "@/component/main/home/StrapiImage";
import { DeparturesTab } from "./departures-tab";
import { VariantsTab } from "./variants-tab";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function EditTourTabs({ tour, departures, variants }: { tour: any; departures: any[]; variants: any[] }) {
  const [state, formAction, isPending] = useActionState(updateTourPackage, null);

  const thumbnailUrl = tour.tourImageThumbnail?.url
    ? getStrapiMedia(tour.tourImageThumbnail.url)
    : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/tour-packages">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Edit Tour Package</h1>
          <p className="text-text-secondary text-sm mt-1">{tour.title}</p>
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
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

            {state?.error && (
              <div className="bg-danger-light text-danger text-sm px-4 py-3 rounded-md border border-danger/20">
                {state.error}
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <FormField label="Title" name="title" defaultValue={tour.title} required />
                <FormField label="URL Slug" name="slug" defaultValue={tour.slug} required />

                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Price (Rp)" name="Price" type="number" defaultValue={tour.Price} required />
                  <FormField label="Total Days" name="totalDays" type="number" defaultValue={tour.totalDays} required />
                </div>

                <FormField label="Destination Document ID" name="destination" defaultValue={tour.destination?.documentId ?? ""} hint="Strapi destination documentId" />

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    id="isFeatured"
                    defaultChecked={tour.isFeatured}
                    className="h-4 w-4 rounded border-border text-primary cursor-pointer"
                  />
                  <label htmlFor="isFeatured" className="text-sm font-medium text-text-primary cursor-pointer">
                    Featured Tour
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <FormField label="Description" name="description" type="textarea" defaultValue={tour.description} rows={6} />
                <FormField label="Highlights" name="highlights" type="textarea" defaultValue={tour.highlights} rows={4} />
                <FormField label="Inclusions" name="inclusions" type="textarea" defaultValue={tour.inclusions} rows={4} />
                <FormField label="Exclusions" name="exclusions" type="textarea" defaultValue={tour.exclusions} rows={4} />
                <FormField label="Map Embed URL" name="mapEmbedSrc" defaultValue={tour.mapEmbedSrc} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Thumbnail Image</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload name="tourImageThumbnail" currentImageUrl={thumbnailUrl} />
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
