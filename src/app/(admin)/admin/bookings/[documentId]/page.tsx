import { getAdminBooking } from "../../../_actions/bookings";
import { BookingDetail } from "./booking-detail";
import Link from "next/link";

export const metadata = { title: "Booking Detail" };

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) {
  const { documentId } = await params;
  const result = await getAdminBooking(documentId);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const booking = result?.data as any;

  if (!booking) {
    return (
      <div className="space-y-4">
        <Link
          href="/admin/bookings"
          className="text-sm text-muted-foreground hover:text-foreground no-underline"
        >
          &larr; Back to Bookings
        </Link>
        <div className="py-12 text-center">
          <h2 className="text-xl font-semibold">Booking not found</h2>
          <p className="text-muted-foreground mt-2">
            This booking may have been deleted.
          </p>
        </div>
      </div>
    );
  }

  return <BookingDetail booking={booking} documentId={documentId} />;
}
