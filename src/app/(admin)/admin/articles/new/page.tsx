"use client";

import { useActionState, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../_components/ui/card";
import { Button } from "../../../_components/ui/button";
import { FormField } from "../../../_components/shared/form-field";
import { ImageUpload } from "../../../_components/shared/image-upload";
import { MarkdownEditor } from "../../../_components/shared/markdown-editor";
import { createArticle, checkArticleSlug } from "../../../_actions/articles";
import { Label } from "../../../_components/ui/label";
import { Input } from "../../../_components/ui/input";

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function NewArticlePage() {
  const [state, formAction, isPending] = useActionState(createArticle, null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);
  const [slugDuplicate, setSlugDuplicate] = useState(false);
  const [checkingSlug, setCheckingSlug] = useState(false);

  useEffect(() => {
    if (!slugManual) {
      setSlug(toSlug(title));
      setSlugDuplicate(false);
    }
  }, [title, slugManual]);

  const handleSlugBlur = async () => {
    if (!slug) return;
    setCheckingSlug(true);
    const isDup = await checkArticleSlug(slug);
    setSlugDuplicate(isDup);
    setCheckingSlug(false);
  };

  const resetSlug = () => {
    setSlugManual(false);
    setSlug(toSlug(title));
    setSlugDuplicate(false);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/articles">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">New Article</h1>
          <p className="text-muted-foreground text-sm mt-1">Create a new blog post</p>
        </div>
      </div>

      <form action={formAction} className="space-y-6">
        {state?.error && (
          <div className="bg-destructive/10 text-destructive text-sm px-4 py-3 rounded-md border border-destructive/20">
            {state.error}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Article Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Title */}
            <div className="space-y-1.5">
              <Label htmlFor="title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Article title"
                required
              />
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="slug">
                  URL Slug <span className="text-destructive">*</span>
                </Label>
                {slugManual && (
                  <button
                    type="button"
                    onClick={resetSlug}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset from title
                  </button>
                )}
              </div>
              <Input
                id="slug"
                name="slug"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setSlugManual(true);
                  setSlugDuplicate(false);
                }}
                onBlur={handleSlugBlur}
                placeholder="article-url-slug"
                required
              />
              {checkingSlug && (
                <p className="text-xs text-muted-foreground">Checking availability…</p>
              )}
              {!checkingSlug && slugDuplicate && (
                <p className="text-xs text-destructive">
                  ⚠ An article with this slug already exists. Please choose a different slug.
                </p>
              )}
              {!checkingSlug && !slugDuplicate && slug && (
                <p className="text-xs text-muted-foreground">URL: /articles/{slug}</p>
              )}
            </div>

            {/* Category + Author */}
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Category" name="category" placeholder="e.g. Travel Tips" />
              <FormField label="Author" name="author" placeholder="Author name" />
            </div>

            {/* Read Time */}
            <FormField
              label="Read Time (minutes)"
              name="readTime"
              type="number"
              placeholder="5"
            />

            {/* Tags */}
            <div className="space-y-1.5">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                name="tags"
                placeholder="e.g. Travel, Asia, Budget Tips"
              />
              <p className="text-xs text-muted-foreground">Separate multiple tags with commas</p>
            </div>

            {/* Excerpt */}
            <FormField
              label="Excerpt"
              name="excerpt"
              type="textarea"
              placeholder="Short summary of the article…"
              rows={3}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Content</CardTitle>
          </CardHeader>
          <CardContent>
            <MarkdownEditor
              name="content"
              placeholder="Write your article content in Markdown…"
              rows={16}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Cover Image</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUpload name="coverImage" />
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button type="submit" disabled={isPending || slugDuplicate}>
            {isPending ? "Creating…" : "Create Article"}
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/articles">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
