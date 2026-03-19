import VinylPlayerClient from "./VinylPlayerClient";

import { unstable_noStore as noStore } from "next/cache";

import { getSpotifyPlaybackState } from "@lib/spotify";

export default async function VinylPlayer() {
  noStore();

  const playback = await getSpotifyPlaybackState();
  return <VinylPlayerClient playback={playback} />;
}
