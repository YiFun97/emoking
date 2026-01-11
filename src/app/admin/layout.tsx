"use client";

import { AdminSidebar } from "./_components/AdminSidebar";
import { AdminHeader } from "./_components/AdminHeader";
import { useAdminStore } from "./_store/admin-store";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isSidebarOpen } = useAdminStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      <AdminHeader />
      <main 
        className={`
          pt-20 px-6 pb-8 transition-all duration-300 min-h-screen
          ${isSidebarOpen ? "pl-72" : "pl-28"}
        `}
      >
        {children}
      </main>
    </div>
  );
}
