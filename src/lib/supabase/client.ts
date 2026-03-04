"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import { getEnvironmentVariables } from "./server";
import type { Database } from "./types";

let client: SupabaseClient<Database> | null = null;

export async function getSupabaseBrowserClient(): Promise<SupabaseClient<Database>> {
  if (client) return client;

  const { supabaseUrl, supabaseAnonKey } = await getEnvironmentVariables();
  client = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);

  return client;
}
