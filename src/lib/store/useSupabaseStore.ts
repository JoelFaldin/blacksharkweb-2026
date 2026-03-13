// Store de supabase para gestionar instancias del cliente de Supabase

import type { SupabaseClient } from "@supabase/supabase-js";
import { create } from "zustand";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";

interface SupabaseStore {
  supabase: SupabaseClient;
}

export const useSupabaseStore = create<SupabaseStore>(() => ({
  supabase: getSupabaseBrowserClient(),
}));
