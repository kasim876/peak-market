"use client";

import { useGetProductsListQuery } from "@/services/productsService";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function ProductCardWrapper() {
  const { data: products, isLoading, error } = useGetProductsListQuery();

  return (
    <div className="w-full grid grid-cols-12 gap-5">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : products ? (
        products.map((product, id) => (
          <div
            className="col-span-3"
            key={id}
          >
            <ProductCard product={product} />
          </div>
        ))
      ) : null}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { id, title, description, price, image_url } = product;

  return (
    <Link
      href={`product/${id}`}
      className="relative flex flex-col items-start gap-3 p-4 bg-white w-full h-full"
      title={title}
    >
      <div className="relative w-full h-0 pt-[100%] rounded-2xl overflow-hidden">
        <Image
          src={`/${image_url}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={`Картинка товара: ${title}`}
          className="object-cover"
        />
      </div>
      <h2 className="font-bold text-xl text-blue-800">{title}</h2>
      <p className="text-base text-black whitespace-nowrap overflow-ellipsis overflow-hidden max-w-full mt-auto">
        {description}
      </p>
      <span className="text-lg text-orange-500">Цена: {price}р.</span>
    </Link>
  );
}
