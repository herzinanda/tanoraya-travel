import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPinIcon, PackageIcon, NewspaperIcon, MegaphoneIcon, CalendarCheckIcon } from "lucide-react"
import Link from "next/link"

interface SectionCardsProps {
  destinations: number
  tours: number
  articles: number
  promoActive: boolean
  promoExpired: boolean
  bookingsTotal: number
  bookingStatusCounts: { pending: number; confirmed: number; paid: number; done: number; cancelled: number }
}

export function SectionCards({
  destinations,
  tours,
  articles,
  promoActive,
  promoExpired,
  bookingsTotal,
  bookingStatusCounts,
}: SectionCardsProps) {
  const promoLabel = promoExpired ? "Expired" : promoActive ? "Active" : "Inactive"
  const promoBadgeVariant = promoExpired ? "destructive" : promoActive ? "default" : "secondary"
  const promoFooter = promoExpired
    ? "Promo has expired — update the expiration date"
    : promoActive
      ? "Popup is showing to visitors"
      : "Popup is currently hidden"

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-5">
      <Link href="/admin/destinations" className="no-underline">
        <Card className="@container/card hover:shadow-md transition-shadow">
          <CardHeader>
            <CardDescription>Destinations</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {destinations}
            </CardTitle>
            <CardAction>
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <MapPinIcon className="size-5" />
              </div>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              Total travel destinations
            </div>
          </CardFooter>
        </Card>
      </Link>
      <Link href="/admin/tour-packages" className="no-underline">
        <Card className="@container/card hover:shadow-md transition-shadow">
          <CardHeader>
            <CardDescription>Tour Packages</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {tours}
            </CardTitle>
            <CardAction>
              <div className="rounded-lg bg-blue-500/10 p-2 text-blue-500">
                <PackageIcon className="size-5" />
              </div>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              Active tour packages
            </div>
          </CardFooter>
        </Card>
      </Link>
      <Link href="/admin/articles" className="no-underline">
        <Card className="@container/card hover:shadow-md transition-shadow">
          <CardHeader>
            <CardDescription>Articles</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {articles}
            </CardTitle>
            <CardAction>
              <div className="rounded-lg bg-green-500/10 p-2 text-green-500">
                <NewspaperIcon className="size-5" />
              </div>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              Published blog posts
            </div>
          </CardFooter>
        </Card>
      </Link>
      <Link href="/admin/bookings" className="no-underline">
        <Card className="@container/card hover:shadow-md transition-shadow">
          <CardHeader>
            <CardDescription>Bookings</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {bookingsTotal}
            </CardTitle>
            <CardAction>
              <div className="rounded-lg bg-amber-500/10 p-2 text-amber-500">
                <CalendarCheckIcon className="size-5" />
              </div>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="flex gap-3 text-muted-foreground">
              <span className="text-amber-500">{bookingStatusCounts.pending} pending</span>
              <span className="text-blue-500">{bookingStatusCounts.confirmed} confirmed</span>
              <span className="text-green-500">{bookingStatusCounts.paid + bookingStatusCounts.done} paid/done</span>
            </div>
          </CardFooter>
        </Card>
      </Link>
      <Link href="/admin/promo" className="no-underline">
        <Card className="@container/card hover:shadow-md transition-shadow">
          <CardHeader>
            <CardDescription>Promo Popup</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {promoLabel}
            </CardTitle>
            <CardAction>
              <Badge variant={promoBadgeVariant}>
                <MegaphoneIcon className="size-3" />
                {promoExpired ? "EXPIRED" : promoActive ? "ON" : "OFF"}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              {promoFooter}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  )
}
