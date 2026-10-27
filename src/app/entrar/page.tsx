import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { resetPassword, signIn } from "@/lib/actions/auth";

export const metadata: Metadata = { title: "Entrar" };

type Props = { searchParams: Promise<{ voltar?: string; senha?: string }> };

export default async function SignInPage({ searchParams }: Props) {
  const { voltar, senha } = await searchParams;
  const forgot = senha === "esqueci";

  return (
    <div className="paper">
      <section className="block wrap auth">
        <div className="auth-card">
          <div className="eyebrow">Sua conta</div>
          <h1>{forgot ? "Esqueci minha senha" : "Entrar"}</h1>
          {forgot ? (
            <>
              <p className="auth-sub">Escreva o e-mail da sua conta e enviaremos um link para criar uma nova senha.</p>
              <AuthForm action={resetPassword} submit="Enviar link" fields={[{ name: "email", label: "E-mail", type: "email", autoComplete: "email" }]} />
              <p className="auth-foot"><Link className="link" href="/entrar">Voltar para o login</Link></p>
            </>
          ) : (
            <>
              <AuthForm
                action={signIn}
                submit="Entrar"
                hidden={{ voltar: voltar ?? "/conta" }}
                fields={[
                  { name: "email", label: "E-mail", type: "email", autoComplete: "email" },
                  { name: "senha", label: "Senha", type: "password", autoComplete: "current-password" },
                ]}
              />
              <p className="auth-foot">
                <Link className="link" href="/entrar?senha=esqueci">Esqueci minha senha</Link>
                <span>Não tem conta? <Link className="link" href="/cadastro">Criar conta</Link></span>
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
