"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminStore } from "../_store/admin-store";

export function AdminSidebar() {
  const pathname = usePathname();
  const { isSidebarOpen } = useAdminStore();

  const links = [
    { href: "/admin", label: "概览", icon: "📊" },
    { href: "/admin/users", label: "用户管理", icon: "👥" },
    { href: "/admin/posts", label: "文章管理", icon: "📝" },
    { href: "/admin/settings", label: "系统设置", icon: "⚙️" },
  ];

  return (
    <aside
      className={`
        fixed left-0 top-0 z-40 h-screen bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 transition-all duration-300
        ${isSidebarOpen ? "w-64" : "w-20"}
      `}
    >
      <div className="flex items-center justify-center h-16 border-b border-gray-100 dark:border-gray-700">
        <Link href="/admin" className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white">
          <span className="text-2xl">⚡</span>
          {isSidebarOpen && <span>Admin</span>}
        </Link>
      </div>

      <nav className="p-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/50"
                }
              `}
            >
              <span className="text-xl">{link.icon}</span>
              {isSidebarOpen && <span className="font-medium">{link.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
