import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "ProductStore",
  description: "Gestión de productos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body className="min-h-screen flex flex-col bg-gray-50 font-montserrat">
        <Navbar />
        <main className="flex-1 bg-linear-to-br from-[#F9F9F9] to-[#e8edf7] border-t border-gray-200">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
