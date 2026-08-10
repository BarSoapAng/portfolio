import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@components/navigation/Navbar";

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
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
