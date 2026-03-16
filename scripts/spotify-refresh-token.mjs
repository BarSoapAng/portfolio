import { Buffer } from "node:buffer";
import { randomUUID } from "node:crypto";
import { createServer } from "node:http";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { createInterface } from "node:readline/promises";
import process from "node:process";

const SPOTIFY_AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const DEFAULT_REDIRECT_URI = "http://127.0.0.1:3010/callback";
const SPOTIFY_SCOPES = [
  "user-read-currently-playing",
  "user-read-recently-played",
];
const CALLBACK_TIMEOUT_MS = 5 * 60 * 1000;

function parseArgs(argv) {
  const args = {
    redirectUri: DEFAULT_REDIRECT_URI,
    writeEnv: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--write-env") {
      args.writeEnv = true;
      continue;
    }

    if (arg === "--redirect-uri") {
      const redirectUri = argv[index + 1];

      if (!redirectUri) {
        throw new Error("Missing value for --redirect-uri.");
      }

      args.redirectUri = redirectUri;
      index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return args;
}

function stripWrappingQuotes(value) {
  if (
    (value.startsWith("\"") && value.endsWith("\"")) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function parseEnvFile(filePath) {
  const values = {};
  const fileContents = readFileSync(filePath, "utf8");

  for (const rawLine of fileContents.split(/\r?\n/u)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = stripWrappingQuotes(line.slice(separatorIndex + 1).trim());

    values[key] = value;
  }

  return values;
}

function loadEnv() {
  const env = {};
  const envFiles = [".env", ".env.local"];

  for (const envFile of envFiles) {
    const envPath = resolve(process.cwd(), envFile);

    if (!existsSync(envPath)) {
      continue;
    }

    Object.assign(env, parseEnvFile(envPath));
  }

  return {
    ...env,
    ...process.env,
  };
}

function createAuthorizationHeader(clientId, clientSecret) {
  return `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`;
}

function buildAuthorizeUrl(clientId, redirectUri, state) {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: SPOTIFY_SCOPES.join(" "),
    show_dialog: "true",
    state,
  });

  return `${SPOTIFY_AUTHORIZE_URL}?${params.toString()}`;
}

async function exchangeCodeForToken({ clientId, clientSecret, code, redirectUri }) {
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    body: new URLSearchParams({
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    }),
    headers: {
      Authorization: createAuthorizationHeader(clientId, clientSecret),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Spotify token exchange failed (${response.status}): ${errorText}`);
  }

  return response.json();
}

function shouldListenLocally(redirectUri) {
  const url = new URL(redirectUri);
  return (
    url.protocol === "http:" &&
    (url.hostname === "127.0.0.1" || url.hostname === "localhost")
  );
}

async function waitForCallback(redirectUri, expectedState) {
  if (shouldListenLocally(redirectUri)) {
    return waitForLocalCallback(redirectUri, expectedState);
  }

  return waitForPastedCallback(expectedState);
}

async function waitForLocalCallback(redirectUri, expectedState) {
  const redirectUrl = new URL(redirectUri);
  const timeoutSignal = AbortSignal.timeout(CALLBACK_TIMEOUT_MS);

  return new Promise((resolveCallback, rejectCallback) => {
    const server = createServer((request, response) => {
      try {
        const requestUrl = new URL(request.url ?? "/", redirectUri);

        if (requestUrl.pathname !== redirectUrl.pathname) {
          response.statusCode = 404;
          response.end("Not found.");
          return;
        }

        const error = requestUrl.searchParams.get("error");
        const code = requestUrl.searchParams.get("code");
        const returnedState = requestUrl.searchParams.get("state");

        if (error) {
          response.statusCode = 400;
          response.end(`Spotify returned an error: ${error}`);
          rejectCallback(new Error(`Spotify returned an error: ${error}`));
          void server.close();
          return;
        }

        if (!code || returnedState !== expectedState) {
          response.statusCode = 400;
          response.end("Spotify callback state mismatch.");
          rejectCallback(new Error("Spotify callback state mismatch."));
          void server.close();
          return;
        }

        response.statusCode = 200;
        response.setHeader("Content-Type", "text/plain; charset=utf-8");
        response.end("Spotify authorization received. Return to the terminal.");
        resolveCallback(code);
        void server.close();
      } catch (error) {
        rejectCallback(error);
        void server.close();
      }
    });

    timeoutSignal.addEventListener("abort", () => {
      rejectCallback(
        new Error("Timed out waiting for the Spotify callback. Re-run the script and try again."),
      );
      void server.close();
    });

    server.listen(Number(redirectUrl.port || "80"), redirectUrl.hostname, () => {
      console.log(`Waiting for Spotify callback on ${redirectUri}`);
    });

    server.on("error", (error) => {
      rejectCallback(
        new Error(
          `Could not listen on ${redirectUri}. Pass --redirect-uri with an available localhost URL. ${error.message}`,
        ),
      );
    });
  });
}

async function waitForPastedCallback(expectedState) {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const callbackUrl = await readline.question(
      "Paste the full callback URL after approving the Spotify app: ",
    );
    const parsedUrl = new URL(callbackUrl.trim());
    const error = parsedUrl.searchParams.get("error");
    const code = parsedUrl.searchParams.get("code");
    const returnedState = parsedUrl.searchParams.get("state");

    if (error) {
      throw new Error(`Spotify returned an error: ${error}`);
    }

    if (!code || returnedState !== expectedState) {
      throw new Error("Spotify callback state mismatch.");
    }

    return code;
  } finally {
    readline.close();
  }
}

function updateEnvFile(filePath, key, value) {
  const envPath = resolve(process.cwd(), filePath);
  const line = `${key}=${value}`;

  if (!existsSync(envPath)) {
    writeFileSync(envPath, `${line}\n`, "utf8");
    return;
  }

  const currentContents = readFileSync(envPath, "utf8");
  const lines = currentContents.split(/\r?\n/u);
  let replaced = false;

  const nextLines = lines.map((currentLine) => {
    if (currentLine.startsWith(`${key}=`)) {
      replaced = true;
      return line;
    }

    return currentLine;
  });

  if (!replaced) {
    if (nextLines.length > 0 && nextLines[nextLines.length - 1] !== "") {
      nextLines.push(line);
    } else if (nextLines.length === 0) {
      nextLines.push(line);
    } else {
      nextLines[nextLines.length - 1] = line;
      nextLines.push("");
    }
  }

  const normalized = nextLines.filter((entry, index, all) => {
    return !(index === all.length - 1 && entry === "");
  });

  writeFileSync(envPath, `${normalized.join("\n")}\n`, "utf8");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const env = loadEnv();
  const clientId = env.SPOTIFY_CLIENT_ID?.trim();
  const clientSecret = env.SPOTIFY_CLIENT_SECRET?.trim();

  if (!clientId || !clientSecret) {
    throw new Error("SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must be set in .env or .env.local.");
  }

  const state = randomUUID();
  const authorizeUrl = buildAuthorizeUrl(clientId, args.redirectUri, state);

  console.log("Open this URL in your browser and approve Spotify access:");
  console.log(authorizeUrl);
  console.log("");
  console.log(
    "If Spotify rejects the redirect URI, add it to your Spotify app settings and run the script again:",
  );
  console.log(args.redirectUri);
  console.log("");

  const code = await waitForCallback(args.redirectUri, state);
  const token = await exchangeCodeForToken({
    clientId,
    clientSecret,
    code,
    redirectUri: args.redirectUri,
  });

  if (!token.refresh_token) {
    throw new Error(
      "Spotify did not return a refresh token. Remove the app from your Spotify connected apps and run the script again.",
    );
  }

  console.log("");
  console.log("Add this to your local env:");
  console.log(`SPOTIFY_REFRESH_TOKEN=${token.refresh_token}`);

  if (args.writeEnv) {
    updateEnvFile(".env.local", "SPOTIFY_REFRESH_TOKEN", token.refresh_token);
    console.log("");
    console.log("Updated .env.local with SPOTIFY_REFRESH_TOKEN.");
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
