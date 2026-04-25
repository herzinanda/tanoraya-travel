"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../_components/ui/card";
import { Button } from "../../../_components/ui/button";
import { FormField } from "../../../_components/shared/form-field";
import { ImageUpload } from "../../../_components/shared/image-upload";
import { updateArticle } from "../../../_actions/articles";
import { getStrapiMedia } from "@/component/main/home/StrapiImage";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function EditArticleForm({ article }: { article: any }) {
  const [state, formAction, isPending] = useActionState(updateArticle, null);

  const coverUrl = article.coverImage?.url
    ? getStrapiMedia(article.coverImage.url)
    : null;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/articles">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Article</h1>
          <p className="text-muted-foreground text-sm mt-1">{article.title}</p>
        </div>
      </div>

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="documentId" value={article.documentId} />

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
            <FormField label="Title" name="title" defaultValue={article.title} required />
            <FormField label="URL Slug" name="slug" defaultValue={article.slug} required />
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Category" name="category" defaultValue={article.category} />
              <FormField label="Author" name="author" defaultValue={article.author} />
            </div>
            <FormField label="Read Time" name="readTime" defaultValue={article.readTime} />
            <FormField label="Excerpt" name="excerpt" type="textarea" defaultValue={article.excerpt} rows={3} />
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
              defaultValue={article.content}
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
            <ImageUpload name="coverImage" currentImageUrl={coverUrl} />
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/articles">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
