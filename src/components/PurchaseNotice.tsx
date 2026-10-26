import Link from "next/link";
import { brl } from "@/lib/format";
import { rules } from "@/lib/site";

// Aviso de atenção sobre a compra por encomenda (entrada e prazo para pedir o envio).
export function PurchaseNotice() {
  return (
    <aside className="notice" aria-label="Atenção">
      <div className="notice-head">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3 2 21h20L12 3z" />
          <path d="M12 10v5M12 18h.01" />
        </svg>
        <b>Atenção: leia antes de comprar</b>
      </div>
      <p>
        Trabalhamos por encomenda. Você paga <strong>{rules.depositPercent}% de entrada</strong>{" "}
        (produtos, frete do Japão e taxa de serviço de {brl(rules.serviceFee)}) e nós compramos seus
        produtos em loja oficial.
      </p>
      <p>
        Quando avisarmos que seu pedido está completo, você tem <strong>{rules.holdDays} dias</strong>{" "}
        para pedir o envio da sua caixa. Sem pedido de envio nesse prazo, o pedido é cancelado e a
        entrada não é devolvida, porque os produtos já foram comprados para você.
      </p>
      <Link className="link" href="/regras">Ler as regras de compra</Link>
    </aside>
  );
}
