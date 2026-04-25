import { SectionCards } from "@/components/section-cards"
import { strapiCount, strapiGet } from "../_lib/strapi-admin"
import Link from "next/link"
import { getStrapiMedia } from "@/component/main/home/StrapiImage"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { PackageIcon } from "lucide-react"
import { BookingChart } from "@/components/booking-chart"

export const metadata = { title: "Dashboard" }

export default async function DashboardPage() {
  const [destinations, tours, articles, promo, bookingsTotal, bookingsData] = await Promise.all([
    strapiCount("/api/destinations"),
    strapiCount("/api/tour-packages"),
    strapiCount("/api/blog-posts"),
    strapiGet("/api/promo-popup", {
      fields: ["isActive", "title", "expiresAt"],
    }),
    strapiCount("/api/bookings"),
    // Fetch bookings from last 6 months for the chart
    strapiGet("/api/bookings", {
      fields: ["book_status", "createdAt"],
      pagination: { pageSize: 500 },
      sort: "createdAt:desc",
    }),
  ])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const promoData = promo?.data as any
  const promoActive = promoData?.isActive ?? false
  const promoExpired = promoData?.expiresAt ? new Date(promoData.expiresAt) < new Date() : false

  // Build monthly booking stats for chart
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawBookings = ((bookingsData?.data as any[]) ?? [])
  const monthlyStats = buildMonthlyStats(rawBookings)
  const statusCounts = {
    pending: rawBookings.filter((b) => b.book_status === "pending").length,
    confirmed: rawBookings.filter((b) => b.book_status === "confirmed").length,
    paid: rawBookings.filter((b) => b.book_status === "paid").length,
    done: rawBookings.filter((b) => b.book_status === "done").length,
    cancelled: rawBookings.filter((b) => b.book_status === "cancelled").length,
  }

  // Recent tours (with departure prices)
  const recentTours = await strapiGet("/api/tour-packages", {
    populate: {
      tourImageThumbnail: { fields: ["url"] },
      tour_departures: { fields: ["departureDate", "priceOverride", "statusValue"] },
    },
    fields: ["title", "slug", "isFeatured"],
    sort: "createdAt:desc",
    pagination: { pageSize: 5 },
  })

  // Recent articles
  const recentArticles = await strapiGet("/api/blog-posts", {
    fields: ["title", "category", "publishedAt"],
    sort: "publishedAt:desc",
    pagination: { pageSize: 5 },
  })

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards
            destinations={destinations}
            tours={tours}
            articles={articles}
            promoActive={promoActive}
            promoExpired={promoExpired}
            bookingsTotal={bookingsTotal}
            bookingStatusCounts={statusCounts}
          />

          {/* Booking Chart */}
          <div className="px-4 lg:px-6">
            <BookingChart data={monthlyStats} />
          </div>

          {/* Recent Content */}
          <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 lg:px-6">
            {/* Recent Tours */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">Recent Tour Packages</CardTitle>
                <Link
                  href="/admin/tour-packages"
                  className="text-sm text-primary hover:underline no-underline"
                >
                  View all
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {((recentTours?.data as any[]) ?? []).map((tour: any) => (
                    <Link
                      key={tour.documentId}
                      href={`/admin/tour-packages/${tour.documentId}`}
                      className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-muted no-underline"
                    >
                      {tour.tourImageThumbnail?.url ? (
                        <img
                          src={getStrapiMedia(tour.tourImageThumbnail.url) ?? ""}
                          alt=""
                          className="h-10 w-10 rounded-md object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                          <PackageIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{tour.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {(() => {
                            const today = new Date(new Date().toDateString())
                            const departures = Array.isArray(tour.tour_departures) ? tour.tour_departures : []
                            const prices = departures
                              .filter((d: any) => new Date(d.departureDate) >= today && d.statusValue !== 'sold_out')
                              .map((d: any) => d.priceOverride)
                              .filter((p: unknown): p is number => typeof p === 'number' && p > 0)
                            return prices.length > 0
                              ? `Start from Rp ${Math.min(...prices).toLocaleString("id-ID")}`
                              : "Belum ada jadwal tersedia"
                          })()}
                        </p>
                      </div>
                    </Link>
                  ))}
                  {((recentTours?.data as unknown[]) ?? []).length === 0 && (
                    <p className="py-4 text-center text-sm text-muted-foreground">
                      No tour packages yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Articles */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">Recent Articles</CardTitle>
                <Link
                  href="/admin/articles"
                  className="text-sm text-primary hover:underline no-underline"
                >
                  View all
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {((recentArticles?.data as any[]) ?? []).map((article: any) => (
                    <Link
                      key={article.documentId}
                      href={`/admin/articles/${article.documentId}`}
                      className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-muted no-underline"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{article.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {article.category ?? "Uncategorized"}
                        </p>
                      </div>
                      <span className="ml-2 shrink-0 text-xs text-muted-foreground">
                        {article.publishedAt
                          ? new Date(article.publishedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })
                          : "Draft"}
                      </span>
                    </Link>
                  ))}
                  {((recentArticles?.data as unknown[]) ?? []).length === 0 && (
                    <p className="py-4 text-center text-sm text-muted-foreground">
                      No articles yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildMonthlyStats(bookings: any[]) {
  const months: { month: string; pending: number; confirmed: number; paid: number; done: number; cancelled: number }[] = []
  const now = new Date()

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    months.push({
      month: d.toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
      pending: 0,
      confirmed: 0,
      paid: 0,
      done: 0,
      cancelled: 0,
    })
  }

  for (const b of bookings) {
    const created = new Date(b.createdAt)
    const label = created.toLocaleDateString("en-US", { month: "short", year: "2-digit" })
    const entry = months.find((m) => m.month === label)
    if (!entry) continue
    const status = b.book_status as string
    if (status === "pending") entry.pending++
    else if (status === "confirmed") entry.confirmed++
    else if (status === "paid") entry.paid++
    else if (status === "done") entry.done++
    else if (status === "cancelled") entry.cancelled++
  }

  return months
}
