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
        className="hover:cursor-pointer"
        aria-label={playing ? "Pause music" : "Play music"}
        title={playing ? "Pause music" : "Play music"}
      >
        {playing ? <IoMdPause className="h-5 w-5" /> : <IoMdPlay className="h-5 w-5" />}
      </button>
    </div>
  );
}
