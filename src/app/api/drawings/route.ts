import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@lib/supabase";
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

  return NextResponse.json({ drawings });
}

export async function POST(request: NextRequest) {
  const { visitor_id, name, image_data } = await request.json();

  if (!visitor_id || !image_data) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (image_data.length > 700_000) {
    return NextResponse.json({ error: "Image too large" }, { status: 400 });
  }

  const trimmedName = typeof name === "string" ? name.trim().slice(0, 40) : "";
  const drawingName = trimmedName || "Untitled";

  if (filter.isProfane(drawingName)) {
    return NextResponse.json({ error: "Name contains inappropriate language" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("drawings")
    .insert({
      visitor_id,
      name: drawingName,
      image_data,
      is_published: true,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id: data.id });
}
