"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { IoMdPause, IoMdPlay } from "react-icons/io";

import type { SpotifyPlaybackState } from "@lib/spotify";

type VinylPlayerClientProps = {
  playback: SpotifyPlaybackState;
};

const PLAYING_REFRESH_INTERVAL_MS = 1_000;
const IDLE_REFRESH_INTERVAL_MS = 30_000;

function formatDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1_000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function VinylShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full border-2 border-gray-2 bg-paper-1 p-1 shadow-retro-md">
      <div className="h-full w-full border-2 border-gray-2 bg-cream-1 p-3 font-mono text-gray-2">
        {children}
      </div>
    </div>
  );
}

export default function VinylPlayerClient({ playback }: VinylPlayerClientProps) {
  const router = useRouter();
  const refreshIntervalMs =
    playback.status === "playing" ? PLAYING_REFRESH_INTERVAL_MS : IDLE_REFRESH_INTERVAL_MS;

  useEffect(() => {
    const interval = window.setInterval(() => {
      router.refresh();
    }, refreshIntervalMs);

    return () => {
      window.clearInterval(interval);
    };
  }, [refreshIntervalMs, router]);

  if (!playback.track) {
    return (
      <VinylShell>
        <div className="flex h-full flex-col justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em]">
              <span className="inline-block h-2 w-2 rounded-full bg-red-1" aria-hidden />
              Spotify · offline
            </div>
            <div className="mt-2 text-sm">Nothing spinning right now.</div>
            {playback.message ? (
              <div className="mt-1 text-xs text-gray-1/80">{playback.message}</div>
            ) : null}
          </div>

          <div className="text-[10px] uppercase tracking-[0.18em] text-gray-1/70">
            Configure Spotify on the server to show current track.
          </div>
        </div>
      </VinylShell>
    );
  }

  const isPlaying = playback.status === "playing";
  const currentProgressMs = isPlaying
    ? Math.max(playback.track.progressMs ?? 0, 0)
    : 0;
  const currentProgress = formatDuration(currentProgressMs);
  const trackLength = formatDuration(playback.track.durationMs);
  const progressPercentage = isPlaying
    ? Math.min((currentProgressMs / playback.track.durationMs) * 100, 100)
    : 0;

  return (
    <VinylShell>
      <div className="flex h-full items-center gap-4">
        <div className="relative h-24 w-24 shrink-0">
          {/* Vinyl backing disc */}
          <div className="absolute inset-0 rounded-full bg-gray-2 shadow-[inset_0_0_0_2px_var(--color-black-1)]" />
          {playback.track.artworkUrl ? (
            <img
              src={playback.track.artworkUrl}
              className="absolute inset-1 rounded-full border-2 border-black-1 object-cover"
              style={{
                animation: "spin 5s linear infinite",
                animationPlayState: isPlaying ? "running" : "paused",
              }}
              alt={`${playback.track.album} album art`}
            />
          ) : (
            <div className="absolute inset-1 rounded-full border-2 border-black-1 bg-cream-2" />
          )}
          {/* Concentric grooves */}
          <div className="pointer-events-none absolute inset-3 rounded-full border border-paper-1/30" />
          <div className="pointer-events-none absolute inset-6 rounded-full border border-paper-1/30" />
          {/* Center label spindle */}
          <div className="absolute inset-[42%] rounded-full border border-black-1 bg-paper-1" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-col">
            <a
              className="truncate text-sm font-bold text-gray-2 hover:underline"
              href={playback.track.spotifyUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Open track on Spotify"
            >
              {playback.track.title}
            </a>
            {playback.track.artistUrl ? (
              <a
                className="truncate text-xs text-gray-1 underline-offset-2 hover:underline"
                href={playback.track.artistUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open artist on Spotify"
              >
                {playback.track.artist}
              </a>
            ) : (
              <div className="truncate text-xs text-gray-1">{playback.track.artist}</div>
            )}
          </div>

          <div
            className="h-1.5 overflow-hidden rounded-sm border border-gray-2 bg-paper-2"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progressPercentage)}
          >
            <div
              className="h-full bg-gray-2 transition-[width] duration-700"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center text-[10px] uppercase tracking-[0.18em] tabular-nums">
            <span className="justify-self-start">{currentProgress}</span>
            <div className="flex items-center justify-center text-gray-2">
              {isPlaying ? <IoMdPause className="h-4 w-4" /> : <IoMdPlay className="h-4 w-4" />}
            </div>
            <span className="justify-self-end">{trackLength}</span>
          </div>

          <div className="text-[10px] uppercase tracking-[0.14em] text-gray-1">
            {isPlaying ? "♪ vibin', jammin', join up!" : "last heard — not playing rn :/"}
          </div>
        </div>
      </div>
    </VinylShell>
  );
}
