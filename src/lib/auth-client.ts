import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // 如果认证服务器和客户端是同一个域名，可以不设置 baseURL
  // baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

// 导出常用方法
export const { signIn, signUp, signOut, useSession } = authClient;
