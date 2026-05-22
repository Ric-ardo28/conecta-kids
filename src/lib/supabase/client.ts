import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

let browserClient:
  | ReturnType<typeof createBrowserClient<Database>>
  | undefined;

export function createSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL e Anon Key precisam estar configuradas.");
  }

  if (!browserClient) {
    browserClient = createBrowserClient<Database>(
      supabaseUrl,
      supabaseAnonKey,
    );
  }

  return browserClient;
}
