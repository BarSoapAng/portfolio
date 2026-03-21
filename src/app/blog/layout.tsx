import type { ReactNode } from "react";
import BgMusicPlayer from "@components/blog/BgMusicPlayer";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BgMusicPlayer />
      {children}
    </>
  );
}
