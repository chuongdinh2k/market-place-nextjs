import Footer from "./Footer";
import Header from "./Header";
import { ToastProvider } from "@/components/providers/ToastProvider";

export default function BasicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </div>
    </ToastProvider>
  );
}
