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
        Trabalhamos por encomenda. O valor do pedido é a soma de três partes:{" "}
        <strong>os produtos pelo preço do site</strong>, <strong>o frete da caixa</strong> (calculado
        por quilo) e <strong>{brl(rules.serviceFee)} de serviço por caixa</strong>. Você paga{" "}
        <strong>{rules.depositPercent}% no pedido</strong> e os{" "}
        <strong>{100 - rules.depositPercent}% restantes quando pedir o envio</strong>.
      </p>
      <p>
        Quando avisarmos que seu pedido está completo, você tem <strong>{rules.holdDays} dias</strong>{" "}
        para pedir o envio da sua caixa. Sem pedido de envio nesse prazo, o pedido é cancelado e a
        entrada não é devolvida, porque os produtos já foram comprados para você.
      </p>
      <p className="notice-key">
        <strong>A taxa de retirada no Brasil é por conta do cliente.</strong> Impostos de importação e
        a taxa dos Correios são pagos por quem recebe, na chegada da caixa, e não fazem parte do valor
        do pedido.
      </p>
      <Link className="link" href="/regras">Ler as regras de compra</Link>
    </aside>
  );
}
