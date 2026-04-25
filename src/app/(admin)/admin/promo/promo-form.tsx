"use client";

import { useActionState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../_components/ui/card";
import { Button } from "../../_components/ui/button";
import { FormField } from "../../_components/shared/form-field";
import { ImageUpload } from "../../_components/shared/image-upload";
import { Switch } from "../../_components/ui/switch";
import { updatePromo } from "../../_actions/promo";
import { getStrapiMedia } from "@/component/main/home/StrapiImage";
import { useState } from "react";
import { Badge } from "../../_components/ui/badge";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PromoForm({ promo }: { promo: any }) {
  const [state, formAction, isPending] = useActionState(updatePromo, null);
  const [isActive, setIsActive] = useState(promo?.isActive ?? false);

  const imageUrl = promo?.image?.url ? getStrapiMedia(promo.image.url) : null;
  const isExpired = promo?.expiresAt ? new Date(promo.expiresAt) < new Date() : false;

  const statusBadge = isExpired
    ? <Badge variant="destructive">Expired</Badge>
    : isActive
      ? <Badge variant="success">Active</Badge>
      : <Badge variant="secondary">Inactive</Badge>;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight">Promo Popup</h1>
          {statusBadge}
        </div>
        <p className="text-muted-foreground text-sm mt-1">
          {isExpired
            ? `Promo expired on ${new Date(promo.expiresAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}`
            : "Configure the promotional popup displayed on the main site"}
        </p>
      </div>

      {state?.success && (
        <div className="bg-emerald-500/10 text-emerald-600 text-sm px-4 py-3 rounded-md border border-emerald-600/20">
          Promo popup updated successfully.
        </div>
      )}

      <form action={formAction} className="space-y-6">
        {state?.error && (
          <div className="bg-destructive/10 text-destructive text-sm px-4 py-3 rounded-md border border-destructive/20">
            {state.error}
          </div>
        )}

        {/* Status Toggle */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Status</CardTitle>
            <CardDescription>Enable or disable the promo popup</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Switch
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <input type="hidden" name="isActive" value={isActive ? "on" : ""} />
              <span className="text-sm">
                {isActive ? "Popup is visible to visitors" : "Popup is hidden"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <FormField label="Title" name="title" defaultValue={promo?.title} placeholder="Promo title" />
            <FormField label="Subtitle" name="subtitle" defaultValue={promo?.subtitle} placeholder="Subtitle text" />
            <FormField label="Badge Text" name="badge" defaultValue={promo?.badge} placeholder="e.g. Limited Offer" />
            <FormField label="Description" name="description" type="textarea" defaultValue={promo?.description} placeholder="Promo description..." rows={4} />
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Call to Action</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Button Label" name="ctaLabel" defaultValue={promo?.ctaLabel} placeholder="e.g. Book Now" />
              <FormField label="Button URL" name="ctaUrl" defaultValue={promo?.ctaUrl} placeholder="/tour-packages/..." />
            </div>
            <FormField label="Expires At" name="expiresAt" type="datetime-local" defaultValue={promo?.expiresAt ? promo.expiresAt.slice(0, 16) : ""} hint="Leave empty for no expiration" />
          </CardContent>
        </Card>

        {/* Image */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Promo Image</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUpload name="image" currentImageUrl={imageUrl} />
          </CardContent>
        </Card>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Promo Settings"}
        </Button>
      </form>
    </div>
  );
}
