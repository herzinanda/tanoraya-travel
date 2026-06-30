"use server";

import { revalidatePath } from "next/cache";
import { strapiGet, strapiPut, strapiDelete } from "../_lib/strapi-admin";

export async function getAdminBookings({
  page = 1,
  pageSize = 15,
  search,
  status,
  dateFilter,
  dateFrom,
  dateTo,
  sort = "createdAt:desc",
}: {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  dateFilter?: string;
  dateFrom?: string;
  dateTo?: string;
  sort?: string;
} = {}) {
  const dateFilters = buildDateFilters(dateFilter, dateFrom, dateTo);

  return strapiGet("/api/bookings", {
    populate: {
      tour_departure: {
        populate: {
          tour_package: { fields: ["title", "slug"] },
        },
        fields: ["departureDate", "returnDate"],
      },
    },
    fields: [
      "bookerTitle",
      "booker_first_name",
      "booker_last_name",
      "booker_phone",
      "booker_email",
      "book_status",
      "booker_notes",
      "fill_participant_later",
      "createdAt",
    ],
    filters: {
      ...(search?.trim() && {
        $or: [
          { booker_first_name: { $containsi: search.trim() } },
          { booker_last_name: { $containsi: search.trim() } },
          { booker_email: { $containsi: search.trim() } },
          { booker_phone: { $containsi: search.trim() } },
        ],
      }),
      ...(status && status !== "all" && { book_status: { $eq: status } }),
      ...dateFilters,
    },
    pagination: { page, pageSize },
    sort,
  });
}

export async function getAdminBooking(documentId: string) {
  return strapiGet(`/api/bookings/${documentId}`, {
    populate: {
      tour_departure: {
        populate: {
          tour_package: { fields: ["title", "slug"] },
        },
      },
    },
  });
}

export async function getAdminBookingsGrouped({
  search,
  status,
  dateFilter,
  dateFrom,
  dateTo,
}: {
  search?: string;
  status?: string;
  dateFilter?: string;
  dateFrom?: string;
  dateTo?: string;
} = {}) {
  const dateFilters = buildDateFilters(dateFilter, dateFrom, dateTo);

  return strapiGet("/api/bookings", {
    populate: {
      tour_departure: {
        populate: {
          tour_package: { fields: ["title", "slug"] },
        },
        fields: ["departureDate", "returnDate"],
      },
    },
    fields: [
      "bookerTitle",
      "booker_first_name",
      "booker_last_name",
      "booker_phone",
      "booker_email",
      "book_status",
      "createdAt",
    ],
    filters: {
      ...(search?.trim() && {
        $or: [
          { booker_first_name: { $containsi: search.trim() } },
          { booker_last_name: { $containsi: search.trim() } },
          { booker_email: { $containsi: search.trim() } },
          { booker_phone: { $containsi: search.trim() } },
        ],
      }),
      ...(status && status !== "all" && { book_status: { $eq: status } }),
      ...dateFilters,
    },
    pagination: { page: 1, pageSize: 200 },
    sort: "createdAt:desc",
  });
}

export async function updateBookingStatus(documentId: string, status: string) {
  const result = await strapiPut(`/api/bookings/${documentId}`, {
    book_status: status,
  });

  if (!result || result.error) {
    return { error: "Failed to update booking status." };
  }

  revalidatePath("/admin/bookings");
  return { success: true };
}

export async function deleteBooking(documentId: string) {
  const ok = await strapiDelete(`/api/bookings/${documentId}`);
  if (!ok) {
    return { error: "Failed to delete booking." };
  }
  revalidatePath("/admin/bookings");
  return { success: true };
}

function buildDateFilters(
  dateFilter?: string,
  dateFrom?: string,
  dateTo?: string
): Record<string, unknown> {
  if (dateFrom && dateTo) {
    return {
      createdAt: {
        $gte: new Date(dateFrom).toISOString(),
        $lte: new Date(dateTo + "T23:59:59.999Z").toISOString(),
      },
    };
  }

  if (!dateFilter || dateFilter === "all") return {};

  const now = new Date();
  let start: Date;
  let end: Date;

  switch (dateFilter) {
    case "today":
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
      break;
    case "this-week": {
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      start = new Date(now.getFullYear(), now.getMonth(), diff);
      end = new Date(start);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      break;
    }
    case "this-month":
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
      break;
    case "this-year":
      start = new Date(now.getFullYear(), 0, 1);
      end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
      break;
    default:
      return {};
  }

  return {
    createdAt: {
      $gte: start.toISOString(),
      $lte: end.toISOString(),
    },
  };
}
