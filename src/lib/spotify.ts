import { Buffer } from "node:buffer";

const SPOTIFY_AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";

export const SPOTIFY_STATE_COOKIE = "spotify_oauth_state";

const SPOTIFY_SCOPES = [
  "user-read-currently-playing",
  "user-read-recently-played",
] as const;

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
  redirectUri: string;
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
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI?.trim();

  if (!clientId || !clientSecret || !redirectUri) {
    return null;
  }

  return {
    clientId,
    clientSecret,
    redirectUri,
  };
}

function getSpotifyRefreshToken(): string | null {
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN?.trim();
  return refreshToken || null;
}

export function hasSpotifyCredentials(): boolean {
  return getSpotifyCredentials() !== null;
}

export function hasSpotifyRefreshToken(): boolean {
  return getSpotifyRefreshToken() !== null;
}

export function getSpotifyLoginPath(): string {
  return "/api/spotify/login";
}

export function buildSpotifyAuthorizeUrl(state: string): string | null {
  const credentials = getSpotifyCredentials();

  if (!credentials) {
    return null;
  }

  const params = new URLSearchParams({
    client_id: credentials.clientId,
    redirect_uri: credentials.redirectUri,
    response_type: "code",
    scope: SPOTIFY_SCOPES.join(" "),
    state,
  });

  return `${SPOTIFY_AUTHORIZE_URL}?${params.toString()}`;
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

export async function exchangeSpotifyCode(code: string): Promise<{ accessToken: string; refreshToken: string | null }> {
  const credentials = getSpotifyCredentials();

  if (!credentials) {
    throw new Error("Spotify credentials are missing.");
  }

  const tokenResponse = await fetch(SPOTIFY_TOKEN_URL, {
    body: new URLSearchParams({
      code,
      grant_type: "authorization_code",
      redirect_uri: credentials.redirectUri,
    }),
    cache: "no-store",
    headers: {
      Authorization: createSpotifyBasicAuthorizationHeader(credentials),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });

  if (!tokenResponse.ok) {
    throw new Error(`Spotify authorization request failed with status ${tokenResponse.status}.`);
  }

  const token = (await tokenResponse.json()) as SpotifyTokenResponse & { refresh_token?: string };

  return {
    accessToken: token.access_token,
    refreshToken: token.refresh_token ?? null,
  };
}

async function getSpotifyOwnerAccessToken(): Promise<string | null> {
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

export async function getSpotifyNowPlaying(): Promise<SpotifyNowPlayingPayload> {
  if (!hasSpotifyCredentials()) {
    return createMissingConfigPayload("Missing Spotify app credentials in .env.");
  }

  if (!hasSpotifyRefreshToken()) {
    return createMissingConfigPayload("Missing SPOTIFY_REFRESH_TOKEN in .env.");
  }

  let accessToken: string | null = null;

  try {
    accessToken = await getSpotifyOwnerAccessToken();
  } catch {
    return createMissingConfigPayload("Spotify token refresh failed. Check SPOTIFY_REFRESH_TOKEN.");
  }

  if (!accessToken) {
    return createMissingConfigPayload("Spotify token refresh returned no access token.");
  }

  const currentTrackResponse = await fetchSpotifyApi("/me/player/currently-playing", accessToken);

  if (currentTrackResponse.status === 204) {
    const recentlyPlayedResponse = await fetchSpotifyApi("/me/player/recently-played?limit=1", accessToken);

    if (!recentlyPlayedResponse.ok) {
      return {
        ...createConnectedIdleSpotifyPayload(),
        error: "Spotify recently-played lookup failed.",
      };
    }

    const recentlyPlayed = (await recentlyPlayedResponse.json()) as SpotifyRecentlyPlayedResponse;
    return createRecentTrackPayload(recentlyPlayed) ?? createConnectedIdleSpotifyPayload();
  }

  if (!currentTrackResponse.ok) {
    return createMissingConfigPayload("Spotify currently-playing lookup failed.");
  }

  const playback = (await currentTrackResponse.json()) as SpotifyCurrentlyPlayingResponse;
  const currentPayload = createCurrentTrackPayload(playback);

  if (currentPayload) {
    return currentPayload;
  }

  const recentlyPlayedResponse = await fetchSpotifyApi("/me/player/recently-played?limit=1", accessToken);

  if (!recentlyPlayedResponse.ok) {
    return {
      ...createConnectedIdleSpotifyPayload(),
      error: "Spotify recently-played lookup failed.",
    };
  }

  const recentlyPlayed = (await recentlyPlayedResponse.json()) as SpotifyRecentlyPlayedResponse;
  return createRecentTrackPayload(recentlyPlayed) ?? createConnectedIdleSpotifyPayload();
}
