"use client";

// Assistente virtual: botão fixo no canto e janela de conversa.
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { SakuraPetal } from "@/components/SakuraPetal";
import { site } from "@/lib/site";

type Message = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "ksjp-assistente";
const suggestions = [
  "Como funciona o pagamento?",
  "Qual protetor solar para pele oleosa?",
  "Quanto tempo demora a entrega?",
  "Quem paga a taxa dos Correios?",
];

// Mostra links internos [texto](/caminho) e **negrito**. Todo o resto vira texto simples.
function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\((\/[^)\s]*)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[1]) {
      parts.push(
        <Link key={match.index} className="link" href={match[2]}>
          {match[1]}
        </Link>,
      );
    } else {
      parts.push(<strong key={match.index}>{match[3]}</strong>);
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.map((part, i) => <Fragment key={i}>{part}</Fragment>);
}

export function Assistant() {
  const [open, setOpen] = useState(false);
  // A conversa fica guardada só nesta aba, para não sumir ao trocar de página.
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]");
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(question: string) {
    const content = question.trim();
    if (!content || busy) return;
    const history: Message[] = [...messages, { role: "user", content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);

    const write = (reply: string) =>
      setMessages((current) => [...current.slice(0, -1), { role: "assistant", content: reply }]);

    try {
      const response = await fetch("/api/assistente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!response.body) throw new Error("sem resposta");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let reply = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        write(reply);
      }
      if (!reply) write("Não consegui responder agora. Tente de novo em instantes.");
    } catch {
      write("Sem conexão no momento. Tente de novo em instantes.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className={`ai-launch${open ? " is-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="assistente"
      >
        <SakuraPetal />
        <span>{open ? "Fechar assistente" : "Assistente virtual"}</span>
      </button>

      {open && (
        <section id="assistente" className="ai-panel" role="dialog" aria-label={`Assistente virtual ${site.name}`}>
          <header className="ai-head">
            <div>
              <b>Assistente {site.name}</b>
              <span>Tira dúvidas sobre produtos e regras de compra</span>
            </div>
            <button type="button" className="ai-close" onClick={() => setOpen(false)} aria-label="Fechar">
              ×
            </button>
          </header>

          <div className="ai-list" ref={listRef} aria-live="polite">
            <div className="ai-msg assistant">
              Olá! Sou a assistente virtual da {site.name}. Posso ajudar a escolher produtos, explicar como usar e
              contar como funcionam o pagamento e o envio. O que você quer saber?
            </div>
            {messages.map((m, i) => (
              <div key={i} className={`ai-msg ${m.role}`}>
                {m.content ? <RichText text={m.content} /> : <span className="ai-typing" aria-label="Escrevendo" />}
              </div>
            ))}
            {messages.length === 0 && (
              <div className="ai-chips">
                {suggestions.map((s) => (
                  <button key={s} type="button" onClick={() => send(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="ai-form"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              maxLength={1500}
              placeholder="Escreva sua dúvida"
              aria-label="Sua dúvida"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
            />
            <button type="submit" className="btn btn-red" disabled={busy || !input.trim()}>
              Enviar
            </button>
          </form>
          <p className="ai-foot">Respostas automáticas. Não envie CPF, endereço ou dados do cartão.</p>
        </section>
      )}
    </>
  );
}
