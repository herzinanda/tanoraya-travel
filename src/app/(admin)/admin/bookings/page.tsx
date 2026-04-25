import { getAdminBookings, getAdminBookingsGrouped } from "../../_actions/bookings";
import { BookingsTabs } from "./bookings-tabs";

export const metadata = { title: "Bookings" };

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    dateFilter?: string;
    dateFrom?: string;
    dateTo?: string;
    sort?: string;
    tab?: string;
  }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search ?? "";
  const status = params.status ?? "all";
  const dateFilter = params.dateFilter ?? "all";
  const dateFrom = params.dateFrom ?? "";
  const dateTo = params.dateTo ?? "";
  const sort = params.sort ?? "createdAt:desc";
  const tab = params.tab ?? "all";

  const filterParams = { search, status, dateFilter, dateFrom, dateTo };

  const [listResult, groupedResult] = await Promise.all([
    getAdminBookings({ page, pageSize: 15, ...filterParams, sort }),
    getAdminBookingsGrouped(filterParams),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookings = (listResult?.data as any[]) ?? [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const meta = listResult?.meta as any;
  const totalPages = meta?.pagination?.pageCount ?? 1;
  const total = meta?.pagination?.total ?? 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allBookingsForGrouping = (groupedResult?.data as any[]) ?? [];

  const activeSearchParams: Record<string, string> = {};
  if (search) activeSearchParams.search = search;
  if (status !== "all") activeSearchParams.status = status;
  if (dateFilter !== "all") activeSearchParams.dateFilter = dateFilter;
  if (dateFrom) activeSearchParams.dateFrom = dateFrom;
  if (dateTo) activeSearchParams.dateTo = dateTo;
  if (sort !== "createdAt:desc") activeSearchParams.sort = sort;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage tour bookings and reservations
        </p>
      </div>

      <BookingsTabs
        tab={tab}
        bookings={bookings}
        total={total}
        currentPage={page}
        totalPages={totalPages}
        allBookingsForGrouping={allBookingsForGrouping}
        search={search}
        status={status}
        dateFilter={dateFilter}
        dateFrom={dateFrom}
        dateTo={dateTo}
        sort={sort}
        activeSearchParams={activeSearchParams}
      />
    </div>
  );
}
