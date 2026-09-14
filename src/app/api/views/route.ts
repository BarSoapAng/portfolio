import { NextResponse } from "next/server";
import { supabase } from "@lib/supabase";

export async function POST() {
  await supabase.from("page_views").insert({ page: "/" });

  const { count } = await supabase
    .from("page_views")
    .select("*", { count: "exact", head: true });

  return NextResponse.json({ count });
}

export async function GET() {
  const { count } = await supabase
    .from("page_views")
    .select("*", { count: "exact", head: true });

  return NextResponse.json({ count });
}
