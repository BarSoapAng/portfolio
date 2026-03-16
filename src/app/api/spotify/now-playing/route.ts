import { NextResponse } from "next/server";

import { getSpotifyNowPlaying } from "../../../../lib/spotify";

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
  return createJsonResponse(await getSpotifyNowPlaying());
}
