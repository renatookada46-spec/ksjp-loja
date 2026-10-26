import Link from "next/link";

export function Kits() {
  return (
    <section className="kits" id="kits" aria-label="Kits">
      <div className="wrap kits-in">
        <div className="kits-copy">
          <div className="eyebrow">Compre sem susto</div>
          <h2>Kits pensados para o limite de US$ 50</h2>
          <p>
            Montamos cada kit para ficar dentro da faixa de imposto mais baixa da importação. Você
            já vê quanto paga de taxa antes de finalizar.
          </p>
          <div className="limit">
            <div><b>US$ 50</b><span>valor máximo do kit</span></div>
            <div><b>~20%</b><span>imposto + ICMS</span></div>
            <div><b>3 a 5</b><span>produtos por kit</span></div>
          </div>
          <Link className="btn btn-red" href="/produtos?categoria=kits">
            Ver os kits
          </Link>
        </div>
        <div className="box" aria-hidden="true">
          <span className="eyebrow">Kit do mês</span>
          <span className="disc" />
          <div className="tag">
            <span>Kit Rotina Hidratação</span>
            <b>R$ 249</b>
          </div>
        </div>
      </div>
    </section>
  );
}
