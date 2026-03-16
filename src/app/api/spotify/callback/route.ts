import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  SPOTIFY_STATE_COOKIE,
  exchangeSpotifyCode,
  hasSpotifyCredentials,
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

  if (!hasSpotifyCredentials() || error || !code || !returnedState || returnedState !== storedState) {
    return NextResponse.redirect(redirectUrl);
  }

  try {
    const tokens = await exchangeSpotifyCode(code);

    if (!tokens.refresh_token) {
      return new NextResponse(
        "Spotify did not return a refresh token. Remove any existing app authorization in Spotify, then try /api/spotify/login again.",
        {
          headers: {
            "Cache-Control": "no-store",
            "Content-Type": "text/plain; charset=utf-8",
          },
        },
      );
    }

    return new NextResponse(
      [
        "Add this line to your .env or .env.local file, then restart the app:",
        "",
        `SPOTIFY_REFRESH_TOKEN=${tokens.refresh_token}`,
        "",
        "After that, the Vinyl player will use your Spotify account server-side for all visitors.",
      ].join("\n"),
      {
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "text/plain; charset=utf-8",
        },
      },
    );
  } catch {
    return NextResponse.redirect(redirectUrl);
  }
}
