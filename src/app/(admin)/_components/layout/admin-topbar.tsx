"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const labelMap: Record<string, string> = {
  admin: "Dashboard",
  destinations: "Destinations",
  "tour-packages": "Tour Packages",
  articles: "Articles",
  promo: "Promo Popup",
  new: "Create New",
};

function getBreadcrumbs(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const crumbs: { label: string; href: string }[] = [];
  let path = "";

  for (const part of parts) {
    path += `/${part}`;
    const label = labelMap[part] ?? decodeURIComponent(part);
    crumbs.push({ label, href: path });
  }

  return crumbs;
}

export function AdminTopbar() {
  const pathname = usePathname();
  const crumbs = getBreadcrumbs(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-surface px-6">
      <nav className="flex items-center gap-1.5 text-sm">
        <Link
          href="/admin"
          className="text-text-muted hover:text-text-primary transition-colors no-underline"
        >
          <Home className="h-4 w-4" />
        </Link>
        {crumbs.slice(1).map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-text-muted" />
            {i === crumbs.length - 2 ? (
              <span className="font-medium text-text-primary">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="text-text-muted hover:text-text-primary transition-colors no-underline"
              >
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </header>
  );
}
