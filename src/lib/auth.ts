import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "./supabase/server";

export type Profile = {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  is_admin: boolean;
  created_at: string;
  last_seen_at: string | null;
};

// Retorna o cliente logado e o perfil dele, ou null para visitantes.
export async function getSession() {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single<Profile>();
  if (!profile) return null;

  // Registra o último acesso no máximo uma vez por hora.
  const lastSeen = profile.last_seen_at ? new Date(profile.last_seen_at).getTime() : 0;
  if (Date.now() - lastSeen > 60 * 60 * 1000) {
    await supabase.from("profiles").update({ last_seen_at: new Date().toISOString() }).eq("id", user.id);
  }

  return { user, profile, supabase };
}

// Use no topo das páginas do painel: só o dono da loja passa.
export async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/entrar?voltar=/painel");
  if (!session.profile.is_admin) redirect("/");
  return session;
}
