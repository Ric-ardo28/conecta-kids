import { NextResponse } from "next/server";
import { hasSupabaseServerConfig } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);

  if (!hasSupabaseServerConfig()) {
    return NextResponse.redirect(new URL("/login", requestUrl.origin), {
      status: 303,
    });
  }

  const supabase = await createSupabaseServerClient();

  await supabase.auth.signOut();

  return NextResponse.redirect(new URL("/login", requestUrl.origin), {
    status: 303,
  });
}
