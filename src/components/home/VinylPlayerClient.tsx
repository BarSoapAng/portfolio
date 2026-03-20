"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { FaSpotify } from "react-icons/fa";
import { IoMdPause, IoMdPlay } from "react-icons/io";

import type { SpotifyPlaybackState } from "@lib/spotify";

type VinylPlayerClientProps = {
  playback: SpotifyPlaybackState;
};

function formatDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1_000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function formatPlayedAt(playedAt: string | null) {
  if (!playedAt) {
    return null;
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(playedAt));
}

export default function VinylPlayerClient({ playback }: VinylPlayerClientProps) {
  const router = useRouter();

  useEffect(() => {
    const interval = window.setInterval(() => {
      router.refresh();
    }, 1_000);

    return () => {
      window.clearInterval(interval);
    };
  }, [router]);

  if (!playback.track) {
    return (
      <div className="h-full w-full border-4 border-black bg-cream-1 p-3 font-mono text-black">
        <div className="flex h-full flex-col justify-between gap-3">
          <div>
            <div className="text-sm font-bold uppercase tracking-[0.2em]">Spotify</div>
            <div className="mt-2 text-sm">Playback unavailable.</div>
            {playback.message ? <div className="mt-1 text-xs opacity-75">{playback.message}</div> : null}
          </div>

          <div className="text-xs opacity-75">
            Configure Spotify credentials on the server to show the current track.
          </div>
        </div>
      </div>
    );
  }

  const isPlaying = playback.status === "playing";
  const playedAt = formatPlayedAt(playback.track.playedAt);
  const currentProgressMs = isPlaying
    ? Math.max(playback.track.progressMs ?? 0, 0)
    : playback.track.durationMs;
  const currentProgress = formatDuration(currentProgressMs);
  const trackLength = formatDuration(playback.track.durationMs);
  const progressPercentage = isPlaying
    ? Math.min((currentProgressMs / playback.track.durationMs) * 100, 100)
    : 100;

  return (
    <div className="h-full w-full border-4 border-black bg-cream-1 p-3 font-mono text-black">
      <div className="flex h-full items-center gap-4">
        <div className="relative h-24 w-24 shrink-0">
          {playback.track.artworkUrl ? (
            <img
              src={playback.track.artworkUrl}
              className="absolute inset-0 rounded-full border border-black-1 animate-[spin_5s_linear_infinite] object-cover"
              style={{
                animationPlayState: isPlaying ? "running" : "paused",
              }}
              alt={`${playback.track.album} album art`}
            />
          ) : (
            <div className="absolute inset-0 rounded-full border border-black-1 bg-cream-2" />
          )}
          <div className="absolute inset-3 rounded-full border border-black-1/25" />
          <div className="absolute inset-6 rounded-full border border-black-1/25" />
          <div className="absolute inset-10 rounded-full border border-black-1 bg-cream-2" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-bold">{playback.track.title}</div>
              <div className="truncate text-xs opacity-80">{playback.track.artist}</div>
              <div className="truncate text-[10px] uppercase tracking-[0.18em] opacity-60">
                {playback.track.album}
              </div>
            </div>
            <a
              href={playback.track.spotifyUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Open track on Spotify"
              className="shrink-0 text-green-700 transition-colors hover:text-green-600"
            >
              <FaSpotify className="h-5 w-5" />
            </a>
          </div>

          <div className="h-1 rounded-sm border border-black-1">
            <div className="h-full bg-black-1" style={{ width: `${progressPercentage}%` }} />
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center text-[10px] uppercase tracking-[0.18em]">
            <span className="justify-self-start">{currentProgress}</span>
            <div className="flex items-center justify-center">
              {isPlaying ? <IoMdPause className="h-4 w-4" /> : <IoMdPlay className="h-4 w-4" />}
            </div>
            <span className="justify-self-end">{trackLength}</span>
          </div>

          <div className="text-[10px] opacity-70">
            {isPlaying
              ? "Playing on Spotify"
              : playedAt
                ? `Played at ${playedAt} on Spotify`
                : "Opened from Spotify"}
          </div>
        </div>
      </div>
    </div>
  );
}
