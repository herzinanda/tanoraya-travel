"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../_components/ui/card";
import { Button } from "../../../_components/ui/button";
import { FormField } from "../../../_components/shared/form-field";
import { ImageUpload } from "../../../_components/shared/image-upload";
import { createTourPackage } from "../../../_actions/tour-packages";

export default function NewTourPackagePage() {
  const [state, formAction, isPending] = useActionState(createTourPackage, null);

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/tour-packages">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">New Tour Package</h1>
          <p className="text-text-secondary text-sm mt-1">Create a new tour package</p>
        </div>
      </div>

      <form action={formAction} className="space-y-6">
        {state?.error && (
          <div className="bg-danger-light text-danger text-sm px-4 py-3 rounded-md border border-danger/20">
            {state.error}
          </div>
        )}

        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <FormField label="Title" name="title" placeholder="e.g. Bali Adventure Tour" required />
            <FormField label="URL Slug" name="slug" placeholder="e.g. bali-adventure-tour" required hint="Used in the URL: /tour-packages/[slug]" />

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Price (Rp)" name="Price" type="number" placeholder="0" required />
              <FormField label="Total Days" name="totalDays" type="number" placeholder="1" required />
            </div>

            <FormField label="Destination Document ID" name="destination" placeholder="Strapi destination documentId" hint="Leave blank if not linked" />

            <div className="flex items-center gap-2">
              <input type="checkbox" name="isFeatured" id="isFeatured" className="h-4 w-4 rounded border-border text-primary cursor-pointer" />
              <label htmlFor="isFeatured" className="text-sm font-medium text-text-primary cursor-pointer">
                Featured Tour
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <FormField label="Description" name="description" type="textarea" placeholder="Tour description..." rows={6} />
            <FormField label="Highlights" name="highlights" type="textarea" placeholder="One highlight per line..." rows={4} hint="Enter each highlight on a new line" />
            <FormField label="Inclusions" name="inclusions" type="textarea" placeholder="One inclusion per line..." rows={4} hint="What's included in the tour" />
            <FormField label="Exclusions" name="exclusions" type="textarea" placeholder="One exclusion per line..." rows={4} hint="What's not included" />
            <FormField label="Map Embed URL" name="mapEmbedSrc" placeholder="Google Maps embed URL" />
          </CardContent>
        </Card>

        {/* Image */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Thumbnail Image</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUpload name="tourImageThumbnail" />
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
