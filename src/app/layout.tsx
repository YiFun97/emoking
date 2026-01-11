import type { Metadata } from "next";
import "./globals.css";
// Navbar removed
import { AuthModal } from "@/components/AuthModal";

export const metadata: Metadata = {
  title: "Emoking - 多应用平台",
  description: "一个支持多前端页面的全栈 Web 应用",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">
        {children}
        <AuthModal />
      </body>
    </html>
  );
}
