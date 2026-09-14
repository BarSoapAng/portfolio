import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@lib/supabase";
import { getDrawingImageUrl } from "@lib/drawing-images";
import { Filter } from "bad-words";

const filter = new Filter();

export async function GET() {
  const { data: drawings, error } = await supabase
    .from("drawings")
    .select("id, name, image_data, visitor_id, created_at")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    drawings: drawings.map(({ image_data, ...drawing }) => ({
      ...drawing,
      image_url: getDrawingImageUrl(image_data),
    })),
  });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const visitorId = formData.get("visitor_id");
  const name = formData.get("name");
  const image = formData.get("image");

  if (typeof visitorId !== "string" || !visitorId || !image || typeof image === "string") {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (image.size > 500_000) {
    return NextResponse.json({ error: "Image too large" }, { status: 400 });
  }

  const imageBuffer = await image.arrayBuffer();
  const bytes = new Uint8Array(imageBuffer);
  const isWebP =
    bytes.length >= 12 &&
    String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" &&
    String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
  const isPng =
    bytes.length >= 8 &&
    bytes.slice(0, 8).every((byte, index) => byte === [137, 80, 78, 71, 13, 10, 26, 10][index]);

  if (!isWebP && !isPng) {
    return NextResponse.json({ error: "Unsupported image format" }, { status: 400 });
  }

  const trimmedName = typeof name === "string" ? name.trim().slice(0, 40) : "";
  const drawingName = trimmedName || "Untitled";

  if (filter.isProfane(drawingName)) {
    return NextResponse.json({ error: "Name contains inappropriate language" }, { status: 400 });
  }

  const id = randomUUID();
  const imagePath = `${id}.${isWebP ? "webp" : "png"}`;
  const { error: uploadError } = await supabase.storage
    .from("drawings")
    .upload(imagePath, imageBuffer, {
      cacheControl: "31536000",
      contentType: isWebP ? "image/webp" : "image/png",
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { error } = await supabase
    .from("drawings")
    .insert({
      id,
      visitor_id: visitorId,
      name: drawingName,
      image_data: imagePath,
      is_published: true,
    });

  if (error) {
    await supabase.storage.from("drawings").remove([imagePath]);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id });
}
