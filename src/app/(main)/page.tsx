import ProductCardWrapper from "@/components/ui/cards";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-[32px]">
      <h1 className="sr-only">Peak Store</h1>
      <section className="container">
        <h2 className="font-bold text-3xl my-4">Актуальные товары</h2>
        <ProductCardWrapper />
      </section>
    </main>
  );
}
