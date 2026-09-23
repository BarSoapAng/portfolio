import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@lib/supabase";

type RouteParams = { params: Promise<{ slug: string }> };

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { slug } = await params;
  const visitorId = req.nextUrl.searchParams.get("visitor_id");

  const { count } = await supabase
    .from("post_likes")
    .select("*", { count: "exact", head: true })
    .eq("slug", slug);

  let likedByVisitor = false;
  if (visitorId) {
    const { data } = await supabase
      .from("post_likes")
      .select("id")
      .eq("slug", slug)
      .eq("visitor_id", visitorId)
      .maybeSingle();
    likedByVisitor = !!data;
  }

  return NextResponse.json({ count, likedByVisitor });
}

export async function POST(req: Request, { params }: RouteParams) {
  const { slug } = await params;
  const { visitor_id } = await req.json();

  const { data: existing, error: lookupError } = await supabase
    .from("post_likes")
    .select("id")
    .eq("slug", slug)
    .eq("visitor_id", visitor_id)
    .maybeSingle();

  if (lookupError) {
    return NextResponse.json({ error: "Failed to update like" }, { status: 500 });
  }

  const { error: mutationError } = existing
    ? await supabase.from("post_likes").delete().eq("id", existing.id)
    : await supabase.from("post_likes").insert({ slug, visitor_id });

  if (mutationError) {
    return NextResponse.json({ error: "Failed to update like" }, { status: 500 });
  }

  const { count } = await supabase
    .from("post_likes")
    .select("*", { count: "exact", head: true })
    .eq("slug", slug);

  const likedByVisitor = !existing;

  return NextResponse.json({ count, likedByVisitor });
}
