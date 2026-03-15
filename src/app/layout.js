import "./globals.css";
import Navbar from "@components/Navbar";
import background from "@assets/bg.gif";

export const metadata = {
  title: "Angela's Universe",
  description: "Portfolio website",
};

export default function RootLayout({ children }) {
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
