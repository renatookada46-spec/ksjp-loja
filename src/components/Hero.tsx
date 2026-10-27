import Image from "next/image";
import Link from "next/link";
import { getLine } from "@/lib/lines";
import { getProduct, type Product } from "@/lib/products";
import { PetalCanvas } from "./PetalCanvas";
import { ProductVisual } from "./ProductVisual";
import heroImage from "../../public/hero.webp";

// Linha em destaque na abertura. Troque o slug para destacar outra linha.
const FEATURED = "refa-honey-queen";

export function Hero() {
  const line = getLine(FEATURED);
  const featured = (line?.products ?? [])
    .slice(0, 3)
    .map(getProduct)
    .filter((p): p is Product => p !== undefined);

  return (
    <section className="hero" aria-label="Abertura">
      <Image
        className="hero-bg"
        src={heroImage}
        alt=""
        fill
        priority
        placeholder="blur"
        sizes="100vw"
      />
      <div className="hero-shade" aria-hidden="true" />
      <PetalCanvas />
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
        {line && featured.length > 0 && (
          <Link className="hero-feature" href={`/linhas/${line.slug}`}>
            <div className="hero-feature-bottles" aria-hidden="true">
              {featured.map((p) =>
                p.images?.[0] ? (
                  <div key={p.slug} className="hero-feature-photo">
                    <Image src={p.images[0]} alt="" fill sizes="160px" />
                  </div>
                ) : (
                  <ProductVisual key={p.slug} product={{ ...p, badge: undefined }} />
                ),
              )}
            </div>
            <div className="hero-feature-text">
              <span className="eyebrow">Novidade</span>
              <b>
                {line.brand} {line.name}
              </b>
              <span>Conheça a linha</span>
            </div>
          </Link>
        )}
      </div>
      <span className="scroll-hint" aria-hidden="true" />
    </section>
  );
}
