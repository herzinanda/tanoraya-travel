"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../_components/ui/card";
import { Button } from "../../../_components/ui/button";
import { FormField } from "../../../_components/shared/form-field";
import { ImageUpload } from "../../../_components/shared/image-upload";
import { createArticle } from "../../../_actions/articles";

export default function NewArticlePage() {
  const [state, formAction, isPending] = useActionState(createArticle, null);

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/articles">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">New Article</h1>
          <p className="text-text-secondary text-sm mt-1">Create a new blog post</p>
        </div>
      </div>

      <form action={formAction} className="space-y-6">
        {state?.error && (
          <div className="bg-danger-light text-danger text-sm px-4 py-3 rounded-md border border-danger/20">
            {state.error}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Article Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <FormField label="Title" name="title" placeholder="Article title" required />
            <FormField label="URL Slug" name="slug" placeholder="article-url-slug" required hint="Used in the URL: /articles/[slug]" />
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Category" name="category" placeholder="e.g. Travel Tips" />
              <FormField label="Author" name="author" placeholder="Author name" />
            </div>
            <FormField label="Read Time" name="readTime" placeholder="e.g. 5 min read" />
            <FormField label="Excerpt" name="excerpt" type="textarea" placeholder="Short summary..." rows={3} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Content</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              label="Content (Markdown)"
              name="content"
              type="textarea"
              placeholder="Write your article content in Markdown..."
              rows={16}
              hint="Supports Markdown formatting"
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
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Article"}
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/articles">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
