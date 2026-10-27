"use server";

import { redirect } from "next/navigation";
import { site } from "@/lib/site";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type FormState = { error?: string; ok?: string } | undefined;

const notReady = { error: "O cadastro ainda está sendo configurado. Tente novamente em breve." };

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

// Aceita celular brasileiro com DDD, com ou sem o 55 na frente.
function normalizePhone(raw: string) {
  let digits = onlyDigits(raw);
  if (digits.length === 13 && digits.startsWith("55")) digits = digits.slice(2);
  return digits.length === 10 || digits.length === 11 ? `55${digits}` : null;
}

function safeRedirect(path: FormDataEntryValue | null) {
  const value = typeof path === "string" ? path : "";
  return value.startsWith("/") && !value.startsWith("//") ? value : "/conta";
}

export async function signUp(_: FormState, form: FormData): Promise<FormState> {
  if (!isSupabaseConfigured) return notReady;
  const fullName = String(form.get("nome") ?? "").trim();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("senha") ?? "");
  const phone = normalizePhone(String(form.get("telefone") ?? ""));
  const accepted = form.get("aceite") === "on";

  if (fullName.length < 3) return { error: "Escreva seu nome completo." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: "Confira o e-mail." };
  if (!phone) return { error: "Escreva o celular com DDD, por exemplo (11) 98888-7777." };
  if (password.length < 8) return { error: "A senha precisa ter pelo menos 8 caracteres." };
  if (!accepted) return { error: "Para criar a conta, aceite as regras de compra e a política de privacidade." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, phone },
      emailRedirectTo: `${site.url}/auth/callback`,
    },
  });
  if (error) {
    if (error.message.toLowerCase().includes("registered")) return { error: "Já existe uma conta com esse e-mail. Faça login." };
    return { error: "Não foi possível criar a conta agora. Tente de novo em alguns minutos." };
  }
  if (!data.session) {
    return { ok: `Conta criada! Enviamos um link de confirmação para ${email}. Abra o e-mail e clique no link para entrar.` };
  }
  redirect("/conta");
}

export async function signIn(_: FormState, form: FormData): Promise<FormState> {
  if (!isSupabaseConfigured) return notReady;
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("senha") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    if (error.message.toLowerCase().includes("confirm")) return { error: "Confirme seu e-mail antes de entrar. Procure o link na sua caixa de entrada." };
    return { error: "E-mail ou senha incorretos." };
  }
  redirect(safeRedirect(form.get("voltar")));
}

export async function resetPassword(_: FormState, form: FormData): Promise<FormState> {
  if (!isSupabaseConfigured) return notReady;
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  if (!email) return { error: "Escreva seu e-mail para receber o link." };
  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${site.url}/auth/callback?next=/conta/senha` });
  return { ok: "Se existir uma conta com esse e-mail, você vai receber um link para criar uma nova senha." };
}

export async function updatePassword(_: FormState, form: FormData): Promise<FormState> {
  const password = String(form.get("senha") ?? "");
  if (password.length < 8) return { error: "A senha precisa ter pelo menos 8 caracteres." };
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: "Não foi possível trocar a senha. Peça um novo link." };
  return { ok: "Senha alterada." };
}
