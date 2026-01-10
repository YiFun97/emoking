import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@/db/schema";
import path from "path";
import fs from "fs";

// 确保 data 目录存在
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 创建 SQLite 连接
const sqlite = new Database(path.join(dataDir, "app.db"));

// 创建 Drizzle ORM 实例
export const db = drizzle(sqlite, { schema });
