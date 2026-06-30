"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Globe, FileEdit, RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../_components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../../../_components/ui/card";
import { Button } from "../../../_components/ui/button";
import { Badge } from "../../../_components/ui/badge";
import { FormField } from "../../../_components/shared/form-field";
import { ImageUpload } from "../../../_components/shared/image-upload";
import { updateTourPackage, getAllDestinationsForSelect, publishTourPackage, unpublishTourPackage } from "../../../_actions/tour-packages";
import { getStrapiMedia } from "@/component/main/home/StrapiImage";
import { DeparturesTab } from "./departures-tab";
import { VariantsTab } from "./variants-tab";
import { ComponentsTab } from "./components-tab";
import { useRouter } from "next/navigation";

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function EditTourTabs({ tour, departures, variants }: { tour: any; departures: any[]; variants: any[] }) {
  const [state, formAction, isPending] = useActionState(updateTourPackage, null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [destinations, setDestinations] = useState<any[]>([]);
  const [title, setTitle] = useState(tour.title ?? "");
  const [slug, setSlug] = useState(tour.slug ?? "");
  const [isPublished, setIsPublished] = useState(!!tour.publishedAt);
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState("");
  const router = useRouter();

  useEffect(() => {
    getAllDestinationsForSelect().then((res) => {
      if (res?.data) setDestinations(res.data as unknown[]);
    });
  }, []);

  const thumbnailUrl = tour.tourImageThumbnail?.url
    ? getStrapiMedia(tour.tourImageThumbnail.url)
    : null;

  const galleryImages = Array.isArray(tour.galleryImages)
    ? tour.galleryImages
    : Array.isArray(tour.tourGalleries)
      ? tour.tourGalleries
      : [];

  const handlePublishToggle = async () => {
    setPublishing(true);
    setPublishError("");
    const result = isPublished
      ? await unpublishTourPackage(tour.documentId)
      : await publishTourPackage(tour.documentId);
    if (result?.error) {
      setPublishError(result.error);
    } else {
      setIsPublished(!isPublished);
      router.refresh();
    }
    setPublishing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
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
        <div className="flex items-center gap-3">
          {isPublished ? (
            <Badge variant="success" className="text-sm px-3 py-1">
              <Globe className="h-3.5 w-3.5 mr-1.5" /> Published
            </Badge>
          ) : (
            <Badge variant="secondary" className="text-sm px-3 py-1">
              <FileEdit className="h-3.5 w-3.5 mr-1.5" /> Draft
            </Badge>
          )}
          <Button
            variant={isPublished ? "outline" : "default"}
            size="sm"
            onClick={handlePublishToggle}
            disabled={publishing}
          >
            {publishing ? "..." : isPublished ? "Unpublish" : "Publish"}
          </Button>
        </div>
      </div>

      {publishError && (
        <div className="bg-destructive/10 text-destructive text-sm px-4 py-3 rounded-md border border-destructive/20">
          {publishError}
        </div>
      )}

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
                    <label className="block text-sm font-medium mb-1.5">
                      Title <span className="text-destructive">*</span>
                    </label>
                    <input
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full h-9 px-3 text-sm border border-input rounded-md bg-transparent outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>
                  <FormField label="Tour Code" name="tourCode" defaultValue={tour.tourCode ?? ""} hint="3-5 char code for booking ref" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    URL Slug <span className="text-destructive">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      name="slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      required
                      className="flex-1 h-9 px-3 text-sm border border-input rounded-md bg-transparent outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                    <button
                      type="button"
                      onClick={() => setSlug(toSlug(title))}
                      className="h-9 px-3 text-xs border border-input rounded-md hover:bg-muted flex items-center gap-1 text-muted-foreground"
                    >
                      <RefreshCw className="h-3 w-3" /> From title
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Used in the URL: /tour-packages/[slug]</p>
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
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Challenging">Challenging</option>
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

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <FormField label="Tour Description" name="tour_description" type="textarea" defaultValue={tour.tour_description} rows={6} />
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
