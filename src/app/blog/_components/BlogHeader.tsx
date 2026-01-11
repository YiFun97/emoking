"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useAuthModal } from "@/store/auth-modal";

export function BlogHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { openLogin } = useAuthModal();

  const navItems = [
    { href: "/blog", label: "首页" },
    { href: "/blog/his", label: "目录" },
    { href: "/blog/about", label: "关于" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 dark:bg-gray-900/80 dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/blog" className="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            Blog
          </Link>

          <nav className="flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive 
                      ? "text-blue-600 dark:text-blue-400" 
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center">
            {session ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {session.user.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                  退出
                </button>
              </div>
            ) : (
              <button
                onClick={openLogin}
                className="text-sm font-medium text-white bg-black dark:bg-white dark:text-black px-4 py-1.5 rounded-full hover:opacity-80 transition-opacity"
              >
                登录
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
