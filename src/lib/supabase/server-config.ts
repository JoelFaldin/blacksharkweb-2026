import "server-only";

export function getServerEnvironmentVariables() {
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  return { supabaseServiceRoleKey };
}
