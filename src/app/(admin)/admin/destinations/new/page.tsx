"use client";

import { useActionState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../_components/ui/card";
import { Button } from "../../../_components/ui/button";
import { FormField } from "../../../_components/shared/form-field";
import { ImageUpload } from "../../../_components/shared/image-upload";
import { createDestination } from "../../../_actions/destinations";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewDestinationPage() {
  const [state, formAction, isPending] = useActionState(createDestination, null);

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/destinations">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">New Destination</h1>
          <p className="text-muted-foreground text-sm mt-1">Create a new travel destination</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Destination Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-5">
            {state?.error && (
              <div className="bg-destructive/10 text-destructive text-sm px-4 py-3 rounded-md border border-destructive/20">
                {state.error}
              </div>
            )}

            <FormField
              label="Title"
              name="title"
              placeholder="e.g. Bali"
              required
            />

            <FormField
              label="URL Slug"
              name="destinationUrl"
              placeholder="e.g. bali"
              required
              hint="Used in the URL: /destination/[slug]"
            />

            <ImageUpload
              name="destinationImages"
              label="Destination Image"
            />

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Destination"}
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
