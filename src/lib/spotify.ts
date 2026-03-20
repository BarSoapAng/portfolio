import "server-only";

const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";
const SPOTIFY_ACCOUNTS_URL = "https://accounts.spotify.com/api/token";
const DEFAULT_BACKOFF_MS = 1_000;
const MAX_RETRY_ATTEMPTS = 3;

type SpotifyTokenResponse = {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token?: string;
};

type SpotifyErrorResponse = {
  error: {
    status: number;
    message: string;
  };
};

type SpotifyArtist = {
  name: string;
  external_urls: {
    spotify: string;
  };
};

type SpotifyImage = {
  url: string;
  height: number | null;
  width: number | null;
};

type SpotifyTrack = {
  name: string;
  duration_ms: number;
  external_urls: {
    spotify: string;
  };
  artists: SpotifyArtist[];
  album: {
    name: string;
    images: SpotifyImage[];
  };
};

type SpotifyCurrentlyPlayingResponse = {
  currently_playing_type: "track" | "episode" | "ad" | "unknown";
  is_playing: boolean;
  progress_ms: number | null;
  item: SpotifyTrack | null;
};

type SpotifyRecentlyPlayedItem = {
  played_at: string;
  track: SpotifyTrack;
};

type SpotifyRecentlyPlayedResponse = {
  items: SpotifyRecentlyPlayedItem[];
};

export type SpotifyPlaybackState = {
  status: "playing" | "recent" | "unavailable";
  track: {
    title: string;
    artist: string;
    artistUrl: string | null;
    album: string;
    artworkUrl: string | null;
    spotifyUrl: string;
    progressMs: number | null;
    durationMs: number;
    playedAt: string | null;
  } | null;
  message: string | null;
};

type NormalizedSpotifyTrack = NonNullable<SpotifyPlaybackState["track"]>;

type SpotifyRequestResult<T> =
  | { ok: true; status: number; data: T | null }
  | { ok: false; status: number; message: string };

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const spotifyRefreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
let lastKnownTrack: NormalizedSpotifyTrack | null = null;

function getConfiguredCredentials() {
  if (!spotifyClientId || !spotifyClientSecret || !spotifyRefreshToken) {
    return null;
  }

  return {
    clientId: spotifyClientId,
    clientSecret: spotifyClientSecret,
    refreshToken: spotifyRefreshToken,
  };
}

function parseRetryAfterSeconds(retryAfter: string | null, attempt: number) {
  if (!retryAfter) {
    return DEFAULT_BACKOFF_MS * (attempt + 1);
  }

  const parsedSeconds = Number.parseInt(retryAfter, 10);

  if (Number.isNaN(parsedSeconds) || parsedSeconds < 0) {
    return DEFAULT_BACKOFF_MS * (attempt + 1);
  }

  return parsedSeconds * 1_000;
}

async function wait(delayMs: number) {
  await new Promise((resolve) => {
    setTimeout(resolve, delayMs);
  });
}

async function parseSpotifyError(response: Response) {
  try {
    const body = (await response.json()) as SpotifyErrorResponse;
    if (body?.error?.message) {
      return body.error.message;
    }
  } catch {
    return response.statusText || "Spotify request failed.";
  }

  return response.statusText || "Spotify request failed.";
}

async function spotifyFetch<T>(
  input: URL | string,
  init: RequestInit,
  attempt = 0,
): Promise<SpotifyRequestResult<T>> {
  const response = await fetch(input, {
    ...init,
    cache: "no-store",
  });

  if (response.status === 429 && attempt < MAX_RETRY_ATTEMPTS) {
    await wait(parseRetryAfterSeconds(response.headers.get("Retry-After"), attempt));

    return spotifyFetch<T>(input, init, attempt + 1);
  }

  if (response.status === 204) {
    return {
      ok: true,
      status: response.status,
      data: null,
    };
  }

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      message: await parseSpotifyError(response),
    };
  }

  return {
    ok: true,
    status: response.status,
    data: (await response.json()) as T,
  };
}

async function getAccessToken() {
  const credentials = getConfiguredCredentials();

  if (!credentials) {
    return {
      ok: false as const,
      message: "Set SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_REFRESH_TOKEN to enable playback.",
    };
  }

  const basicToken = Buffer.from(
    `${credentials.clientId}:${credentials.clientSecret}`,
  ).toString("base64");

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: credentials.refreshToken,
  });

  const response = await spotifyFetch<SpotifyTokenResponse>(SPOTIFY_ACCOUNTS_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok || !response.data?.access_token) {
    return {
      ok: false as const,
      message: response.ok
        ? "Spotify did not return an access token."
        : `Spotify token refresh failed (${response.status}): ${response.message}`,
    };
  }

  return {
    ok: true as const,
    accessToken: response.data.access_token,
  };
}

function normalizeTrack(
  track: SpotifyTrack,
  details: {
    progressMs: number | null;
    playedAt: string | null;
  },
): NormalizedSpotifyTrack {
  return {
    title: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
    artistUrl: track.artists[0]?.external_urls.spotify ?? null,
    album: track.album.name,
    artworkUrl: track.album.images[0]?.url ?? null,
    spotifyUrl: track.external_urls.spotify,
    progressMs: details.progressMs,
    durationMs: track.duration_ms,
    playedAt: details.playedAt,
  };
}

function rememberTrack(track: NormalizedSpotifyTrack) {
  lastKnownTrack = track;

  return track;
}

async function getCurrentlyPlaying(accessToken: string) {
  const response = await spotifyFetch<SpotifyCurrentlyPlayingResponse>(
    `${SPOTIFY_API_BASE_URL}/me/player/currently-playing`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    return response;
  }

  if (!response.data || response.data.currently_playing_type !== "track" || !response.data.item) {
    return {
      ok: true as const,
      status: response.status,
      data: null,
    };
  }

  return response;
}

async function getRecentlyPlayed(accessToken: string) {
  const url = new URL(`${SPOTIFY_API_BASE_URL}/me/player/recently-played`);
  url.searchParams.set("limit", "1");

  return spotifyFetch<SpotifyRecentlyPlayedResponse>(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function getSpotifyPlaybackState(): Promise<SpotifyPlaybackState> {
  const tokenResponse = await getAccessToken();

  if (!tokenResponse.ok) {
    return {
      status: "unavailable",
      track: null,
      message: tokenResponse.message,
    };
  }

  const currentResponse = await getCurrentlyPlaying(tokenResponse.accessToken);

  if (!currentResponse.ok) {
    return {
      status: "unavailable",
      track: null,
      message: `Spotify playback request failed (${currentResponse.status}): ${currentResponse.message}`,
    };
  }

  if (currentResponse.data?.is_playing && currentResponse.data.item) {
    return {
      status: "playing",
      track: rememberTrack(normalizeTrack(currentResponse.data.item, {
        progressMs: currentResponse.data.progress_ms,
        playedAt: null,
      })),
      message: null,
    };
  }

  if (currentResponse.data?.item) {
    return {
      status: "recent",
      track: rememberTrack(normalizeTrack(currentResponse.data.item, {
        progressMs: currentResponse.data.progress_ms,
        playedAt: null,
      })),
      message: null,
    };
  }

  const recentResponse = await getRecentlyPlayed(tokenResponse.accessToken);

  if (!recentResponse.ok) {
    if (lastKnownTrack) {
      return {
        status: "recent",
        track: lastKnownTrack,
        message: `Spotify recently played is temporarily unavailable (${recentResponse.status}). Showing the last known track instead.`,
      };
    }

    return {
      status: "unavailable",
      track: null,
      message: `Spotify recently played request failed (${recentResponse.status}): ${recentResponse.message}`,
    };
  }

  const recentTrack = recentResponse.data?.items[0];

  if (!recentTrack) {
    if (lastKnownTrack) {
      return {
        status: "recent",
        track: lastKnownTrack,
        message: "Spotify returned no recent tracks. Showing the last known track instead.",
      };
    }

    return {
      status: "unavailable",
      track: null,
      message: "Spotify has no recently played tracks available for this account.",
    };
  }

  return {
    status: "recent",
    track: rememberTrack(normalizeTrack(recentTrack.track, {
      progressMs: null,
      playedAt: recentTrack.played_at,
    })),
    message: null,
  };
}
