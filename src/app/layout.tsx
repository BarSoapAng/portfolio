import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@components/Navbar";
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
      <body>
        <img src={background.src} className="absolute z-[-1] h-full w-full object-cover" alt="" />
        <div className="w-dvw h-dvh overflow-x-hidden">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
