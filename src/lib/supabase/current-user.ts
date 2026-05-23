import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "./server";
import { hasSupabaseServerConfig } from "./config";
import type { Database } from "./types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

function getFallbackName(user: { email?: string; user_metadata?: Record<string, unknown> }) {
  const metadataName =
    typeof user.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name
      : typeof user.user_metadata?.name === "string"
        ? user.user_metadata.name
        : "";

  return metadataName || user.email?.split("@")[0] || "Explorador digital";
}

export async function getCurrentUserProfile() {
  if (!hasSupabaseServerConfig()) {
    redirect("/login?error=supabase_config");
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    throw new Error("Não foi possível carregar o perfil do usuário.");
  }

  if (profile) {
    return { supabase, user, profile: profile as Profile };
  }

  const { data: createdProfile, error: createError } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      full_name: getFallbackName(user),
      avatar_url:
        typeof user.user_metadata?.avatar_url === "string"
          ? user.user_metadata.avatar_url
          : null,
    })
    .select("*")
    .single();

  if (createError || !createdProfile) {
    throw new Error("Não foi possível criar o perfil do usuário.");
  }

  return { supabase, user, profile: createdProfile as Profile };
}
