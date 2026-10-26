import Link from "next/link";
import { NightCanvas } from "./NightCanvas";

export function Hero() {
  return (
    <section className="hero" aria-label="Abertura">
      <NightCanvas />
      <div className="sun" aria-hidden="true" />
      <div className="wrap hero-in">
        <div className="hero-copy">
          <div className="eyebrow">Do Japão para a sua casa</div>
          <h1>
            A beleza que o Japão guarda <em>nas prateleiras.</em>
          </h1>
          <p>
            Skincare e beleza escolhidos a dedo em lojas oficiais do Japão e enviados direto para
            você no Brasil. Preço em reais, pagamento no Pix ou cartão.
          </p>
          <div className="cta">
            <Link className="btn btn-red" href="/produtos">
              Ver a coleção
            </Link>
            <Link className="btn btn-ghost" href="/#como-funciona">
              Como funciona
            </Link>
          </div>
        </div>
      </div>
      <span className="scroll-hint" aria-hidden="true" />
    </section>
  );
}
