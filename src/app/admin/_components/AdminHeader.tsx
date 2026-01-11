"use client";

import { useAdminStore } from "../_store/admin-store";
import { useSession, signOut } from "@/lib/auth-client";
import { useAuthModal } from "@/store/auth-modal";

export function AdminHeader() {
  const { toggleSidebar, isSidebarOpen } = useAdminStore();
  const { data: session } = useSession();
  const { openLogin } = useAuthModal();

  return (
    <header 
      className={`
        fixed top-0 right-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 dark:bg-gray-900/80 dark:border-gray-800 flex items-center justify-between px-6 transition-all duration-300
        ${isSidebarOpen ? "left-64" : "left-20"}
      `}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300"
        >
          {isSidebarOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        <span className="text-gray-400">/</span>
        <span className="font-medium text-gray-700 dark:text-gray-200">Dashboard</span>
      </div>

      <div className="flex items-center gap-4">
        {session ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {session.user.name}
            </span>
            <button
               onClick={() => signOut()}
               className="text-sm text-red-500 hover:text-red-600"
            >
              退出
            </button>
          </div>
        ) : (
          <button
            onClick={openLogin}
            className="text-sm text-blue-600 hover:underline"
          >
            登录
          </button>
        )}
      </div>
    </header>
  );
}
