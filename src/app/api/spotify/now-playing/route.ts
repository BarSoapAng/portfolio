import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  createConnectedIdleSpotifyPayload,
  createCurrentTrackPayload,
  createRecentTrackPayload,
  createSetupRequiredSpotifyPayload,
  fetchSpotifyApi,
  getSpotifyOwnerAccessToken,
} from "../../../../lib/spotify";

function createJsonResponse(body: unknown, init?: ResponseInit) {
  return NextResponse.json(body, {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      ...(init?.headers ?? {}),
    },
  });
}

export async function GET() {
  await cookies();

  let accessToken: string | null = null;

  try {
    accessToken = await getSpotifyOwnerAccessToken();
  } catch {
    return createJsonResponse(createSetupRequiredSpotifyPayload(), {
      status: 502,
    });
  }

  if (!accessToken) {
    return createJsonResponse(createSetupRequiredSpotifyPayload());
  }

  const currentTrackResponse = await fetchSpotifyApi("/me/player/currently-playing", accessToken);

  if (currentTrackResponse.status === 204) {
    const recentlyPlayedResponse = await fetchSpotifyApi("/me/player/recently-played?limit=1", accessToken);

    if (!recentlyPlayedResponse.ok) {
      return createJsonResponse(createConnectedIdleSpotifyPayload(), {
        status: 502,
      });
    }

    const recentlyPlayed = await recentlyPlayedResponse.json();
    const recentPayload = createRecentTrackPayload(recentlyPlayed);

    return createJsonResponse(recentPayload ?? createConnectedIdleSpotifyPayload());
  }

  if (!currentTrackResponse.ok) {
    return createJsonResponse(createSetupRequiredSpotifyPayload(), {
      status: 502,
    });
  }

  const playback = await currentTrackResponse.json();
  const currentPayload = createCurrentTrackPayload(playback);

  if (currentPayload) {
    return createJsonResponse(currentPayload);
  }

  const recentlyPlayedResponse = await fetchSpotifyApi("/me/player/recently-played?limit=1", accessToken);

  if (!recentlyPlayedResponse.ok) {
    return createJsonResponse(createConnectedIdleSpotifyPayload(), {
      status: 502,
    });
  }

  const recentlyPlayed = await recentlyPlayedResponse.json();
  const recentPayload = createRecentTrackPayload(recentlyPlayed);

  return createJsonResponse(recentPayload ?? createConnectedIdleSpotifyPayload());
}
