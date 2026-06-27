import Link from "next/link";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { Button } from "../../_components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../_components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../_components/ui/table";
import { Badge } from "../../_components/ui/badge";
import { Pagination } from "../../_components/shared/pagination";
import { ClickableRow, RowActions } from "../../_components/shared/clickable-row";
import { getAdminTourPackages } from "../../_actions/tour-packages";
import { DeleteTourButton } from "./delete-button";

export const metadata = { title: "Tour Packages" };

export default async function TourPackagesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search ?? "";

  const result = await getAdminTourPackages({ page, pageSize: 10, search });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tours = (result?.data as any[]) ?? [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const meta = result?.meta as any;
  const totalPages = meta?.pagination?.pageCount ?? 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tour Packages</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage tours, variants, and departures</p>
        </div>
        <Button asChild>
          <Link href="/admin/tour-packages/new">
            <Plus className="h-4 w-4" />
            Add Tour Package
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <form className="flex gap-3">
            <input
              name="search"
              defaultValue={search}
              placeholder="Search tour packages..."
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
            All Tour Packages ({meta?.pagination?.total ?? 0})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="w-30">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tours.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No tour packages found
                  </TableCell>
                </TableRow>
              ) : (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                tours.map((tour: any) => (
                  <ClickableRow key={tour.documentId} href={`/admin/tour-packages/${tour.documentId}`}>
                    <TableCell className="font-medium">{tour.title}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {tour.destination?.title ?? "—"}
                    </TableCell>
                    <TableCell>
                      {tour.Price
                        ? `Rp ${Number(tour.Price).toLocaleString("id-ID")}`
                        : "—"}
                    </TableCell>
                    <TableCell>{tour.duration ?? "—"}</TableCell>
                    <TableCell>
                      {tour.isFeatured ? (
                        <Badge variant="success">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      ) : (
                        <Badge variant="secondary">No</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <RowActions>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/tour-packages/${tour.documentId}`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <DeleteTourButton documentId={tour.documentId} title={tour.title} />
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
        basePath="/admin/tour-packages"
        searchParams={search ? { search } : {}}
      />
    </div>
  );
}
