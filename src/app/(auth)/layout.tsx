import { Inter } from "next/font/google";
import { Providers } from "../providers";

const inter = Inter({
  subsets: ["latin"],
});

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="auth-layout">{children}</div>
    </Providers>
  );
}
