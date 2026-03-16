"use client";

import { useEffect, useState } from "react";

import { FaSpotify } from "react-icons/fa";
import { IoMdPause, IoMdPlay } from "react-icons/io";

import type { SpotifyNowPlayingPayload } from "../../lib/spotify";

const PROGRESS_TICK_MS = 1_000;

function formatDuration(durationMs: number | null): string {
  if (!durationMs || durationMs < 0) {
    return "--:--";
  }

  const totalSeconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function getStatusLabel(player: SpotifyNowPlayingPayload): string {
  if (!player.configured) {
    return "Spotify setup required";
  }

  if (player.source === "currently-playing") {
    return player.isPlaying ? "Listening now" : "Paused";
  }

  if (player.source === "recently-played") {
    return "Last played";
  }

  return "Waiting for playback";
}

type VinylPlayerClientProps = {
  initialPlayer: SpotifyNowPlayingPayload;
};

export default function VinylPlayerClient({ initialPlayer }: VinylPlayerClientProps) {
  const [player, setPlayer] = useState(initialPlayer);

  useEffect(() => {
    setPlayer(initialPlayer);
  }, [initialPlayer]);

  useEffect(() => {
    if (!player.isPlaying || !player.track || player.progressMs === null) {
      return;
    }

    const progressInterval = window.setInterval(() => {
      setPlayer((currentPlayer) => {
        if (
          !currentPlayer.isPlaying ||
          !currentPlayer.track ||
          currentPlayer.progressMs === null
        ) {
          return currentPlayer;
        }

        const nextProgress = Math.min(
          currentPlayer.progressMs + PROGRESS_TICK_MS,
          currentPlayer.track.durationMs,
        );

        return {
          ...currentPlayer,
          progressMs: nextProgress,
        };
      });
    }, PROGRESS_TICK_MS);

    return () => {
      window.clearInterval(progressInterval);
    };
  }, [player.isPlaying, player.progressMs, player.track]);

  const progressMs = player.progressMs ?? player.track?.durationMs ?? 0;
  const durationMs = player.track?.durationMs ?? null;
  const progressPercent =
    durationMs && durationMs > 0 ? Math.min((progressMs / durationMs) * 100, 100) : 0;

  return (
    <div className="w-full border-4 border-black bg-[#f6d6a8] p-3 font-mono text-black">
      <div className="mb-3 flex items-start justify-between gap-3 border-b border-black pb-2">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em]">Spotify Vinyl</div>
          <div className="text-xs opacity-80">{getStatusLabel(player)}</div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-black bg-black">
          {player.track?.coverUrl ? (
            <img
              src={player.track.coverUrl}
              className="absolute inset-0 h-full w-full animate-[spin_5s_linear_infinite] rounded-full object-cover"
              style={{
                animationPlayState: player.isPlaying ? "running" : "paused",
              }}
              alt={player.track.title}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[#1b1b1b] text-green-400">
              <FaSpotify className="h-8 w-8" />
            </div>
          )}
          <div className="absolute inset-3 rounded-full border border-white/20" />
          <div className="absolute inset-6 rounded-full border border-white/20" />
          <div className="absolute inset-10 rounded-full border border-black bg-[#f2c28f]" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          {player.track ? (
            <>
              <div className="min-w-0">
                <div className="truncate text-sm font-bold">{player.track.title}</div>
                <div className="truncate text-xs opacity-80">{player.track.artist}</div>
                <div className="truncate text-[11px] opacity-60">{player.track.album}</div>
              </div>

              <div className="h-2 overflow-hidden rounded-sm border border-black bg-[#f3e0bf]">
                <div
                  className="h-full bg-black transition-[width] duration-1000 ease-linear"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] uppercase">
                <div className="flex items-center gap-1 font-bold">
                  {player.isPlaying ? <IoMdPause className="h-4 w-4" /> : <IoMdPlay className="h-4 w-4" />}
                  <span>{getStatusLabel(player)}</span>
                </div>
                <div>
                  {formatDuration(progressMs)} / {formatDuration(durationMs)}
                </div>
              </div>
            </>
          ) : (
            <div className="flex min-h-24 flex-col justify-center text-xs">
              <div className="font-bold">
                {player.error ?? "No recent Spotify track found"}
              </div>
              <div className="mt-1 opacity-80">
                {player.configured
                  ? "Start playback once and this card will keep the latest track visible."
                  : "The player now fetches on the server. Add the missing Spotify env values and restart Next.js."}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
