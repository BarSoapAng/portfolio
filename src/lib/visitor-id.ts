"use client";

import { v4 as uuidv4 } from "uuid";

const COOKIE_NAME = "visitor_id";
const MAX_AGE_DAYS = 365;

export function getVisitorId(): string {
  if (typeof document === "undefined") return "";

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));

  if (match) {
    return match.split("=")[1];
  }

  const id = uuidv4();
  document.cookie = `${COOKIE_NAME}=${id}; path=/; max-age=${MAX_AGE_DAYS * 86400}; SameSite=Lax`;
  return id;
}
