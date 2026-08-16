"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import type { SpotifyPlaybackState } from "@lib/spotify";

import styles from "./VinylPlayer.module.css";

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
      <section className={styles.player} aria-label="Spotify player">
        <div className={styles.artworkFallback} aria-hidden="true">
          <span>&#9835;</span>
        </div>
        <div className={styles.details}>
          <p className={styles.status}>Spotify offline</p>
          <h2 className={styles.title}>Nothing spinning right now</h2>
          <p className={styles.message}>
            {playback.message ?? "Configure Spotify on the server to show the current track."}
          </p>
        </div>
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
    <section className={styles.player} aria-label="Spotify player">
      <div className={styles.artwork}>
        {playback.track.artworkUrl ? (
          <img
            src={playback.track.artworkUrl}
            alt={`${playback.track.album} album art`}
            width={160}
            height={160}
          />
        ) : (
          <span aria-hidden="true">&#9835;</span>
        )}
      </div>

      <div className={styles.details}>
        <p className={styles.status}>
          <span className={isPlaying ? styles.liveDot : styles.idleDot} aria-hidden="true" />
          {isPlaying ? "Now playing" : "Recently played"}
        </p>

        <div className={styles.trackInfo}>
          <h2 className={styles.title}>
            <a
              href={playback.track.spotifyUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${playback.track.title} on Spotify`}
            >
              {playback.track.title}
            </a>
          </h2>
          {playback.track.artistUrl ? (
            <p className={styles.artist}>
              <a
                href={playback.track.artistUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${playback.track.artist} on Spotify`}
              >
                {playback.track.artist}
              </a>
            </p>
          ) : (
            <p className={styles.artist}>{playback.track.artist}</p>
          )}
        </div>

        <div className={styles.timeline}>
          <progress
            aria-label="Track progress"
            value={currentProgressMs}
            max={playback.track.durationMs}
          />
          <div className={styles.timestamps} aria-hidden="true">
            <span>{currentProgress}</span>
            <span>{trackLength}</span>
          </div>
        </div>

        <div className={styles.footer}>
          <p>{isPlaying ? "vibin', jammin', join up!" : "last heard - not playing rn :/"}</p>
          <a
            className={styles.spotifyLink}
            href={playback.track.spotifyUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open in Spotify <span aria-hidden="true">&#8599;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
