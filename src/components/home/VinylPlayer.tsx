import VinylPlayerClient from "./VinylPlayerClient";

import { getSpotifyPlaybackState } from "@lib/spotify";

export default async function VinylPlayer() {
  const playback = await getSpotifyPlaybackState();

  const playerKey = `${playback.status}:${playback.track?.spotifyUrl ?? "none"}:${playback.track?.progressMs ?? 0}`;

  return <VinylPlayerClient key={playerKey} playback={playback} />;
}
