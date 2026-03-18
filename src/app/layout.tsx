import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GlassNavbar from "@/components/GlassNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adventurespot - Thrill Awaits",
  description: "Trekking, rafting, and bungy jumping packages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 text-white antialiased`}>
        <GlassNavbar />
        {children}
      </body>
    </html>
  );
}
