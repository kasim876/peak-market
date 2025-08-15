import { Providers } from "./providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/components/globals.css";
import Header from "@/components/ui/header";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PeakMarket",
  description: "PeakMarket для продажи товаров",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${inter.className} antialiased bg-gray-300`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
