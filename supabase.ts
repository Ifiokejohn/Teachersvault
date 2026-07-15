import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  // Placeholder guard rail — fill these in .env.local before running the app.
  // See .env.example for the full list of required keys.
  console.warn(
    "[teachers-vault] Supabase env vars are missing. Copy .env.example to .env.local and fill in your project keys."
  );
}

/**
 * Browser/client-side Supabase client. Safe to import in client components.
 * Uses the public anon key — never put the service role key here.
 */
export const supabase: SupabaseClient = createClient(
  supabaseUrl ?? "",
  supabaseAnonKey ?? ""
);

/**
 * Table names, kept in one place so a rename only touches this file.
 */
export const TABLES = {
  users: "users",
  resources: "resources",
  purchases: "purchases",
  reviews: "reviews",
} as const;
