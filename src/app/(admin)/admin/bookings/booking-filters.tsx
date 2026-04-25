"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import { Search } from "lucide-react";
import { Button } from "../../_components/ui/button";
import { Card, CardContent } from "../../_components/ui/card";

interface BookingFiltersProps {
  search: string;
  status: string;
  dateFilter: string;
  dateFrom: string;
  dateTo: string;
  sort: string;
}

const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "paid", label: "Paid" },
  { value: "done", label: "Done" },
  { value: "cancelled", label: "Cancelled" },
  { value: "quote_requested", label: "Quote Requested" },
];

const DATE_OPTIONS = [
  { value: "all", label: "All Time" },
  { value: "today", label: "Today" },
  { value: "this-week", label: "This Week" },
  { value: "this-month", label: "This Month" },
  { value: "this-year", label: "This Year" },
  { value: "custom", label: "Custom Range" },
];

const SORT_OPTIONS = [
  { value: "createdAt:desc", label: "Newest First" },
  { value: "createdAt:asc", label: "Oldest First" },
  { value: "booker_first_name:asc", label: "Name A–Z" },
  { value: "booker_first_name:desc", label: "Name Z–A" },
];

const selectClass =
  "h-9 px-3 text-sm border border-input rounded-md bg-transparent outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer";

export function BookingFilters({
  search,
  status,
  dateFilter,
  dateFrom,
  dateTo,
  sort,
}: BookingFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();

  const pushParams = useCallback(
    (overrides: Record<string, string>) => {
      const params = new URLSearchParams();
      const merged = { search, status, dateFilter, dateFrom, dateTo, sort, ...overrides };

      if (merged.search) params.set("search", merged.search);
      if (merged.status && merged.status !== "all") params.set("status", merged.status);
      if (merged.dateFilter && merged.dateFilter !== "all") params.set("dateFilter", merged.dateFilter);
      if (merged.dateFilter === "custom") {
        if (merged.dateFrom) params.set("dateFrom", merged.dateFrom);
        if (merged.dateTo) params.set("dateTo", merged.dateTo);
      }
      if (merged.sort && merged.sort !== "createdAt:desc") params.set("sort", merged.sort);

      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname);
    },
    [router, pathname, search, status, dateFilter, dateFrom, dateTo, sort]
  );

  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        {/* Search row */}
        <form
          className="flex gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            pushParams({ search: (fd.get("search") as string) ?? "" });
          }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              name="search"
              defaultValue={search}
              placeholder="Search by name, email, or phone..."
              className="w-full h-9 pl-9 pr-3 text-sm border border-input rounded-md bg-transparent outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <Button type="submit" variant="secondary" size="sm">
            Search
          </Button>
        </form>

        {/* Filter row */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={status}
            onChange={(e) => pushParams({ status: e.target.value })}
            className={selectClass}
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          <select
            value={dateFilter}
            onChange={(e) => pushParams({ dateFilter: e.target.value })}
            className={selectClass}
          >
            {DATE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          {dateFilter === "custom" && (
            <>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => pushParams({ dateFrom: e.target.value })}
                className={selectClass}
              />
              <span className="text-sm text-muted-foreground">to</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => pushParams({ dateTo: e.target.value })}
                className={selectClass}
              />
            </>
          )}

          <select
            value={sort}
            onChange={(e) => pushParams({ sort: e.target.value })}
            className={selectClass}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </CardContent>
    </Card>
  );
}
