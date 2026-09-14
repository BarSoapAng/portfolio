import type { Metadata } from "next";
import FarmMap from "@components/farm/FarmMap";

export const metadata: Metadata = {
  title: "Community Garden | Angela's World",
  description: "Draw on your own little plot and share it with the world!",
};

export default function GardenPage() {
  return <FarmMap />;
}
