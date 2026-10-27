// Rota da assistente virtual. Recebe a conversa, pergunta ao Claude e devolve a resposta
// aos pouquinhos (streaming), para o texto aparecer enquanto é escrito.
import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "@/lib/assistant";

export const runtime = "nodejs";
export const maxDuration = 60;

// Modelo pode ser trocado na Vercel pela variável ASSISTENTE_MODELO (ex.: claude-haiku-5-5, mais barato).
const MODEL = process.env.ASSISTENTE_MODELO || "claude-opus-5-5";
// Modelos que aceitam o plano B automático da Anthropic quando uma resposta é recusada.
const FALLBACK_MODELS = ["claude-opus-5-5", "claude-opus-5", "claude-fable-5-1", "claude-sonnet-5-5"];

const MAX_MESSAGES = 16;
const MAX_CHARS = 1500;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 30;

const systemPrompt = buildSystemPrompt();
const hits = new Map<string, number[]>();

// Limite simples por visitante, para ninguém gastar a sua conta da Anthropic em massa.
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_REQUESTS;
}

function parseMessages(body: unknown): Anthropic.Beta.BetaMessageParam[] | null {
  const list = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(list) || list.length === 0) return null;
  const messages: Anthropic.Beta.BetaMessageParam[] = [];
  for (const item of list.slice(-MAX_MESSAGES)) {
    const { role, content } = (item ?? {}) as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim().slice(0, MAX_CHARS);
    if (text) messages.push({ role, content: text });
  }
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") return null;
  return messages;
}

function text(message: string, status: number) {
  return new Response(message, { status, headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return text("A assistente ainda está sendo configurada. Enquanto isso, fale com a gente no WhatsApp.", 503);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "anon";
  if (limited(ip)) {
    return text("Você mandou muitas mensagens em pouco tempo. Espere alguns minutos e tente de novo.", 429);
  }

  const messages = parseMessages(await request.json().catch(() => null));
  if (!messages) return text("Mensagem inválida.", 400);

  const client = new Anthropic();
  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: 8000,
    output_config: { effort: "low" },
    system: [{ type: "text", text: systemPrompt, cache_control: { type: "ephemeral" } }],
    messages,
    ...(FALLBACK_MODELS.includes(MODEL)
      ? { betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" as const }
      : {}),
  });

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      let wrote = false;
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            wrote = true;
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal" || !wrote) {
          controller.enqueue(
            encoder.encode(
              (wrote ? "\n\n" : "") +
                "Não consigo ajudar com isso por aqui. Se for uma dúvida antes de comprar, fale com a gente no WhatsApp.",
            ),
          );
        }
      } catch (error) {
        console.error("assistente:", error instanceof Anthropic.APIError ? `${error.status} ${error.message}` : error);
        controller.enqueue(
          encoder.encode(
            (wrote ? "\n\n" : "") +
              "Tive um problema para responder agora. Tente de novo em instantes ou fale com a gente no WhatsApp.",
          ),
        );
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
