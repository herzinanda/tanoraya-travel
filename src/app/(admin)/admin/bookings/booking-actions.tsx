"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Eye, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { Button } from "../../_components/ui/button";
import { ConfirmDialog } from "../../_components/shared/confirm-dialog";
import { updateBookingStatus, deleteBooking } from "../../_actions/bookings";

const STATUS_STEPS = ["pending", "confirmed", "paid", "done"] as const;

const NEXT_STEP_TITLE: Record<string, string> = {
  confirmed: "Confirm booking",
  paid: "Mark as paid",
  done: "Mark as done",
};

interface BookingActionsProps {
  documentId: string;
  currentStatus: string;
}

export function BookingActions({ documentId, currentStatus }: BookingActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleStatus = (newStatus: string) => {
    startTransition(async () => {
      await updateBookingStatus(documentId, newStatus);
      router.refresh();
    });
  };

  const handleDelete = async () => {
    await deleteBooking(documentId);
    router.refresh();
  };

  const isCancelled = currentStatus === "cancelled";
  const isDone = currentStatus === "done";
  const stepIndex = STATUS_STEPS.indexOf(currentStatus as typeof STATUS_STEPS[number]);
  const nextStep = !isCancelled && stepIndex >= 0 && stepIndex < STATUS_STEPS.length - 1
    ? STATUS_STEPS[stepIndex + 1]
    : null;

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        title="View detail"
        onClick={(e) => { e.stopPropagation(); router.push(`/admin/bookings/${documentId}`); }}
      >
        <Eye className="h-4 w-4" />
      </Button>
      {nextStep && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
          title={NEXT_STEP_TITLE[nextStep]}
          onClick={(e) => { e.stopPropagation(); handleStatus(nextStep); }}
          disabled={isPending}
        >
          <CheckCircle className="h-4 w-4" />
        </Button>
      )}
      {!isCancelled && !isDone && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
          title="Decline booking"
          onClick={(e) => { e.stopPropagation(); handleStatus("cancelled"); }}
          disabled={isPending}
        >
          <XCircle className="h-4 w-4" />
        </Button>
      )}
      <ConfirmDialog
        title="Delete Booking"
        description="Are you sure you want to delete this booking? This action cannot be undone."
        variant="destructive"
        onConfirm={handleDelete}
        trigger={
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-red-50"
            title="Delete booking"
            onClick={(e) => e.stopPropagation()}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        }
      />
    </div>
  );
}
