import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [usernameClient()],
});

// 导出常用方法
export const { signIn, signUp, signOut, useSession } = authClient;
