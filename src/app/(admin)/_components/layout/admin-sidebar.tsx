"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  Package,
  Newspaper,
  Megaphone,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "../../_lib/cn";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/destinations", label: "Destinations", icon: MapPin },
  { href: "/admin/tour-packages", label: "Tour Packages", icon: Package },
  { href: "/admin/articles", label: "Articles", icon: Newspaper },
  { href: "/admin/promo", label: "Promo Popup", icon: Megaphone },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar-bg text-sidebar-fg flex flex-col transition-all duration-200",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border shrink-0">
        {!collapsed && (
          <Link href="/admin" className="flex items-center gap-2 no-underline">
            <img
              src="/img/logo/tanoraya-logo.svg"
              alt="Tanoraya"
              className="h-8 brightness-0 invert"
            />
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "h-7 w-7 flex items-center justify-center rounded-md hover:bg-sidebar-border text-sidebar-muted transition-colors cursor-pointer",
            collapsed ? "mx-auto" : "ml-auto"
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors no-underline",
                active
                  ? "bg-sidebar-accent text-white"
                  : "text-sidebar-muted hover:text-sidebar-fg hover:bg-sidebar-border"
              )}
              title={collapsed ? link.label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-2 py-4 border-t border-sidebar-border">
        <form action="/admin/login">
          <button
            type="submit"
            formAction=""
            onClick={(e) => {
              e.preventDefault();
              // Use JS navigation to trigger server action
              document.cookie =
                "admin-session=; Path=/admin; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
              window.location.href = "/admin/login";
            }}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-sidebar-muted hover:text-sidebar-fg hover:bg-sidebar-border w-full cursor-pointer",
              collapsed && "justify-center"
            )}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </form>
      </div>
    </aside>
  );
}
