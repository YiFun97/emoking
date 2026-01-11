export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl text-3xl mb-4">
            📝
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            博客
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            分享技术文章和项目经验
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
            <p className="text-gray-700 dark:text-gray-300">
              🚧 博客页面正在建设中...
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              这里将会展示您的技术文章和项目分享
            </p>
          </div>

          {/* 示例文章卡片 */}
          <div className="mt-8 space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-100 dark:border-gray-600"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-xl animate-pulse" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded-lg w-3/4 animate-pulse" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded-lg w-full animate-pulse" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded-lg w-2/3 animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

  );
}
