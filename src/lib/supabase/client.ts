import { createBrowserClient } from "@supabase/ssr";

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

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          role: "crianca" | "responsavel" | "professor";
          points: number;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          role?: "crianca" | "responsavel" | "professor";
          points?: number;
          created_at?: string;
        };
        Update: {
          full_name?: string | null;
          role?: "crianca" | "responsavel" | "professor";
          points?: number;
        };
      };
      achievements: {
        Row: {
          id: string;
          title: string;
          description: string;
          icon: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          icon: string;
          created_at?: string;
        };
        Update: {
          title?: string;
          description?: string;
          icon?: string;
        };
      };
    };
  };
};
