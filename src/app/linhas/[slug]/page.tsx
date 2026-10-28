import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FinoHero } from "@/components/FinoHero";
import { HoneyHero } from "@/components/HoneyHero";
import { LineHero } from "@/components/LineHero";
import { ProductVisual } from "@/components/ProductVisual";
import { PurchaseNotice } from "@/components/PurchaseNotice";
import { WhatsAppNotice } from "@/components/WhatsAppNotice";
import { brl } from "@/lib/format";
import { getLine, lines } from "@/lib/lines";
import { getProduct, type Product } from "@/lib/products";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return lines.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const line = getLine(slug);
  if (!line) return {};
  return { title: `${line.brand} ${line.name}`, description: line.subtitle };
}

function pick(slugs: string[]) {
  return slugs.map(getProduct).filter((p): p is Product => p !== undefined);
}

export default async function LinePage({ params }: Props) {
  const { slug } = await params;
  const line = getLine(slug);
  if (!line) notFound();

  const products = pick(line.products);
  const kits = pick(line.kits);

  return (
    <div className={line.theme ? `ln-theme-${line.theme}` : undefined}>
      {line.heroKv ? (
        <FinoHero line={line} />
      ) : line.heroImage ? (
        <HoneyHero line={line} />
      ) : (
        <LineHero line={line} products={products} />
      )}

      <div className="paper">
        <section className="block wrap ln-lead">
          <div className="eyebrow">{line.brand} {line.name}</div>
          <h2>{line.lead.title}</h2>
          <p>{line.lead.text}</p>
        </section>

        <nav className="ln-nav" aria-label="Nesta página">
          <div className="wrap">
            <a href="#sobre">Sobre</a>
            <a href="#comprar">Produtos</a>
            <a href="#como-usar">Como usar</a>
            {kits.length > 0 && <a href="#presente">Presente</a>}
            <a href="#duvidas">Dúvidas</a>
          </div>
        </nav>

        <section className="block wrap ln-about" id="sobre">
          <div className="head">
            <div className="head-t">
              <div className="eyebrow">Sobre</div>
              <h2>{line.about.title}</h2>
            </div>
          </div>
          <div className="ln-about-grid">
            {line.about.items.map((item, i) => (
              <article key={item.name} className="ln-about-item reveal">
                <span className="ln-num">0{i + 1}</span>
                <h3>{item.name}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      {line.scene && (
        <section className="ln-scene" aria-label="Textura e perfume">
          <div className="wrap ln-scene-in">
            <div className="ln-scene-copy reveal">
              <div className="eyebrow">Textura</div>
              <h2>{line.scene.title}</h2>
              <p>{line.scene.text}</p>
            </div>
            {line.scene.fragrance && (
              <div className="ln-notes reveal">
                <div className="eyebrow">{line.scene.fragrance.name}</div>
                <dl>
                  {line.scene.fragrance.notes.map((n) => (
                    <div key={n.label}>
                      <dt>{n.label}</dt>
                      <dd>{n.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            {line.scene.image && !line.scene.fragrance && (
              <div className="ln-scene-photo reveal">
                <Image src={line.scene.image} alt={`${line.brand} ${line.name}`} fill sizes="(max-width: 1023px) 80vw, 40vw" />
              </div>
            )}
          </div>
        </section>
      )}

      <div className="paper">
        <section className="block wrap" id="comprar" aria-label="Produtos">
          <div className="head">
            <div className="head-t">
              <div className="eyebrow">Produtos</div>
              <h2>A linha {line.name} completa</h2>
            </div>
            <Link className="link" href="/regras">Como funciona a compra</Link>
          </div>
          <div className="ln-products">
            {products.map((p) => (
              <article key={p.slug} className="ln-product reveal" id={p.slug}>
                <Link href={`/produtos/${p.slug}`} aria-label={p.name}>
                  <ProductVisual product={p} />
                </Link>
                <div className="ln-product-info">
                  <small>{p.brand}</small>
                  <h3>{p.name}</h3>
                  {p.tagline && <p>{p.tagline}</p>}
                  <div className="price">
                    <b>{brl(p.price)}</b>
                    <span>
                      {p.size} · ou {site.installments}x de {brl(p.price / site.installments)}
                    </span>
                  </div>
                  <Link className="btn btn-red" href={`/produtos/${p.slug}`}>
                    Comprar
                  </Link>
                  <details className="ln-details">
                    <summary>Detalhes do produto</summary>
                    <p>{p.description}</p>
                    {p.ingredients?.length ? (
                      <ul>
                        {p.ingredients.map((i) => (
                          <li key={i.name}>
                            <b>{i.name}:</b> {i.benefit}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </details>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="block wrap" id="como-usar" aria-label="Como usar">
          <div className="head">
            <div className="head-t">
              <div className="eyebrow">Como usar</div>
              <h2>O ritual em {line.steps.length} passos</h2>
            </div>
          </div>
          <ol className="ln-steps">
            {line.steps.map((s, i) => (
              <li key={s.title} className="reveal">
                <span className="ln-num">Passo {i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                {s.tip && (
                  <p className="ln-tip">
                    <b>Dica</b> {s.tip}
                  </p>
                )}
                {s.product && (
                  <a className="link" href={`#${s.product}`}>
                    Ver o produto
                  </a>
                )}
              </li>
            ))}
          </ol>
        </section>
      </div>

      {kits.length > 0 && (
        <section className="ln-gift" id="presente" aria-label="Para presentear">
          <div className="wrap">
            <div className="head">
              <div className="head-t">
                <div className="eyebrow">Para presentear</div>
                <h2>Kits {line.name}</h2>
              </div>
            </div>
            <div className="ln-kits">
              {kits.map((k) => (
                <Link key={k.slug} href={`/produtos/${k.slug}`} className="ln-kit reveal">
                  <ProductVisual product={k} />
                  <div>
                    <h3>{k.name}</h3>
                    <p>{k.description}</p>
                    <b>{brl(k.price)}</b>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="paper">
        <section className="block wrap ln-faq" id="duvidas" aria-label="Dúvidas">
          <div className="head">
            <div className="head-t">
              <div className="eyebrow">Dúvidas</div>
              <h2>Perguntas frequentes</h2>
            </div>
          </div>
          <div className="ln-faq-list">
            {line.faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <PurchaseNotice />
          <WhatsAppNotice tone="light" message={`Olá! Tenho uma dúvida antes de comprar a linha ${line.brand} ${line.name}.`} />
        </section>
      </div>
    </div>
  );
}
