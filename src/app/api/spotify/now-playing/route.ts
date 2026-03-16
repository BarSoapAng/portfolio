import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  clearSpotifySession,
  createConnectedIdleSpotifyPayload,
  createCurrentTrackPayload,
  createDisconnectedSpotifyPayload,
  createRecentTrackPayload,
  fetchSpotifyApi,
  readSpotifySession,
  refreshSpotifyAccessToken,
  writeSpotifySession,
} from "../../../../lib/spotify";

async function getAuthorizedAccessToken() {
  const cookieStore = await cookies();
  const session = readSpotifySession(cookieStore);

  if (!session.refreshToken) {
    return {
      accessToken: null,
      cookieStore,
    };
  }

  if (session.accessToken && session.expiresAt && session.expiresAt > Date.now()) {
    return {
      accessToken: session.accessToken,
      cookieStore,
    };
  }

  try {
    const refreshedToken = await refreshSpotifyAccessToken(session.refreshToken);
    const updatedSession = writeSpotifySession(cookieStore, refreshedToken, session.refreshToken);

    return {
      accessToken: updatedSession.accessToken,
      cookieStore,
    };
  } catch {
    clearSpotifySession(cookieStore);

    return {
      accessToken: null,
      cookieStore,
    };
  }
}

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
  const { accessToken, cookieStore } = await getAuthorizedAccessToken();

  if (!accessToken) {
    return createJsonResponse(createDisconnectedSpotifyPayload());
  }

  let activeAccessToken = accessToken;
  let currentTrackResponse = await fetchSpotifyApi("/me/player/currently-playing", activeAccessToken);

  if (currentTrackResponse.status === 401) {
    const session = readSpotifySession(cookieStore);

    if (!session.refreshToken) {
      clearSpotifySession(cookieStore);
      return createJsonResponse(createDisconnectedSpotifyPayload());
    }

    try {
      const refreshedToken = await refreshSpotifyAccessToken(session.refreshToken);
      const updatedSession = writeSpotifySession(cookieStore, refreshedToken, session.refreshToken);

      if (!updatedSession.accessToken) {
        clearSpotifySession(cookieStore);
        return createJsonResponse(createDisconnectedSpotifyPayload());
      }

      activeAccessToken = updatedSession.accessToken;
      currentTrackResponse = await fetchSpotifyApi("/me/player/currently-playing", activeAccessToken);
    } catch {
      clearSpotifySession(cookieStore);
      return createJsonResponse(createDisconnectedSpotifyPayload());
    }
  }

  if (currentTrackResponse.status === 204) {
    const recentlyPlayedResponse = await fetchSpotifyApi("/me/player/recently-played?limit=1", activeAccessToken);

    if (!recentlyPlayedResponse.ok) {
      if (recentlyPlayedResponse.status === 401) {
        clearSpotifySession(cookieStore);
        return createJsonResponse(createDisconnectedSpotifyPayload());
      }

      return createJsonResponse(createConnectedIdleSpotifyPayload(), {
        status: 502,
      });
    }

    const recentlyPlayed = await recentlyPlayedResponse.json();
    const recentPayload = createRecentTrackPayload(recentlyPlayed);

    return createJsonResponse(recentPayload ?? createConnectedIdleSpotifyPayload());
  }

  if (!currentTrackResponse.ok) {
    return createJsonResponse(createConnectedIdleSpotifyPayload(), {
      status: 502,
    });
  }

  const playback = await currentTrackResponse.json();
  const currentPayload = createCurrentTrackPayload(playback);

  if (currentPayload) {
    return createJsonResponse(currentPayload);
  }

  const recentlyPlayedResponse = await fetchSpotifyApi("/me/player/recently-played?limit=1", activeAccessToken);

  if (!recentlyPlayedResponse.ok) {
    if (recentlyPlayedResponse.status === 401) {
      clearSpotifySession(cookieStore);
      return createJsonResponse(createDisconnectedSpotifyPayload());
    }

    return createJsonResponse(createConnectedIdleSpotifyPayload(), {
      status: 502,
    });
  }

  const recentlyPlayed = await recentlyPlayedResponse.json();
  const recentPayload = createRecentTrackPayload(recentlyPlayed);

  return createJsonResponse(recentPayload ?? createConnectedIdleSpotifyPayload());
}
