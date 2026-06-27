import Link from "next/link";
import { Plus, Pencil, Trash2, LayoutGrid } from "lucide-react";
import { Button } from "../../_components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../_components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../_components/ui/table";
import { Pagination } from "../../_components/shared/pagination";
import { ClickableRow, RowActions } from "../../_components/shared/clickable-row";
import { getAdminDestinations } from "../../_actions/destinations";
import { getStrapiMedia } from "@/component/main/home/StrapiImage";
import { DeleteDestinationButton } from "./delete-button";

export const metadata = { title: "Destinations" };

export default async function DestinationsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search ?? "";

  const result = await getAdminDestinations({ page, pageSize: 10, search });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const destinations = (result?.data as any[]) ?? [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const meta = result?.meta as any;
  const totalPages = meta?.pagination?.pageCount ?? 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Destinations</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your travel destinations</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/homepage-destinations">
              <LayoutGrid className="h-4 w-4" />
              Homepage Picks
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/destinations/new">
              <Plus className="h-4 w-4" />
              Add Destination
            </Link>
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <form className="flex gap-3">
            <input
              name="search"
              defaultValue={search}
              placeholder="Search destinations..."
              className="flex-1 h-9 px-3 text-sm border border-input rounded-md bg-transparent outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
            <Button type="submit" variant="secondary" size="sm">
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            All Destinations ({meta?.pagination?.total ?? 0})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {destinations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No destinations found
                  </TableCell>
                </TableRow>
              ) : (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                destinations.map((dest: any) => (
                  <ClickableRow key={dest.documentId} href={`/admin/destinations/${dest.documentId}`}>
                    <TableCell>
                      {dest.destinationImages?.url ? (
                        <img
                          src={getStrapiMedia(dest.destinationImages.url) ?? ""}
                          alt={dest.title}
                          className="h-10 w-14 rounded object-cover"
                        />
                      ) : (
                        <div className="h-10 w-14 rounded bg-muted" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{dest.title}</TableCell>
                    <TableCell className="text-muted-foreground">{dest.destinationUrl}</TableCell>
                    <TableCell>
                      <RowActions>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/destinations/${dest.documentId}`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <DeleteDestinationButton documentId={dest.documentId} title={dest.title} />
                      </RowActions>
                    </TableCell>
                  </ClickableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/admin/destinations"
        searchParams={search ? { search } : {}}
      />
    </div>
  );
}
