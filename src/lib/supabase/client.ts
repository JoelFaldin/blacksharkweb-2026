"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import { getEnvironmentVariables } from "./config";
import type { Database } from "./types";

let client: SupabaseClient<Database> | null = null;

export function getSupabaseBrowserClient(): SupabaseClient<Database> {
  if (client) return client;

  const { supabaseUrl, supabaseAnonKey } = getEnvironmentVariables();
  client = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);

  return client;
}
