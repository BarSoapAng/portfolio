import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  SPOTIFY_STATE_COOKIE,
  clearSpotifySession,
  exchangeSpotifyCode,
  isSpotifyConfigured,
  writeSpotifySession,
} from "../../../../lib/spotify";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const redirectUrl = new URL("/home", request.url);
  const code = requestUrl.searchParams.get("code");
  const returnedState = requestUrl.searchParams.get("state");
  const error = requestUrl.searchParams.get("error");
  const cookieStore = await cookies();
  const storedState = cookieStore.get(SPOTIFY_STATE_COOKIE)?.value ?? null;

  cookieStore.delete(SPOTIFY_STATE_COOKIE);

  if (!isSpotifyConfigured() || error || !code || !returnedState || returnedState !== storedState) {
    clearSpotifySession(cookieStore);
    return NextResponse.redirect(redirectUrl);
  }

  try {
    const tokens = await exchangeSpotifyCode(code);
    writeSpotifySession(cookieStore, tokens);
    return NextResponse.redirect(redirectUrl);
  } catch {
    clearSpotifySession(cookieStore);
    return NextResponse.redirect(redirectUrl);
  }
}
