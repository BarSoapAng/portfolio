"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

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
      <section>
        <h2>Spotify · offline</h2>
        <p>Nothing spinning right now.</p>
        {playback.message ? <p>{playback.message}</p> : null}
        <p>Configure Spotify on the server to show current track.</p>
      </section>
    );
  }

  const isPlaying = playback.status === "playing";
  const currentProgressMs = isPlaying
    ? Math.max(playback.track.progressMs ?? 0, 0)
    : 0;
  const currentProgress = formatDuration(currentProgressMs);
  const trackLength = formatDuration(playback.track.durationMs);

  return (
    <section>
      {playback.track.artworkUrl ? (
        <img
          src={playback.track.artworkUrl}
          alt={`${playback.track.album} album art`}
          width={96}
          height={96}
        />
      ) : null}
      <h2>
        <a
          href={playback.track.spotifyUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Open track on Spotify"
        >
          {playback.track.title}
        </a>
      </h2>
      {playback.track.artistUrl ? (
        <p>
          <a
            href={playback.track.artistUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open artist on Spotify"
          >
            {playback.track.artist}
          </a>
        </p>
      ) : (
        <p>{playback.track.artist}</p>
      )}
      <p>Track progress: {currentProgress} of {trackLength}</p>
      <p>{isPlaying ? "Playing" : "Paused"}</p>
      <p>{isPlaying ? "♪ vibin', jammin', join up!" : "last heard — not playing rn :/"}</p>
    </section>
  );
}
