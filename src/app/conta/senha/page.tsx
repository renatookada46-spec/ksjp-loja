import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { updatePassword } from "@/lib/actions/auth";

export const metadata: Metadata = { title: "Nova senha" };

export default function PasswordPage() {
  return (
    <div className="paper">
      <section className="block wrap auth">
        <div className="auth-card">
          <div className="eyebrow">Sua conta</div>
          <h1>Nova senha</h1>
          <AuthForm
            action={updatePassword}
            submit="Salvar nova senha"
            fields={[{ name: "senha", label: "Nova senha", type: "password", autoComplete: "new-password", hint: "Pelo menos 8 caracteres." }]}
          />
          <p className="auth-foot"><Link className="link" href="/conta">Voltar para minha conta</Link></p>
        </div>
      </section>
    </div>
  );
}
