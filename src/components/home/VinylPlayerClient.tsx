"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import type { SpotifyPlaybackState } from "@lib/spotify";
import { EntryTags } from "@components/ui/ContentStyles";

import styles from "./VinylPlayer.module.css";

type VinylPlayerClientProps = {
  playback: SpotifyPlaybackState;
};

export default function VinylPlayerClient({ playback }: VinylPlayerClientProps) {
  const router = useRouter();
  const isPlaying = playback.status === "playing";
  const [currentProgressMs, setCurrentProgressMs] = useState(() =>
    isPlaying ? Math.max(playback.track?.progressMs ?? 0, 0) : 0,
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      router.refresh();
    }, 45_000);

    return () => {
      window.clearInterval(interval);
    };
  }, [router]);

  useEffect(() => {
    const track = playback.track;

    if (!isPlaying || !track) {
      return;
    }

    const startingProgressMs = Math.max(track.progressMs ?? 0, 0);
    const startedAt = Date.now();
    const progressInterval = window.setInterval(() => {
      setCurrentProgressMs(
        Math.min(startingProgressMs + Date.now() - startedAt, track.durationMs),
      );
    }, 1_000);
    const refreshTimeout = window.setTimeout(() => {
      router.refresh();
    }, Math.max(track.durationMs - startingProgressMs, 1_000));

    return () => {
      window.clearInterval(progressInterval);
      window.clearTimeout(refreshTimeout);
    };
  }, [isPlaying, playback.track, router]);

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

  return (
    <section className={styles.player} aria-label="Spotify player">
      <div className={styles.artwork}>
        {playback.track.artworkUrl ? (
          <img
            src={playback.track.artworkUrl}
            alt={`${playback.track.album} album art`}
            draggable={false}
            width={160}
            height={160}
          />
        ) : (
          <span aria-hidden="true">&#9835;</span>
        )}
      </div>

      <div className={styles.details}>
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
            <EntryTags className={styles.artist}>
              <a
                href={playback.track.artistUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${playback.track.artist} on Spotify`}
              >
                {playback.track.artist}
              </a>
            </EntryTags>
          ) : (
            <EntryTags className={styles.artist}>{playback.track.artist}</EntryTags>
          )}
        </div>

        <div className={styles.timeline}>
          <progress
            aria-label="Track progress"
            value={currentProgressMs}
            max={playback.track.durationMs}
          />
        </div>
      </div>
    </section>
  );
}
