import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";

export const metadata: Metadata = { title: "Criar conta" };

export default function SignUpPage() {
  return (
    <div className="paper">
      <section className="block wrap auth">
        <div className="auth-card">
          <div className="eyebrow">Bem-vinda à KSJP</div>
          <h1>Criar conta</h1>
          <p className="auth-sub">Com a conta você faz pedidos e acompanha sua caixa do Japão até a sua casa.</p>
          <AuthForm
            action={signUp}
            submit="Criar minha conta"
            fields={[
              { name: "nome", label: "Nome completo", autoComplete: "name" },
              { name: "email", label: "E-mail", type: "email", autoComplete: "email" },
              { name: "telefone", label: "Celular com DDD", type: "tel", autoComplete: "tel", placeholder: "(11) 98888-7777" },
              { name: "senha", label: "Senha", type: "password", autoComplete: "new-password", hint: "Pelo menos 8 caracteres." },
            ]}
          >
            <label className="check" htmlFor="f-aceite">
              <input id="f-aceite" name="aceite" type="checkbox" />
              <span>
                Li e aceito as <Link href="/regras">regras de compra</Link> e a{" "}
                <Link href="/privacidade">política de privacidade</Link>.
              </span>
            </label>
          </AuthForm>
          <p className="auth-foot">
            Já tem conta? <Link className="link" href="/entrar">Entrar</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
