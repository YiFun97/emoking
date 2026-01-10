import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 启用 standalone 输出，用于 Docker 部署
  output: "standalone",
  
  // 配置外部包，better-sqlite3 需要使用原生模块
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
