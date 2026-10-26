import Link from "next/link";
import { rules } from "@/lib/site";

const steps = [
  {
    title: "Você faz o pedido",
    text: `Paga ${rules.depositPercent}% de entrada em reais, no Pix ou no cartão.`,
  },
  {
    title: "Compramos no Japão",
    text: "Direto em loja oficial, com nota guardada. Sua caixa fica reservada.",
  },
  {
    title: "Você pede o envio",
    text: `Avisamos quando o pedido está completo. Você tem ${rules.holdDays} dias para pedir o envio e pagar o restante.`,
  },
  {
    title: "Chega na sua casa",
    text: "Enviamos com código de rastreio. A entrega leva de 15 a 30 dias.",
  },
];

export function HowItWorks() {
  return (
    <section className="block wrap" id="como-funciona" aria-label="Como funciona">
      <div className="head">
        <div className="head-t">
          <div className="eyebrow">Transparência</div>
          <h2>Como funciona a sua compra</h2>
        </div>
        <Link className="link" href="/regras">Ler as regras de compra</Link>
      </div>
      <ol className="steps">
        {steps.map((s) => (
          <li key={s.title} className="step">
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
