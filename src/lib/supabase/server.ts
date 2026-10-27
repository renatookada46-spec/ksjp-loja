import { createServerClient } from "@supabase/ssr";
import { createClient as createPlainClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Enquanto o Supabase não estiver configurado, a loja usa o catálogo de exemplo.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Chamado de um Server Component: o proxy já renova a sessão.
        }
      },
    },
  });
}

// Leitura pública (vitrine): sem cookies, para as páginas poderem ficar em cache.
export function createPublicClient() {
  return createPlainClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false } });
}
