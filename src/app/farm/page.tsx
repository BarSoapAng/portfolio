import type { Metadata } from "next";
import FarmContent from "@components/farm/FarmContent";

export const metadata: Metadata = {
  title: "Community Farm | Angela's World",
  description: "Draw on your own little plot and share it with the world!",
};

export default function FarmPage() {
  return (
    <main>
      <FarmContent />
    </main>
  );
}
