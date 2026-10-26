const steps = [
  { title: "Você escolhe", text: "Paga em reais, no Pix ou no cartão, aqui mesmo na loja." },
  { title: "Compramos no Japão", text: "Em até 3 dias úteis, direto em loja oficial, com nota guardada." },
  { title: "Enviamos para você", text: "Embalagem protegida e código de rastreio no seu WhatsApp." },
  { title: "Chega na sua casa", text: "De 15 a 30 dias. O imposto da importação aparece antes de pagar." },
];

export function HowItWorks() {
  return (
    <section className="block wrap" id="como-funciona" aria-label="Como funciona">
      <div className="head">
        <div className="head-t">
          <div className="eyebrow">Transparência</div>
          <h2>Como funciona a sua compra</h2>
        </div>
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
