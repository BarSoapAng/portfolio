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
  expires_in: number;
  refresh_token?: string;
};

type SpotifyTrackObject = {
  album: {
    images?: Array<{
      height?: number | null;
      url: string;
      width?: number | null;
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
  actionLabel: string | null;
  actionUrl: string | null;
  configured: boolean;
  connected: boolean;
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

export function isSpotifyConfigured(): boolean {
  return hasSpotifyCredentials() && getSpotifyRefreshToken() !== null;
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

export async function exchangeSpotifyCode(code: string): Promise<SpotifyTokenResponse> {
  const credentials = getSpotifyCredentials();

  if (!credentials) {
    throw new Error("Spotify credentials are missing.");
  }

  return requestSpotifyTokens(
    new URLSearchParams({
      code,
      grant_type: "authorization_code",
      redirect_uri: credentials.redirectUri,
    }),
  );
}

export async function getSpotifyOwnerAccessToken(): Promise<string | null> {
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

function buildSpotifyApiUrl(path: string): string {
  return `${SPOTIFY_API_BASE_URL}${path}`;
}

export async function fetchSpotifyApi(path: string, accessToken: string): Promise<Response> {
  return fetch(buildSpotifyApiUrl(path), {
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

export function createSetupRequiredSpotifyPayload(): SpotifyNowPlayingPayload {
  const hasCredentials = hasSpotifyCredentials();

  return {
    actionLabel: hasCredentials ? "Finish Setup" : null,
    actionUrl: hasCredentials ? getSpotifyLoginPath() : null,
    configured: false,
    connected: false,
    isPlaying: false,
    playedAt: null,
    progressMs: null,
    source: null,
    track: null,
  };
}

export function createConnectedIdleSpotifyPayload(): SpotifyNowPlayingPayload {
  return {
    actionLabel: null,
    actionUrl: null,
    configured: true,
    connected: true,
    isPlaying: false,
    playedAt: null,
    progressMs: null,
    source: null,
    track: null,
  };
}

function createTrackAction(track: SpotifyTrackObject) {
  const actionUrl = track.external_urls?.spotify ?? null;

  return {
    actionLabel: actionUrl ? "Listen Along" : null,
    actionUrl,
  };
}

export function createCurrentTrackPayload(
  playback: SpotifyCurrentlyPlayingResponse,
): SpotifyNowPlayingPayload | null {
  if (!playback.item) {
    return null;
  }

  return {
    ...createTrackAction(playback.item),
    configured: true,
    connected: true,
    isPlaying: playback.is_playing,
    playedAt: null,
    progressMs: playback.progress_ms,
    source: "currently-playing",
    track: toTrackSummary(playback.item),
  };
}

export function createRecentTrackPayload(
  recentlyPlayed: SpotifyRecentlyPlayedResponse,
): SpotifyNowPlayingPayload | null {
  const latestTrack = recentlyPlayed.items[0];

  if (!latestTrack) {
    return null;
  }

  return {
    ...createTrackAction(latestTrack.track),
    configured: true,
    connected: true,
    isPlaying: false,
    playedAt: latestTrack.played_at,
    progressMs: latestTrack.track.duration_ms,
    source: "recently-played",
    track: toTrackSummary(latestTrack.track),
  };
}
