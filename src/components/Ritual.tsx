import Link from "next/link";
import { brl } from "@/lib/format";
import { getProduct } from "@/lib/products";
import { ProductVisual } from "./ProductVisual";

// O ritual japonês em 4 passos. Cada passo aponta para um produto da vitrine.
const steps = [
  { verb: "Limpar", text: "Óleo que derrete maquiagem e protetor.", slug: "dhc-oleo-de-limpeza" },
  { verb: "Hidratar", text: "Loção que a pele bebe em segundos.", slug: "hada-labo-gokujyun-locao-hialuronica" },
  { verb: "Tratar", text: "Vitamina C para manchas e brilho.", slug: "melano-cc-serum-vitamina-c" },
  { verb: "Proteger", text: "Protetor leve como água, todo dia.", slug: "biore-uv-aqua-rich-watery-essence" },
];

export function Ritual() {
  const items = steps
    .map((s) => ({ ...s, product: getProduct(s.slug) }))
    .filter((s) => s.product !== undefined);
  if (!items.length) return null;

  return (
    <section className="ritual" aria-label="Ritual japonês">
      <div className="wrap">
        <div className="head">
          <div className="head-t">
            <div className="eyebrow">O ritual japonês</div>
            <h2>Pele de japonesa em 4 passos</h2>
          </div>
          <p className="ritual-intro">
            No Japão, cuidar da pele é um ritual simples, feito em camadas leves. Comece por aqui.
          </p>
        </div>
        <ol className="ritual-steps">
          {items.map((s, i) => (
            <li key={s.slug} className="reveal">
              <Link href={`/produtos/${s.slug}`}>
                <span className="ritual-n">0{i + 1}</span>
                <ProductVisual product={s.product!} />
                <b>{s.verb}</b>
                <span className="ritual-t">{s.text}</span>
                <span className="ritual-p">
                  {s.product!.brand} · {brl(s.product!.price)}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
