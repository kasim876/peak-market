import Header from "@/components/ui/header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="main-layout">
      <Header />
      {children}
    </div>
  );
}
