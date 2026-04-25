"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../_components/ui/card";
import { Button } from "../../../_components/ui/button";
import { FormField } from "../../../_components/shared/form-field";
import { ImageUpload } from "../../../_components/shared/image-upload";
import { createTourPackage, getAllDestinationsForSelect } from "../../../_actions/tour-packages";

export default function NewTourPackagePage() {
  const [state, formAction, isPending] = useActionState(createTourPackage, null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [destinations, setDestinations] = useState<any[]>([]);

  useEffect(() => {
    getAllDestinationsForSelect().then((res) => {
      if (res?.data) setDestinations(res.data as unknown[]);
    });
  }, []);

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/tour-packages">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">New Tour Package</h1>
          <p className="text-muted-foreground text-sm mt-1">Create a new tour package</p>
        </div>
      </div>

      <form action={formAction} className="space-y-6">
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
                <FormField label="Title" name="title" placeholder="e.g. Bali Adventure Tour" required />
              </div>
              <FormField label="Tour Code" name="tourCode" placeholder="e.g. BLI" hint="3-5 char code for booking ref" />
            </div>

            <FormField label="URL Slug" name="slug" placeholder="e.g. bali-adventure-tour" required hint="Used in the URL: /tour-packages/[slug]" />

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Base Price (Rp)" name="Price" type="number" placeholder="0" required />
              <FormField label="Price Per Person (Rp)" name="pricePerPerson" type="number" placeholder="0" hint="Display price, optional" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Discount Price (Rp)" name="discountPrice" type="number" placeholder="0" hint="Strikethrough price, optional" />
              <div />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Duration (Days)" name="duration" type="number" placeholder="1" required />
              <FormField label="Duration (Nights)" name="durationNights" type="number" placeholder="0" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Min Group Size" name="minGroupSize" type="number" placeholder="1" />
              <FormField label="Max Group Size" name="maxGroupSize" type="number" placeholder="50" />
            </div>

            <FormField label="Difficulty" name="difficulty" type="select">
              <option value="">— Select —</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="challenging">Challenging</option>
            </FormField>

            <FormField label="Destination" name="destination" type="select" hint="Link to a destination">
              <option value="">— No destination —</option>
              {destinations.map((d: { documentId: string; title: string }) => (
                <option key={d.documentId} value={d.documentId}>{d.title}</option>
              ))}
            </FormField>

            <div className="flex items-center gap-2">
              <input type="checkbox" name="isFeatured" id="isFeatured" className="h-4 w-4 rounded border-input accent-primary cursor-pointer" />
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
            <FormField label="Description" name="tour_description" type="textarea" placeholder="Tour description (supports HTML)..." rows={6} />
            <FormField label="Highlights" name="highlights" type="textarea" placeholder="One highlight per line..." rows={4} hint="Enter each highlight on a new line" />
            <FormField label="Inclusions" name="inclusions" type="textarea" placeholder="One inclusion per line..." rows={4} hint="What's included in the tour" />
            <FormField label="Exclusions" name="exclusions" type="textarea" placeholder="One exclusion per line..." rows={4} hint="What's not included" />
            <FormField label="Map Embed URL" name="mapEmbedSrc" placeholder="Google Maps embed URL" />
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
              <ImageUpload name="tourImageThumbnail" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Gallery Images</label>
              <ImageUpload name="galleryImages" multiple />
              <p className="text-xs text-muted-foreground mt-1">You can select multiple images</p>
            </div>
          </CardContent>
        </Card>

        {/* SEO */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">SEO</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <FormField label="Meta Title" name="metaTitle" placeholder="SEO title (defaults to tour title)" />
            <FormField label="Meta Description" name="metaDescription" type="textarea" placeholder="SEO description..." rows={3} />
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Tour Package"}
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/tour-packages">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
