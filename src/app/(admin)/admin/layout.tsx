import { AdminSidebar } from "../_components/layout/admin-sidebar";
import { AdminTopbar } from "../_components/layout/admin-topbar";

export default function AdminShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-secondary font-sans">
      <AdminSidebar />
      <div className="ml-60 transition-all duration-200">
        <AdminTopbar />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
