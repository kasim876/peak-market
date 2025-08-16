"use client";

import { useSignUpMutation } from "@/services/userService";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function Register() {
  const [signUp, { isLoading, isError, error }] = useSignUpMutation();
  const router = useRouter();
  const redirect = useSearchParams().get("redirect") || "/";

  const [formState, setFormState] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = {
      ...formState,
      [e.target.name]: e.target.value,
    };

    setFormState(newState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    for (let key in formState) {
      formData.append(key, formState[key as keyof typeof formState]);
    }

    try {
      await signUp(formData).unwrap();
      router.push(redirect);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-800">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Регистрация</h1>

        {isError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
            {"data" in error && (error.data as { message?: string })?.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-black mb-1"
            >
              Имя
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formState.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="surname"
              className="block text-sm font-medium text-black mb-1"
            >
              Фамилия
            </label>
            <input
              id="surname"
              name="surname"
              type="text"
              value={formState.surname}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-black mb-1"
            >
              Телефон
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formState.phone}
              onChange={handleChange}
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
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Войти
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-black">
          Уже есть аккаунт?{" "}
          <Link
            href="/login"
            className="text-orange-500 hover:underline"
          >
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}
