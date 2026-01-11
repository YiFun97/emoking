"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useAuthModal } from "@/store/auth-modal";
import Link from "next/link";

export function Navbar() {
  const { data: session, isPending } = useSession();
  const { openLogin } = useAuthModal();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 dark:bg-gray-900/80 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Emoking
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              首页
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              博客
            </Link>
            <Link 
              href="/admin" 
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              管理
            </Link>
          </div>

          {/* Auth Button */}
          <div className="flex items-center">
            {isPending ? (
              <div className="w-20 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            ) : session ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {session.user.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  退出登录
                </button>
              </div>
            ) : (
              <button
                onClick={openLogin}
                className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full transition-all shadow-lg shadow-blue-500/25"
              >
                登录
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
