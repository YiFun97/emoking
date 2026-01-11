export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl">
              ⚙️
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                管理后台
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Admin Dashboard
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800">
            <p className="text-gray-700 dark:text-gray-300">
              🚧 管理后台页面正在建设中...
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              这个页面将用于管理您的网站内容和用户
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "用户数", value: "0", color: "blue" },
              { label: "文章数", value: "0", color: "green" },
              { label: "访问量", value: "0", color: "purple" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}
