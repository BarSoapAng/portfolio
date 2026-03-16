import { Buffer } from "node:buffer";

const SPOTIFY_AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";

const ACCESS_TOKEN_COOKIE = "spotify_access_token";
const ACCESS_TOKEN_EXPIRES_AT_COOKIE = "spotify_access_token_expires_at";
const REFRESH_TOKEN_COOKIE = "spotify_refresh_token";
export const SPOTIFY_STATE_COOKIE = "spotify_oauth_state";

const SPOTIFY_SCOPES = [
  "user-read-currently-playing",
  "user-read-recently-played",
] as const;

type CookieValue = {
  value: string;
};

type ReadableCookieStore = {
  get(name: string): CookieValue | undefined;
};

type WritableCookieStore = ReadableCookieStore & {
  delete(name: string): void;
  set(
    name: string,
    value: string,
    options?: {
      expires?: Date;
      httpOnly?: boolean;
      maxAge?: number;
      path?: string;
      sameSite?: "lax" | "strict" | "none";
      secure?: boolean;
    },
  ): void;
};

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
  isPlaying: boolean;
  jamUrl: string | null;
  loginUrl: string | null;
  openUrl: string | null;
  playedAt: string | null;
  progressMs: number | null;
  source: "currently-playing" | "recently-played" | null;
  track: SpotifyTrackSummary | null;
};

export type SpotifySession = {
  accessToken: string | null;
  expiresAt: number | null;
  refreshToken: string | null;
};

type SpotifyConfig = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
};

const COOKIE_OPTIONS = {
  httpOnly: true,
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

function getSpotifyConfig(): SpotifyConfig | null {
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

export function isSpotifyConfigured(): boolean {
  return getSpotifyConfig() !== null;
}

export function getSpotifyLoginPath(): string {
  return "/api/spotify/login";
}

export function buildSpotifyAuthorizeUrl(state: string): string | null {
  const config = getSpotifyConfig();

  if (!config) {
    return null;
  }

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: "code",
    scope: SPOTIFY_SCOPES.join(" "),
    state,
  });

  return `${SPOTIFY_AUTHORIZE_URL}?${params.toString()}`;
}

export function readSpotifySession(cookieStore: ReadableCookieStore): SpotifySession {
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
  const expiresAtValue = cookieStore.get(ACCESS_TOKEN_EXPIRES_AT_COOKIE)?.value ?? null;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value ?? null;

  return {
    accessToken,
    expiresAt: expiresAtValue ? Number(expiresAtValue) : null,
    refreshToken,
  };
}

export function writeSpotifySession(
  cookieStore: WritableCookieStore,
  token: SpotifyTokenResponse,
  existingRefreshToken?: string | null,
): SpotifySession {
  const refreshToken = token.refresh_token ?? existingRefreshToken ?? null;
  const expiresAt = Date.now() + token.expires_in * 1000 - 60_000;

  cookieStore.set(ACCESS_TOKEN_COOKIE, token.access_token, {
    ...COOKIE_OPTIONS,
    maxAge: token.expires_in,
  });
  cookieStore.set(ACCESS_TOKEN_EXPIRES_AT_COOKIE, String(expiresAt), {
    ...COOKIE_OPTIONS,
    maxAge: token.expires_in,
  });

  if (refreshToken) {
    cookieStore.set(REFRESH_TOKEN_COOKIE, refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 60 * 24 * 180,
    });
  }

  return {
    accessToken: token.access_token,
    expiresAt,
    refreshToken,
  };
}

export function clearSpotifySession(cookieStore: WritableCookieStore): void {
  cookieStore.delete(ACCESS_TOKEN_COOKIE);
  cookieStore.delete(ACCESS_TOKEN_EXPIRES_AT_COOKIE);
  cookieStore.delete(REFRESH_TOKEN_COOKIE);
  cookieStore.delete(SPOTIFY_STATE_COOKIE);
}

function createSpotifyBasicAuthorizationHeader(config: SpotifyConfig): string {
  return `Basic ${Buffer.from(`${config.clientId}:${config.clientSecret}`).toString("base64")}`;
}

async function requestSpotifyTokens(body: URLSearchParams): Promise<SpotifyTokenResponse> {
  const config = getSpotifyConfig();

  if (!config) {
    throw new Error("Spotify is not configured.");
  }

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    body,
    cache: "no-store",
    headers: {
      Authorization: createSpotifyBasicAuthorizationHeader(config),
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
  const config = getSpotifyConfig();

  if (!config) {
    throw new Error("Spotify is not configured.");
  }

  return requestSpotifyTokens(
    new URLSearchParams({
      code,
      grant_type: "authorization_code",
      redirect_uri: config.redirectUri,
    }),
  );
}

export async function refreshSpotifyAccessToken(refreshToken: string): Promise<SpotifyTokenResponse> {
  return requestSpotifyTokens(
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  );
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

export function createDisconnectedSpotifyPayload(): SpotifyNowPlayingPayload {
  const configured = isSpotifyConfigured();

  return {
    configured,
    connected: false,
    isPlaying: false,
    jamUrl: null,
    loginUrl: configured ? getSpotifyLoginPath() : null,
    openUrl: null,
    playedAt: null,
    progressMs: null,
    source: null,
    track: null,
  };
}

export function createConnectedIdleSpotifyPayload(): SpotifyNowPlayingPayload {
  return {
    configured: true,
    connected: true,
    isPlaying: false,
    jamUrl: null,
    loginUrl: getSpotifyLoginPath(),
    openUrl: null,
    playedAt: null,
    progressMs: null,
    source: null,
    track: null,
  };
}

export function createCurrentTrackPayload(
  playback: SpotifyCurrentlyPlayingResponse,
): SpotifyNowPlayingPayload | null {
  if (!playback.item) {
    return null;
  }

  return {
    configured: true,
    connected: true,
    isPlaying: playback.is_playing,
    jamUrl: null,
    loginUrl: getSpotifyLoginPath(),
    openUrl: playback.item.external_urls?.spotify ?? null,
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
    configured: true,
    connected: true,
    isPlaying: false,
    jamUrl: null,
    loginUrl: getSpotifyLoginPath(),
    openUrl: latestTrack.track.external_urls?.spotify ?? null,
    playedAt: latestTrack.played_at,
    progressMs: latestTrack.track.duration_ms,
    source: "recently-played",
    track: toTrackSummary(latestTrack.track),
  };
}
