"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronRight, Package } from "lucide-react";
import { Card, CardContent, CardHeader } from "../../_components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../_components/ui/table";
import { Badge } from "../../_components/ui/badge";
import { BookingActions } from "./booking-actions";

const STATUS_BADGE: Record<string, "default" | "success" | "warning" | "destructive" | "secondary"> = {
  pending: "warning",
  confirmed: "default",
  paid: "success",
  done: "success",
  cancelled: "destructive",
  quote_requested: "secondary",
};

function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

interface TourPackageGroupProps {
  group: {
    title: string;
    slug: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bookings: any[];
  };
}

export function TourPackageGroup({ group }: TourPackageGroupProps) {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const statusCount: Record<string, number> = {};
  for (const b of group.bookings) {
    const s = (b.book_status as string) ?? "unknown";
    statusCount[s] = (statusCount[s] || 0) + 1;
  }

  return (
    <Card>
      <CardHeader
        className="cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {open ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
            <Package className="h-4 w-4 text-primary" />
            <span className="font-semibold text-sm">{group.title}</span>
            <Badge variant="secondary" className="ml-1">
              {group.bookings.length} booking{group.bookings.length !== 1 ? "s" : ""}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            {Object.entries(statusCount).map(([s, count]: [string, number]) => (
              <Badge key={s} variant={STATUS_BADGE[s] ?? "secondary"} className="text-xs">
                {s}: {String(count)}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>

      {open && (
        <CardContent className="p-0 pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booker</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Departure</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Booked On</TableHead>
                <TableHead className="w-30">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {group.bookings.map((booking: any) => {
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
              })}
            </TableBody>
          </Table>
        </CardContent>
      )}
    </Card>
  );
}
