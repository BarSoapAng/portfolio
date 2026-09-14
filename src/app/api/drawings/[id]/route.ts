import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@lib/supabase";
import { isDrawingStoragePath } from "@lib/drawing-images";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { visitor_id, is_published } = await request.json();

  if (!visitor_id) {
    return NextResponse.json({ error: "Missing visitor_id" }, { status: 400 });
  }

  const { error } = await supabase
    .from("drawings")
    .update({ is_published })
    .eq("id", id)
    .eq("visitor_id", visitor_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { visitor_id } = await request.json();

  if (!visitor_id) {
    return NextResponse.json({ error: "Missing visitor_id" }, { status: 400 });
  }

  const { data: drawing, error } = await supabase
    .from("drawings")
    .delete()
    .eq("id", id)
    .eq("visitor_id", visitor_id)
    .select("image_data")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (drawing && isDrawingStoragePath(drawing.image_data)) {
    const { error: storageError } = await supabase.storage
      .from("drawings")
      .remove([drawing.image_data]);

    if (storageError) console.error("Failed to remove drawing image", storageError);
  }

  return NextResponse.json({ success: true });
}
