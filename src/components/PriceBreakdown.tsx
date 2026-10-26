import { brl } from "@/lib/format";
import { rules } from "@/lib/site";

// Explica como o valor do pedido é formado e como ele é dividido em entrada e restante.
const example = { products: 400, shipping: 120 };

export function PriceBreakdown() {
  const total = example.products + example.shipping + rules.serviceFee;
  const deposit = total * (rules.depositPercent / 100);
  const remaining = total - deposit;
  const remainingPercent = 100 - rules.depositPercent;

  return (
    <section className="calc" aria-label="Como é calculado o valor do pedido">
      <div className="calc-copy">
        <div className="eyebrow">Sem surpresa</div>
        <h2>Como é calculado o valor do seu pedido</h2>
        <ol className="calc-parts">
          <li>
            <b>Produtos</b>
            <span>Você paga exatamente o preço que aparece no site. Nem mais, nem menos.</span>
          </li>
          <li>
            <b>Frete da caixa</b>
            <span>Envio do Japão para o Brasil, calculado pelo peso da caixa, em quilos.</span>
          </li>
          <li>
            <b>Serviço KSJP</b>
            <span>{brl(rules.serviceFee)} por caixa, para comprar, conferir, embalar e enviar.</span>
          </li>
        </ol>
        <p className="calc-split">
          Somando tudo, você paga <strong>{rules.depositPercent}% na hora do pedido</strong> e os{" "}
          <strong>{remainingPercent}% restantes quando pedir o envio da caixa</strong>, dentro de{" "}
          {rules.holdDays} dias depois do nosso aviso de pedido completo.
        </p>
      </div>

      <div className="calc-example" aria-label="Exemplo de cálculo">
        <div className="eyebrow">Exemplo</div>
        <dl>
          <div><dt>Produtos</dt><dd>{brl(example.products)}</dd></div>
          <div><dt>Frete da caixa</dt><dd>{brl(example.shipping)}</dd></div>
          <div><dt>Serviço KSJP</dt><dd>{brl(rules.serviceFee)}</dd></div>
          <div className="sum"><dt>Total do pedido</dt><dd>{brl(total)}</dd></div>
          <div className="pay-now"><dt>Entrada de {rules.depositPercent}%, no pedido</dt><dd>{brl(deposit)}</dd></div>
          <div><dt>Restante de {remainingPercent}%, ao pedir o envio</dt><dd>{brl(remaining)}</dd></div>
        </dl>
        <p>Valores de exemplo. O frete real depende do peso da sua caixa.</p>
      </div>
    </section>
  );
}
