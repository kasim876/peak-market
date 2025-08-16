"use client";

import { useGetProductQuery } from "@/services/productsService";
import { useAuthQuery } from "@/services/userService";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function Products() {
  const { id }: { id: string } = useParams();
  const pathname = usePathname();

  const { data: product, isLoading } = useGetProductQuery(id);
  const { data: user } = useAuthQuery();

  if (isLoading) return <div>Загрузка...</div>;

  if (!product) return <div>Не найден товар</div>;

  const { image_url, title, description, price, users } = product;

  return (
    <main className="p-4">
      <section className="space-y-4 container">
        <Image
          src={`/${image_url}`}
          alt={`Фото товара: ${title}`}
          width={500}
          height={500}
          className="rounded-lg"
        />
        <h1 className="text-4xl font-bold text-blue-800">{title}</h1>
        <span className="text-2xl font-bold block text-orange-500">{price} рублей</span>
        <p className="text-gray-600 text-lg">{description}</p>
        <span className="block text-2xl text-blue-800">
          Продавец: {users.name} {users.surname}
        </span>
        {user ? (
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Написать продавцу</button>
        ) : (
          <Link
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            href={`/login?redirect=${encodeURIComponent(pathname || "/")}`}
          >
            Войдите, чтобы написать продавцу
          </Link>
        )}
      </section>
    </main>
  );
}
