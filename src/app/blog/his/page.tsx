export default function BlogDirectoryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          文章目录
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Archive
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
        <div className="space-y-8">
          {[2024, 2023].map((year) => (
            <div key={year}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                {year}
              </h2>
              <div className="space-y-4 ml-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-baseline gap-4">
                      <span className="text-sm text-gray-400 font-mono">01-1{i}</span>
                      <h3 className="text-lg text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        示例文章标题 {i}
                      </h3>
                    </div>
                    <div className="text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      阅读更多 →
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
