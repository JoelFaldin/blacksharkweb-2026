"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import type { Database } from "@/types/supabase";
import { getEnvironmentVariables } from "./config";

export async function createSupabaseServerClient() {
  const { supabaseUrl, supabaseAnonKey } = getEnvironmentVariables();

  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
    },
  });
}
