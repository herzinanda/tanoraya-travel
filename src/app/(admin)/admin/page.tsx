import { MapPin, Package, Newspaper, Megaphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../_components/ui/card";
import { strapiCount, strapiGet } from "../_lib/strapi-admin";
import Link from "next/link";
import { getStrapiMedia } from "@/component/main/home/StrapiImage";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const [destinations, tours, articles, promo] = await Promise.all([
    strapiCount("/api/destinations"),
    strapiCount("/api/tour-packages"),
    strapiCount("/api/blog-posts"),
    strapiGet("/api/promo-popup", {
      fields: ["isActive", "title"],
    }),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const promoActive = (promo?.data as any)?.isActive ?? false;

  // Recent tours
  const recentTours = await strapiGet("/api/tour-packages", {
    populate: { tourImageThumbnail: { fields: ["url"] } },
    fields: ["documentId", "title", "slug", "Price"],
    sort: "createdAt:desc",
    pagination: { pageSize: 5 },
  });

  // Recent articles
  const recentArticles = await strapiGet("/api/blog-posts", {
    fields: ["documentId", "title", "category", "publishedAt"],
    sort: "publishedAt:desc",
    pagination: { pageSize: 5 },
  });

  const stats = [
    { label: "Destinations", value: destinations, icon: MapPin, href: "/admin/destinations", color: "text-primary" },
    { label: "Tour Packages", value: tours, icon: Package, href: "/admin/tour-packages", color: "text-info" },
    { label: "Articles", value: articles, icon: Newspaper, href: "/admin/articles", color: "text-success" },
    { label: "Promo Popup", value: promoActive ? "Active" : "Inactive", icon: Megaphone, href: "/admin/promo", color: promoActive ? "text-success" : "text-text-muted" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary text-sm mt-1">Overview of your travel site content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href} className="no-underline">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-secondary">{stat.label}</p>
                      <p className="text-2xl font-bold text-text-primary mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-surface-secondary ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Recent Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tours */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Recent Tour Packages</CardTitle>
            <Link href="/admin/tour-packages" className="text-sm text-primary hover:underline no-underline">
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
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-surface-secondary transition-colors no-underline"
                >
                  {tour.tourImageThumbnail?.url ? (
                    <img
                      src={getStrapiMedia(tour.tourImageThumbnail.url) ?? ""}
                      alt=""
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-md bg-surface-secondary flex items-center justify-center">
                      <Package className="h-5 w-5 text-text-muted" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{tour.title}</p>
                    <p className="text-xs text-text-secondary">
                      {tour.Price ? `Rp ${Number(tour.Price).toLocaleString("id-ID")}` : "No price set"}
                    </p>
                  </div>
                </Link>
              ))}
              {((recentTours?.data as unknown[]) ?? []).length === 0 && (
                <p className="text-sm text-text-muted text-center py-4">No tour packages yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Articles */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Recent Articles</CardTitle>
            <Link href="/admin/articles" className="text-sm text-primary hover:underline no-underline">
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
                  className="flex items-center justify-between p-2 rounded-md hover:bg-surface-secondary transition-colors no-underline"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{article.title}</p>
                    <p className="text-xs text-text-secondary">{article.category ?? "Uncategorized"}</p>
                  </div>
                  <span className="text-xs text-text-muted shrink-0 ml-2">
                    {article.publishedAt
                      ? new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                      : "Draft"}
                  </span>
                </Link>
              ))}
              {((recentArticles?.data as unknown[]) ?? []).length === 0 && (
                <p className="text-sm text-text-muted text-center py-4">No articles yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
