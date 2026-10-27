"use client";

import { useActionState } from "react";
import type { FormState } from "@/lib/actions/auth";

type Field = { name: string; label: string; type?: string; autoComplete?: string; placeholder?: string; hint?: string };

// Formulário simples para cadastro, login e senha, com mensagens de erro e sucesso.
export function AuthForm({
  action,
  fields,
  submit,
  hidden,
  children,
}: {
  action: (state: FormState, form: FormData) => Promise<FormState>;
  fields: Field[];
  submit: string;
  hidden?: Record<string, string>;
  children?: React.ReactNode;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  if (state?.ok && !state.error && submit !== "Salvar nova senha") {
    return <p className="form-ok" role="status">{state.ok}</p>;
  }

  return (
    <form action={formAction} className="form">
      {hidden && Object.entries(hidden).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}
      {fields.map((f) => (
        <label key={f.name} className="field" htmlFor={`f-${f.name}`}>
          <span>{f.label}</span>
          <input id={`f-${f.name}`} name={f.name} type={f.type ?? "text"} autoComplete={f.autoComplete} placeholder={f.placeholder} required />
          {f.hint && <small>{f.hint}</small>}
        </label>
      ))}
      {children}
      {state?.error && <p className="form-error" role="alert">{state.error}</p>}
      {state?.ok && <p className="form-ok" role="status">{state.ok}</p>}
      <button className="btn btn-red" type="submit" disabled={pending}>
        {pending ? "Aguarde..." : submit}
      </button>
    </form>
  );
}
