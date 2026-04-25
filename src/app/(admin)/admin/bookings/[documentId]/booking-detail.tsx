"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, CalendarDays, Users, FileText, Trash2, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../_components/ui/card";
import { Badge } from "../../../_components/ui/badge";
import { Button } from "../../../_components/ui/button";
import { ConfirmDialog } from "../../../_components/shared/confirm-dialog";
import { updateBookingStatus, deleteBooking } from "../../../_actions/bookings";

const STATUS_STEPS = ["pending", "confirmed", "paid", "done"] as const;

const STATUS_LABEL: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  paid: "Paid",
  done: "Done",
  cancelled: "Cancelled",
  quote_requested: "Quote Requested",
};

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
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateTime(dateStr: string | null | undefined) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BookingDetail({ booking, documentId }: { booking: any; documentId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState(booking.book_status ?? "pending");

  const bookerName = [booking.bookerTitle, booking.booker_first_name, booking.booker_last_name]
    .filter(Boolean)
    .join(" ");
  const tourPkg = booking.tour_departure?.tour_package;
  const departure = booking.tour_departure;

  const handleStatusChange = (newStatus: string) => {
    startTransition(async () => {
      const result = await updateBookingStatus(documentId, newStatus);
      if (result.success) {
        setStatus(newStatus);
      }
    });
  };

  const handleDelete = async () => {
    const result = await deleteBooking(documentId);
    if (result.success) {
      router.push("/admin/bookings");
    }
  };

  const isCancelled = status === "cancelled";
  const currentStepIndex = STATUS_STEPS.indexOf(status as typeof STATUS_STEPS[number]);
  const nextStep = !isCancelled && currentStepIndex >= 0 && currentStepIndex < STATUS_STEPS.length - 1
    ? STATUS_STEPS[currentStepIndex + 1]
    : null;

  const NEXT_LABEL: Record<string, string> = {
    confirmed: "Confirm Booking",
    paid: "Mark as Paid",
    done: "Mark as Done",
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/bookings"
            className="text-sm text-muted-foreground hover:text-foreground no-underline inline-flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to Bookings
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">Booking Detail</h1>
            <Badge variant={STATUS_BADGE[status] ?? "secondary"} className="text-sm">
              {STATUS_LABEL[status] ?? status}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm mt-1">
            Booked on {formatDateTime(booking.createdAt)}
          </p>
        </div>
        <ConfirmDialog
          title="Delete Booking"
          description="Are you sure you want to delete this booking? This action cannot be undone."
          variant="destructive"
          onConfirm={handleDelete}
          trigger={
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          }
        />
      </div>

      {/* Status Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Booking Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Step Indicator */}
          <div className="flex items-center gap-0">
            {STATUS_STEPS.map((step, i) => {
              const stepIndex = STATUS_STEPS.indexOf(step);
              const isCompleted = !isCancelled && currentStepIndex > stepIndex;
              const isCurrent = !isCancelled && status === step;
              const isUpcoming = !isCancelled && currentStepIndex < stepIndex;

              return (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-xs font-bold transition-colors ${
                        isCompleted
                          ? "bg-green-500 border-green-500 text-white"
                          : isCurrent
                            ? "bg-primary border-primary text-white"
                            : isCancelled
                              ? "bg-muted border-muted-foreground/30 text-muted-foreground"
                              : "border-muted-foreground/30 text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? <Check className="h-4 w-4" /> : i + 1}
                    </div>
                    <span
                      className={`text-xs mt-1.5 ${
                        isCurrent ? "font-semibold text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {STATUS_LABEL[step]}
                    </span>
                  </div>
                  {i < STATUS_STEPS.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 -mt-5 ${
                        isCompleted ? "bg-green-500" : "bg-muted-foreground/20"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {isCancelled && (
            <div className="rounded-md bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
              This booking has been declined/cancelled.
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-1">
            {nextStep && (
              <Button
                size="sm"
                onClick={() => handleStatusChange(nextStep)}
                disabled={isPending}
                className="bg-green-600 hover:bg-green-700"
              >
                {NEXT_LABEL[nextStep]}
              </Button>
            )}
            {!isCancelled && status !== "done" && (
              <ConfirmDialog
                title="Decline Booking"
                description="Are you sure you want to decline this booking? The customer will need to rebook."
                variant="destructive"
                onConfirm={() => handleStatusChange("cancelled")}
                trigger={
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isPending}
                    className="border-red-500 text-red-600 hover:bg-red-50"
                  >
                    Decline
                  </Button>
                }
              />
            )}
            {isCancelled && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStatusChange("pending")}
                disabled={isPending}
              >
                Reopen as Pending
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Booker Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Booker Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Users className="h-4 w-4 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{bookerName || "—"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{booking.booker_email || "—"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{booking.booker_phone || "—"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tour & Departure Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tour & Departure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <FileText className="h-4 w-4 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Tour Package</p>
                {tourPkg ? (
                  <Link
                    href={`/admin/tour-packages/${tourPkg.documentId ?? ""}`}
                    className="font-medium text-primary hover:underline no-underline"
                  >
                    {tourPkg.title}
                  </Link>
                ) : (
                  <p className="font-medium">—</p>
                )}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CalendarDays className="h-4 w-4 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Departure Date</p>
                <p className="font-medium">{formatDate(departure?.departureDate)}</p>
              </div>
            </div>
            {departure?.returnDate && (
              <div className="flex items-start gap-3">
                <CalendarDays className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Return Date</p>
                  <p className="font-medium">{formatDate(departure.returnDate)}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      {booking.booker_notes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{booking.booker_notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
