import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@lib/supabase";

export async function GET(request: NextRequest) {
  const visitorId = request.nextUrl.searchParams.get("visitor_id");

  if (!visitorId) {
    return NextResponse.json({ error: "Missing visitor_id" }, { status: 400 });
  }

  const { data: drawings, error } = await supabase
    .from("drawings")
    .select("id, name, image_data, is_published, created_at")
    .eq("visitor_id", visitorId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ drawings });
}
