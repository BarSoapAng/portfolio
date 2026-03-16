import { Buffer } from "node:buffer";

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";

type SpotifyTokenResponse = {
  access_token: string;
};

type SpotifyTrackObject = {
  album: {
    images?: Array<{
      url: string;
    }>;
    name: string;
  };
  artists: Array<{
    name: string;
  }>;
  duration_ms: number;
  external_urls?: {
    spotify?: string;
  };
  id: string;
  name: string;
};

type SpotifyCurrentlyPlayingResponse = {
  is_playing: boolean;
  item: SpotifyTrackObject | null;
  progress_ms: number | null;
};

type SpotifyRecentlyPlayedResponse = {
  items: Array<{
    played_at: string;
    track: SpotifyTrackObject;
  }>;
};

type SpotifyCredentials = {
  clientId: string;
  clientSecret: string;
};

export type SpotifyTrackSummary = {
  album: string;
  artist: string;
  artists: string[];
  coverUrl: string | null;
  durationMs: number;
  id: string;
  spotifyUrl: string | null;
  title: string;
};

export type SpotifyNowPlayingPayload = {
  configured: boolean;
  connected: boolean;
  error: string | null;
  isPlaying: boolean;
  playedAt: string | null;
  progressMs: number | null;
  source: "currently-playing" | "recently-played" | null;
  track: SpotifyTrackSummary | null;
};

function getSpotifyCredentials(): SpotifyCredentials | null {
  const clientId = process.env.SPOTIFY_CLIENT_ID?.trim();
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET?.trim();

  if (!clientId || !clientSecret) {
    return null;
  }

  return {
    clientId,
    clientSecret,
  };
}

function getSpotifyAccessToken(): string | null {
  const accessToken = process.env.SPOTIFY_ACCESS_TOKEN?.trim();
  return accessToken || null;
}

function getSpotifyRefreshToken(): string | null {
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN?.trim();
  return refreshToken || null;
}

export function hasSpotifyCredentials(): boolean {
  return getSpotifyCredentials() !== null;
}

function createSpotifyBasicAuthorizationHeader(credentials: SpotifyCredentials): string {
  return `Basic ${Buffer.from(`${credentials.clientId}:${credentials.clientSecret}`).toString("base64")}`;
}

async function requestSpotifyTokens(body: URLSearchParams): Promise<SpotifyTokenResponse> {
  const credentials = getSpotifyCredentials();

  if (!credentials) {
    throw new Error("Spotify credentials are missing.");
  }

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    body,
    cache: "no-store",
    headers: {
      Authorization: createSpotifyBasicAuthorizationHeader(credentials),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`Spotify token request failed with status ${response.status}.`);
  }

  return (await response.json()) as SpotifyTokenResponse;
}

async function getSpotifyAppAccessToken(): Promise<string> {
  const token = await requestSpotifyTokens(
    new URLSearchParams({
      grant_type: "client_credentials",
    }),
  );

  return token.access_token;
}

async function getSpotifyOwnerAccessToken(): Promise<string | null> {
  const accessToken = getSpotifyAccessToken();

  if (accessToken) {
    return accessToken;
  }

  const refreshToken = getSpotifyRefreshToken();

  if (!refreshToken) {
    return null;
  }

  const token = await requestSpotifyTokens(
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  );

  return token.access_token;
}

async function fetchSpotifyApi(path: string, accessToken: string): Promise<Response> {
  return fetch(`${SPOTIFY_API_BASE_URL}${path}`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

function toTrackSummary(track: SpotifyTrackObject): SpotifyTrackSummary {
  const artists = track.artists.map((artist) => artist.name);

  return {
    album: track.album.name,
    artist: artists.join(", "),
    artists,
    coverUrl: track.album.images?.[0]?.url ?? null,
    durationMs: track.duration_ms,
    id: track.id,
    spotifyUrl: track.external_urls?.spotify ?? null,
    title: track.name,
  };
}

function createMissingConfigPayload(error: string): SpotifyNowPlayingPayload {
  return {
    configured: false,
    connected: false,
    error,
    isPlaying: false,
    playedAt: null,
    progressMs: null,
    source: null,
    track: null,
  };
}

function createDisconnectedSpotifyPayload(error: string): SpotifyNowPlayingPayload {
  return {
    configured: true,
    connected: false,
    error,
    isPlaying: false,
    playedAt: null,
    progressMs: null,
    source: null,
    track: null,
  };
}

function createConnectedIdleSpotifyPayload(): SpotifyNowPlayingPayload {
  return {
    configured: true,
    connected: true,
    error: null,
    isPlaying: false,
    playedAt: null,
    progressMs: null,
    source: null,
    track: null,
  };
}

function createCurrentTrackPayload(
  playback: SpotifyCurrentlyPlayingResponse,
): SpotifyNowPlayingPayload | null {
  if (!playback.item) {
    return null;
  }

  return {
    configured: true,
    connected: true,
    error: null,
    isPlaying: playback.is_playing,
    playedAt: null,
    progressMs: playback.progress_ms,
    source: "currently-playing",
    track: toTrackSummary(playback.item),
  };
}

function createRecentTrackPayload(
  recentlyPlayed: SpotifyRecentlyPlayedResponse,
): SpotifyNowPlayingPayload | null {
  const latestTrack = recentlyPlayed.items[0];

  if (!latestTrack) {
    return null;
  }

  return {
    configured: true,
    connected: true,
    error: null,
    isPlaying: false,
    playedAt: latestTrack.played_at,
    progressMs: latestTrack.track.duration_ms,
    source: "recently-played",
    track: toTrackSummary(latestTrack.track),
  };
}

function isSpotifyAuthorizationFailure(response: Response): boolean {
  return response.status === 401 || response.status === 403;
}

export async function getSpotifyNowPlaying(): Promise<SpotifyNowPlayingPayload> {
  if (!hasSpotifyCredentials()) {
    return createMissingConfigPayload("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in .env.");
  }

  let accessToken: string | null = null;

  try {
    accessToken = await getSpotifyOwnerAccessToken();
  } catch {
    return createDisconnectedSpotifyPayload(
      "Spotify token refresh failed. Check SPOTIFY_ACCESS_TOKEN or SPOTIFY_REFRESH_TOKEN.",
    );
  }

  if (!accessToken) {
    try {
      await getSpotifyAppAccessToken();
    } catch {
      return createMissingConfigPayload(
        "Spotify app token request failed. Check SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET.",
      );
    }

    return createDisconnectedSpotifyPayload(
      "Spotify now playing needs SPOTIFY_ACCESS_TOKEN or SPOTIFY_REFRESH_TOKEN in .env. App API keys alone cannot read /me/player.",
    );
  }

  const currentTrackResponse = await fetchSpotifyApi("/me/player/currently-playing", accessToken);

  if (currentTrackResponse.status === 204) {
    const recentlyPlayedResponse = await fetchSpotifyApi("/me/player/recently-played?limit=1", accessToken);

    if (isSpotifyAuthorizationFailure(recentlyPlayedResponse)) {
      return createDisconnectedSpotifyPayload(
        "Spotify rejected the user token. Update SPOTIFY_ACCESS_TOKEN or SPOTIFY_REFRESH_TOKEN.",
      );
    }

    if (!recentlyPlayedResponse.ok) {
      return {
        ...createConnectedIdleSpotifyPayload(),
        error: "Spotify recently-played lookup failed.",
      };
    }

    const recentlyPlayed = (await recentlyPlayedResponse.json()) as SpotifyRecentlyPlayedResponse;
    return createRecentTrackPayload(recentlyPlayed) ?? createConnectedIdleSpotifyPayload();
  }

  if (isSpotifyAuthorizationFailure(currentTrackResponse)) {
    return createDisconnectedSpotifyPayload(
      "Spotify rejected the user token. Update SPOTIFY_ACCESS_TOKEN or SPOTIFY_REFRESH_TOKEN.",
    );
  }

  if (!currentTrackResponse.ok) {
    return {
      ...createConnectedIdleSpotifyPayload(),
      error: "Spotify currently-playing lookup failed.",
    };
  }

  const playback = (await currentTrackResponse.json()) as SpotifyCurrentlyPlayingResponse;
  const currentPayload = createCurrentTrackPayload(playback);

  if (currentPayload) {
    return currentPayload;
  }

  const recentlyPlayedResponse = await fetchSpotifyApi("/me/player/recently-played?limit=1", accessToken);

  if (isSpotifyAuthorizationFailure(recentlyPlayedResponse)) {
    return createDisconnectedSpotifyPayload(
      "Spotify rejected the user token. Update SPOTIFY_ACCESS_TOKEN or SPOTIFY_REFRESH_TOKEN.",
    );
  }

  if (!recentlyPlayedResponse.ok) {
    return {
      ...createConnectedIdleSpotifyPayload(),
      error: "Spotify recently-played lookup failed.",
    };
  }

  const recentlyPlayed = (await recentlyPlayedResponse.json()) as SpotifyRecentlyPlayedResponse;
  return createRecentTrackPayload(recentlyPlayed) ?? createConnectedIdleSpotifyPayload();
}
