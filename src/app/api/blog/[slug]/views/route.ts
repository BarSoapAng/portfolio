import { NextResponse } from "next/server";
import { supabase } from "@lib/supabase";

type RouteParams = { params: Promise<{ slug: string }> };

export async function POST(_req: Request, { params }: RouteParams) {
  const { slug } = await params;
  await supabase.from("post_views").insert({ slug });

  const { count } = await supabase
    .from("post_views")
    .select("*", { count: "exact", head: true })
    .eq("slug", slug);

  return NextResponse.json({ count });
}

export async function GET(_req: Request, { params }: RouteParams) {
  const { slug } = await params;

  const { count } = await supabase
    .from("post_views")
    .select("*", { count: "exact", head: true })
    .eq("slug", slug);

  return NextResponse.json({ count });
}
