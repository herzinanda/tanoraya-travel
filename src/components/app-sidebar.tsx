"use client"

import * as React from "react"
import Link from "next/link"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  MapPinIcon,
  PackageIcon,
  NewspaperIcon,
  MegaphoneIcon,
  ClipboardListIcon,
  GlobeIcon,
} from "lucide-react"

const navMain = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: <LayoutDashboardIcon />,
  },
  {
    title: "Destinations",
    url: "/admin/destinations",
    icon: <MapPinIcon />,
  },
  {
    title: "Tour Packages",
    url: "/admin/tour-packages",
    icon: <PackageIcon />,
  },
  {
    title: "Articles",
    url: "/admin/articles",
    icon: <NewspaperIcon />,
  },
  {
    title: "Bookings",
    url: "/admin/bookings",
    icon: <ClipboardListIcon />,
  },
  {
    title: "Promo Popup",
    url: "/admin/promo",
    icon: <MegaphoneIcon />,
  },
]

const navSecondary = [
  {
    title: "View Site",
    url: "/",
    icon: <GlobeIcon />,
  },
]

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: { name: string; email: string }
}) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<Link href="/admin" />}
            >
              <img
                src="/img/logo/tanoraya-logo-new.png"
                alt="Tanoraya Tour & Travel"
                className="h-10 w-auto brightness-0 invert"
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: user.name, email: user.email, avatar: "" }} />
      </SidebarFooter>
    </Sidebar>
  )
}
