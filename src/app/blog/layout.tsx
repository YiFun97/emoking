import { BlogHeader } from "./_components/BlogHeader";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <BlogHeader />
      <main className="pt-24 pb-16">
        {children}
      </main>
    </div>
  );
}
