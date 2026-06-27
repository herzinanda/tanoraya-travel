"use client";

import { useActionState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../_components/ui/card";
import { Button } from "../../../_components/ui/button";
import { FormField } from "../../../_components/shared/form-field";
import { ImageUpload } from "../../../_components/shared/image-upload";
import { updateDestination } from "../../../_actions/destinations";
import { getStrapiMedia } from "@/component/main/home/StrapiImage";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function EditDestinationForm({ destination }: { destination: any }) {
  const [state, formAction, isPending] = useActionState(updateDestination, null);

  const currentImageUrl = destination.destinationImages?.url
    ? getStrapiMedia(destination.destinationImages.url)
    : null;
  const currentImageId = destination.destinationImages?.id ?? null;

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/destinations">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Destination</h1>
          <p className="text-muted-foreground text-sm mt-1">{destination.title}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Destination Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-5">
            <input type="hidden" name="documentId" value={destination.documentId} />

            {state?.error && (
              <div className="bg-destructive/10 text-destructive text-sm px-4 py-3 rounded-md border border-destructive/20">
                {state.error}
              </div>
            )}

            <FormField
              label="Title"
              name="title"
              defaultValue={destination.title}
              required
            />

            <FormField
              label="URL Slug"
              name="destinationUrl"
              defaultValue={destination.destinationUrl}
              required
              hint="Used in the URL: /destination/[slug]"
            />

            <ImageUpload
              name="destinationImages"
              label="Destination Image"
              currentImageUrl={currentImageUrl}
              currentImageId={currentImageId}
            />

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin/destinations">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
