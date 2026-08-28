import "server-only";

import workEntries from "../../content/work.json";
import type { WorkSummary } from "./work-shared";

export function getAllWorkEntries(): WorkSummary[] {
  return workEntries;
}
