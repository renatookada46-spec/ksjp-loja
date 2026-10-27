import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppButton";

// Aviso grande: o WhatsApp atende somente dúvidas antes da compra.
export function WhatsAppNotice({ message = "Olá! Tenho uma dúvida antes de comprar.", tone = "dark" }: { message?: string; tone?: "dark" | "light" }) {
  return (
    <aside className={`wa-notice ${tone}`} aria-label="Atendimento pelo WhatsApp">
      <span className="wa-notice-icon" aria-hidden="true">
        <WhatsAppIcon />
      </span>
      <div className="wa-notice-text">
        <h2>
          WhatsApp somente para <em>dúvidas antes de comprar</em>
        </h2>
        <p>Use o WhatsApp para tirar dúvidas sobre produtos, prazos e regras antes de fazer o seu pedido.</p>
      </div>
      <a className="btn btn-red" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
        Tirar uma dúvida
      </a>
    </aside>
  );
}
