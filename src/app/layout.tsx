import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Navbar from "@components/navigation/Navbar";
import background from "@assets/bg.gif";

export const metadata: Metadata = {
  title: "Angela's Universe",
  description: "Portfolio website",
  icons: {
    icon: "/webIcon.png",
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Image
          src={background}
          alt=""
          aria-hidden="true"
          fill
          priority
          unoptimized
          className="fixed inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="flex h-dvh w-dvw flex-col overflow-hidden">
          <Navbar />
          <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
