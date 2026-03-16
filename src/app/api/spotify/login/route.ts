import { randomUUID } from "node:crypto";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  SPOTIFY_STATE_COOKIE,
  buildSpotifyAuthorizeUrl,
  hasSpotifyCredentials,
} from "../../../../lib/spotify";

export async function GET(request: Request) {
  const redirectUrl = new URL("/home", request.url);

  if (!hasSpotifyCredentials()) {
    return NextResponse.redirect(redirectUrl);
  }

  const cookieStore = await cookies();
  const state = randomUUID();
  const authorizeUrl = buildSpotifyAuthorizeUrl(state);

  if (!authorizeUrl) {
    return NextResponse.redirect(redirectUrl);
  }

  cookieStore.set(SPOTIFY_STATE_COOKIE, state, {
    httpOnly: true,
    maxAge: 60 * 10,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return NextResponse.redirect(authorizeUrl);
}
