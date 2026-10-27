import Link from "next/link";
import { brl } from "@/lib/format";
import { products } from "@/lib/products";

// Destaque dos kits: presente pronto, montado pela curadoria.
export function Kits() {
  const kit = products.find((p) => p.category === "kits");

  return (
    <section className="kits" id="kits" aria-label="Kits">
      <div className="wrap kits-in">
        <div className="kits-copy reveal">
          <div className="eyebrow">Kits da curadoria</div>
          <h2>Uma caixa do Japão, pronta para presentear</h2>
          <p>
            Rotinas completas montadas pela nossa curadoria, com produtos que conversam entre si.
            Para você ou para alguém especial.
          </p>
          <div className="limit">
            <div><b>3 a 5</b><span>produtos por kit</span></div>
            <div><b>100%</b><span>originais do Japão</span></div>
            <div><b>1</b><span>caixa, um só frete</span></div>
          </div>
          <Link className="btn btn-red" href="/produtos?categoria=kits">
            Ver os kits
          </Link>
        </div>
        <div className="box reveal" aria-hidden="true">
          <span className="eyebrow">Kit do mês</span>
          <span className="disc" />
          {kit && (
            <div className="tag">
              <span>{kit.name}</span>
              <b>{brl(kit.price)}</b>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
