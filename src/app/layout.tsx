import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@components/navigation/Navbar";
import background from "@assets/bg.gif";

export const metadata: Metadata = {
  title: "Angela's Universe",
  description: "Portfolio website",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="overflow-hidden font-sans">
        <img src={background.src} className="absolute z-[-1] h-full w-full object-cover" alt="" />
        <div className="flex h-dvh w-dvw flex-col overflow-hidden">
          <Navbar />
          <main className="min-h-0 flex-1 overflow-auto p-2">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
