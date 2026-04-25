import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { verifySession } from "../_lib/session"

export default async function AdminShellLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await verifySession()
  const user = {
    name: session?.username ?? "Admin",
    email: session?.email ?? "",
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" user={user} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-4 lg:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
