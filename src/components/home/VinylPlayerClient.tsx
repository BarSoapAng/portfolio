"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import type { SpotifyPlaybackState } from "@lib/spotify";
import { EntryTags } from "@components/ui/ContentStyles";
import {
  BodySmall,
  CompactHeading,
  DisplayHero,
  Eyebrow,
} from "@components/ui/Typography";

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
          <DisplayHero>&#9835;</DisplayHero>
        </div>
        <div className={styles.details}>
          <Eyebrow as="p" className={styles.status}>Spotify offline</Eyebrow>
          <CompactHeading as="h2" className={styles.title}>
            Nothing spinning right now
          </CompactHeading>
          <BodySmall className={styles.message}>
            {playback.message ?? "Configure Spotify on the server to show the current track."}
          </BodySmall>
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
          <DisplayHero aria-hidden="true">&#9835;</DisplayHero>
        )}
      </div>

      <div className={styles.details}>
        <div className={styles.trackInfo}>
          <CompactHeading as="h2" className={styles.title}>
            <a
              href={playback.track.spotifyUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${playback.track.title} on Spotify`}
            >
              {playback.track.title}
            </a>
          </CompactHeading>
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
