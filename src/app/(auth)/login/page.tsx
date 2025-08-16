"use client";

import { useSignInMutation } from "@/services/userService";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [signIn, { isLoading, isError, error }] = useSignInMutation();
  const router = useRouter();
  const redirect = useSearchParams().get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      await signIn(formData).unwrap();
      router.push(redirect);
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-800">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Вход</h1>

        {isError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
            {"data" in error && (error.data as { message?: string })?.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black mb-1"
            >
              Пароль
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600 cursor-pointer"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Вход..." : "Войти"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-black">
          Нет аккаунта?{" "}
          <Link
            href="/register"
            className="text-orange-500 hover:underline"
          >
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
}
