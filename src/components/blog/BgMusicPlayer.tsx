"use client";

import { useEffect, useRef, useState } from "react";
import { IoMdPause, IoMdPlay } from "react-icons/io";

const PAUSE_PREFERENCE_KEY = "blog-music-paused-by-user";
const MUSIC_VOLUME = 0.5;

export default function BgMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = MUSIC_VOLUME;

    const wasPausedByUser = localStorage.getItem(PAUSE_PREFERENCE_KEY) === "true";
    if (wasPausedByUser) return;

    void audio.play().catch(() => setPlaying(false));
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      localStorage.setItem(PAUSE_PREFERENCE_KEY, "true");
    } else {
      try {
        audio.volume = MUSIC_VOLUME;
        await audio.play();
        localStorage.setItem(PAUSE_PREFERENCE_KEY, "false");
      } catch {
        setPlaying(false);
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="/music/whatawonderfulworld.mp3"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        onClick={toggle}
        className="group flex h-12 w-12 items-center justify-center border-2 border-gray-2 bg-paper-1 text-gray-2 shadow-retro-md transition hover:-translate-y-0.5 hover:bg-cream-1 hover:shadow-retro-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-1 focus-visible:ring-offset-2"
        aria-label={playing ? "Pause background music" : "Play background music"}
        title={playing ? "Pause music" : "Play music"}
      >
        {playing ? (
          <IoMdPause className="h-5 w-5" />
        ) : (
          <IoMdPlay className="h-5 w-5 translate-x-[1px]" />
        )}
        <span className="sr-only">
          {playing ? "Pause background music" : "Play background music"}
        </span>
      </button>
    </div>
  );
}
