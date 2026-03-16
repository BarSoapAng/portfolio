import VinylPlayerClient from "./VinylPlayerClient";

import { getSpotifyNowPlaying } from "../../lib/spotify";

export default async function VinylPlayer() {
  const initialPlayer = await getSpotifyNowPlaying();

  return <VinylPlayerClient initialPlayer={initialPlayer} />;
}
