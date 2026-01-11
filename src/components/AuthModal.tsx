"use client";

import { useState } from "react";
import { signIn, signUp } from "@/lib/auth-client";
import { useAuthModal } from "@/store/auth-modal";

export function AuthModal() {
  const { isOpen, mode, close, toggleMode } = useAuthModal();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (mode === "login") {
        const result = await signIn.username({
          username: formData.username,
          password: formData.password,
        });
        
        if (result.error) {
          setError(result.error.message || "登录失败");
        } else {
          close();
          setFormData({ username: "", password: "", confirmPassword: "" });
          window.location.reload();
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError("两次输入的密码不一致");
          setIsLoading(false);
          return;
        }
        
        if (formData.password.length < 8) {
          setError("密码长度至少为8位");
          setIsLoading(false);
          return;
        }

        if (formData.username.length < 3) {
          setError("用户名长度至少为3位");
          setIsLoading(false);
          return;
        }

        // 使用用户名作为 email 的一部分（Better Auth 需要 email）
        const result = await signUp.email({
          email: `${formData.username}@local.app`,
          password: formData.password,
          name: formData.username,
          username: formData.username,
        });
        
        if (result.error) {
          setError(result.error.message || "注册失败");
        } else {
          close();
          setFormData({ username: "", password: "", confirmPassword: "" });
          window.location.reload();
        }
      }
    } catch (err) {
      setError("发生错误，请稍后重试");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    close();
    setError("");
    setFormData({ username: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* 弹窗内容 */}
      <div className="relative w-full max-w-md mx-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700 animate-in zoom-in-95 fade-in duration-200">
        {/* 关闭按钮 */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {mode === "login" ? "欢迎回来" : "创建账号"}
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {mode === "login" ? "登录您的账号" : "注册一个新账号"}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              用户名
            </label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
              placeholder={mode === "login" ? "您的用户名" : "3-20个字符"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              密码
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
              placeholder={mode === "login" ? "您的密码" : "至少8位密码"}
            />
          </div>

          {mode === "register" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                确认密码
              </label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                placeholder="再次输入密码"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "处理中..." : mode === "login" ? "登录" : "注册"}
          </button>
        </form>

        {/* Toggle */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              toggleMode();
              setError("");
            }}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            {mode === "login" ? "没有账号？点击注册" : "已有账号？点击登录"}
          </button>
        </div>
      </div>
    </div>
  );
}
