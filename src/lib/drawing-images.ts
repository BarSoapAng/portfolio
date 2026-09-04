import "server-only";

import { supabase } from "@lib/supabase";

export function getDrawingImageUrl(storedImage: string) {
  if (storedImage.startsWith("data:")) return storedImage;

  return supabase.storage.from("drawings").getPublicUrl(storedImage).data.publicUrl;
}

export function isDrawingStoragePath(storedImage: string) {
  return !storedImage.startsWith("data:");
}
