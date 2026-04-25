"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BookingActions } from "./booking-actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../_components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../../_components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../_components/ui/table";
import { Badge } from "../../_components/ui/badge";
import { Pagination } from "../../_components/shared/pagination";
import { BookingFilters } from "./booking-filters";
import { TourPackageGroup } from "./tour-package-group";

const STATUS_BADGE: Record<string, "default" | "success" | "warning" | "destructive" | "secondary"> = {
  pending: "warning",
  confirmed: "default",
  paid: "success",
  done: "success",
  cancelled: "destructive",
  quote_requested: "secondary",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

interface BookingsTabsProps {
  tab: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bookings: any[];
  total: number;
  currentPage: number;
  totalPages: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  allBookingsForGrouping: any[];
  search: string;
  status: string;
  dateFilter: string;
  dateFrom: string;
  dateTo: string;
  sort: string;
  activeSearchParams: Record<string, string>;
}

interface TourPackageGroupData {
  title: string;
  slug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bookings: any[];
}

export function BookingsTabs({
  tab,
  bookings,
  total,
  currentPage,
  totalPages,
  allBookingsForGrouping,
  search,
  status,
  dateFilter,
  dateFrom,
  dateTo,
  sort,
  activeSearchParams,
}: BookingsTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const handleTabChange = (value: string) => {
    const newParams = new URLSearchParams(params.toString());
    if (value === "all") {
      newParams.delete("tab");
    } else {
      newParams.set("tab", value);
    }
    newParams.delete("page");
    const qs = newParams.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  // Group bookings by tour package
  const grouped = useMemo(() => {
    const map = new Map<string, TourPackageGroupData>();
    const noTour: TourPackageGroupData = { title: "No Tour Package", slug: "", bookings: [] };

    for (const booking of allBookingsForGrouping) {
      const tourPkg = booking.tour_departure?.tour_package;
      if (!tourPkg) {
        noTour.bookings.push(booking);
        continue;
      }
      const key = tourPkg.documentId ?? tourPkg.title;
      if (!map.has(key)) {
        map.set(key, { title: tourPkg.title, slug: tourPkg.slug ?? "", bookings: [] });
      }
      map.get(key)!.bookings.push(booking);
    }

    const groups = Array.from(map.values()).sort((a, b) => b.bookings.length - a.bookings.length);
    if (noTour.bookings.length > 0) groups.push(noTour);
    return groups;
  }, [allBookingsForGrouping]);

  return (
    <>
      <BookingFilters
        search={search}
        status={status}
        dateFilter={dateFilter}
        dateFrom={dateFrom}
        dateTo={dateTo}
        sort={sort}
      />

      <Tabs value={tab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="by-tour">By Tour Package</TabsTrigger>
        </TabsList>

        {/* All Bookings Tab */}
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">All Bookings ({total})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booker</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Tour Package</TableHead>
                    <TableHead>Departure</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-30">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No bookings found
                      </TableCell>
                    </TableRow>
                  ) : (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    bookings.map((booking: any) => {
                      const tourTitle = booking.tour_departure?.tour_package?.title ?? "—";
                      const bookerName = [booking.bookerTitle, booking.booker_first_name, booking.booker_last_name]
                        .filter(Boolean)
                        .join(" ");

                      return (
                        <TableRow
                          key={booking.documentId}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => router.push(`/admin/bookings/${booking.documentId}`)}
                        >
                          <TableCell className="font-medium">{bookerName || "—"}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            <div>{booking.booker_email ?? "—"}</div>
                            <div>{booking.booker_phone ?? ""}</div>
                          </TableCell>
                          <TableCell className="max-w-50 truncate">{tourTitle}</TableCell>
                          <TableCell className="text-sm">
                            {formatDate(booking.tour_departure?.departureDate)}
                          </TableCell>
                          <TableCell>
                            <Badge variant={STATUS_BADGE[booking.book_status] ?? "secondary"}>
                              {booking.book_status ?? "unknown"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {formatDate(booking.createdAt)}
                          </TableCell>
                          <TableCell>
                            <BookingActions
                              documentId={booking.documentId}
                              currentStatus={booking.book_status ?? "pending"}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/admin/bookings"
            searchParams={activeSearchParams}
          />
        </TabsContent>

        {/* By Tour Package Tab */}
        <TabsContent value="by-tour">
          {grouped.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No bookings found
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {grouped.map((group, i) => (
                <TourPackageGroup key={group.slug || `no-tour-${i}`} group={group} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
