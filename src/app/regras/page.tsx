import type { Metadata } from "next";
import Link from "next/link";
import { PurchaseNotice } from "@/components/PurchaseNotice";
import { brl } from "@/lib/format";
import { rules, site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Regras de compra",
  description: `Como funciona a compra por encomenda na ${site.name}: entrada de ${rules.depositPercent}% e prazo de ${rules.holdDays} dias para pedir o envio.`,
};

const remaining = 100 - rules.depositPercent;

const steps = [
  {
    title: "Compra por encomenda",
    text: `Os produtos da ${site.name} são comprados no Japão especialmente para cada cliente, depois que o pedido é feito.`,
  },
  {
    title: `Entrada de ${rules.depositPercent}%`,
    text: `O valor do pedido é a soma dos produtos, do frete do Japão para o Brasil e da taxa de serviço de ${brl(rules.serviceFee)}. Na hora do pedido você paga ${rules.depositPercent}% desse valor, no Pix ou no cartão.`,
  },
  {
    title: "Compramos seus produtos",
    text: "Com a entrada confirmada, compramos tudo em loja oficial no Japão e guardamos a nota. Seus produtos ficam reservados na sua caixa.",
  },
  {
    title: "Avisamos que o pedido está completo",
    text: "Quando todos os produtos estiverem com a gente, você recebe um aviso no WhatsApp.",
  },
  {
    title: `Você tem ${rules.holdDays} dias para pedir o envio`,
    text: `A partir desse aviso, você tem ${rules.holdDays} dias corridos para pedir o envio da sua caixa e pagar os ${remaining}% restantes.`,
  },
  {
    title: "Enviamos para o Brasil",
    text: "Com o pagamento completo, enviamos a caixa com código de rastreio. O prazo de entrega costuma ser de 15 a 30 dias.",
  },
];

export default function RulesPage() {
  return (
    <div className="paper">
      <section className="block wrap rules">
        <div className="head">
          <div className="head-t">
            <div className="eyebrow">Leia antes de comprar</div>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1 }}>Regras de compra</h1>
          </div>
        </div>

        <div className="rules-grid">
          <ol className="rules-list">
            {steps.map((s) => (
              <li key={s.title}>
                <h2>{s.title}</h2>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>

          <div className="rules-side">
            <div className="rules-alert">
              <div className="eyebrow">Cancelamento por falta de contato</div>
              <p>
                Se você não pedir o envio em até <strong>{rules.holdDays} dias</strong> depois do
                aviso de pedido completo, o pedido é <strong>cancelado</strong> e a entrada de{" "}
                {rules.depositPercent}% <strong>não é devolvida</strong>. Ela cobre os produtos que já
                compramos para você e o nosso serviço.
              </p>
            </div>
            <div className="rules-box">
              <h2>Antes da compra no Japão</h2>
              <p>
                Mudou de ideia? Fale com a gente antes de comprarmos seus produtos e cancelamos o
                pedido com devolução total da entrada.
              </p>
            </div>
            <div className="rules-box">
              <h2>Impostos de importação</h2>
              <p>
                Compras internacionais podem ter imposto cobrado pelos Correios quando a caixa chega
                ao Brasil. Esse valor é pago por quem recebe e não faz parte do valor do pedido.
              </p>
            </div>
            <a className="btn btn-red" href={whatsappLink("Olá! Tenho uma dúvida sobre as regras de compra.")} target="_blank" rel="noopener noreferrer">
              Tirar dúvidas no WhatsApp
            </a>
          </div>
        </div>
      </section>
      <section className="block wrap" aria-label="Resumo">
        <PurchaseNotice />
        <p className="note">
          Ao fazer um pedido, você concorda com estas regras. <Link className="link" href="/produtos">Ver a coleção</Link>
        </p>
      </section>
    </div>
  );
}
