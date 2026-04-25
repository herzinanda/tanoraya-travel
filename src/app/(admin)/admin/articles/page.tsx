import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { Button } from "../../_components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../_components/ui/card";
import { Badge } from "../../_components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../_components/ui/table";
import { Pagination } from "../../_components/shared/pagination";
import { getAdminArticles } from "../../_actions/articles";
import { DeleteArticleButton } from "./delete-button";

export const metadata = { title: "Articles" };

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search ?? "";

  const result = await getAdminArticles({ page, pageSize: 10, search });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const articles = (result?.data as any[]) ?? [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const meta = result?.meta as any;
  const totalPages = meta?.pagination?.pageCount ?? 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Articles</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your blog posts</p>
        </div>
        <Button asChild>
          <Link href="/admin/articles/new">
            <Plus className="h-4 w-4" />
            Add Article
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <form className="flex gap-3">
            <input
              name="search"
              defaultValue={search}
              placeholder="Search articles..."
              className="flex-1 h-9 px-3 text-sm border border-input rounded-md bg-transparent outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
            <Button type="submit" variant="secondary" size="sm">
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            All Articles ({meta?.pagination?.total ?? 0})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Published</TableHead>
                <TableHead className="w-30">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No articles found
                  </TableCell>
                </TableRow>
              ) : (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                articles.map((article: any) => (
                  <TableRow key={article.documentId}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>
                      {article.category ? (
                        <Badge variant="secondary">{article.category}</Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{article.author ?? "—"}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {article.publishedAt
                        ? new Date(article.publishedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "Draft"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/articles/${article.documentId}`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <DeleteArticleButton documentId={article.documentId} title={article.title} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/admin/articles"
        searchParams={search ? { search } : {}}
      />
    </div>
  );
}
