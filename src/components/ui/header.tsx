"use client";

import { useAuthQuery, useSignOutMutation } from "@/services/userService";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [signOut] = useSignOutMutation();
  const { data: user } = useAuthQuery();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="flex items-center justify-between w-full px-3 py-6 bg-blue-800 text-white">
      <Link href="/">Логотип</Link>
      <input
        placeholder="Поиск..."
        className="bg-blue-200 text-black text-base focus:outline-0 w-full max-w-[500px] h-[50px] rounded-2xl pl-4"
      />
      {user ? (
        <div className="flex gap-5">
          <p className="text-yellow-400">
            Привет, {user.name} {user.surname}
          </p>
          <Link href="/products/create">Создать объявление</Link>
          <button onClick={handleLogout}>Выйти</button>
        </div>
      ) : (
        <Link href={`/login?redirect=${encodeURIComponent(pathname || "/")}`}>Войти</Link>
      )}
    </header>
  );
}
