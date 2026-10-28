import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { PurchaseNotice } from "@/components/PurchaseNotice";
import { SakuraPetal } from "@/components/SakuraPetal";
import { WhatsAppNotice } from "@/components/WhatsAppNotice";
import { brl } from "@/lib/format";
import { getLine } from "@/lib/lines";
import { getCategory, getProduct, products } from "@/lib/products";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.brand} ${product.name}`,
    description: product.tagline ?? product.description,
    openGraph: product.images?.[0] ? { images: [product.images[0]] } : undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const line = product.line ? getLine(product.line) : undefined;
  const pairs = (product.pairsWith ?? []).map(getProduct).filter((p) => p !== undefined);
  const related = pairs.length
    ? pairs
    : products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  const message = `Olá! Tenho uma dúvida antes de comprar: ${product.brand} ${product.name} ${product.size} (${brl(product.price)}).`;
  const specs = [
    product.forWho?.length ? { label: product.category === "cabelo" ? "Para cabelo" : "Para quem", value: product.forWho.join(", ") } : null,
    product.texture ? { label: "Textura", value: product.texture } : null,
    { label: "Tamanho", value: product.size },
    { label: "Origem", value: "Comprado em loja oficial no Japão" },
  ].filter((s) => s !== null);

  return (
    <div className="paper">
      <section className="block wrap pdp-top">
        <nav className="crumbs" aria-label="Você está em">
          <Link href="/">Início</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/produtos?categoria=${product.category}`}>{category?.name}</Link>
          <span aria-hidden="true">/</span>
          <span>{product.brand}</span>
        </nav>
        <div className="pdp">
          <ProductGallery product={product} />
          <div className="pdp-info">
            <div className="eyebrow">{product.brand}</div>
            <h1>{product.name}</h1>
            {product.tagline && <p className="pdp-tagline">{product.tagline}</p>}
            {line && (
              <Link className="link pdp-line" href={`/linhas/${line.slug}`}>
                Ver a linha {line.brand} {line.name} completa
              </Link>
            )}
            <div className="price">
              <b>{brl(product.price)}</b>
              <span>
                ou {site.installments}x de {brl(product.price / site.installments)} · {product.size}
              </span>
            </div>
            {product.alert && (
              <aside className="pdp-alert" role="alert">
                <div className="pdp-alert-head">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 3 2 21h20L12 3z" />
                    <path d="M12 10v5M12 18h.01" />
                  </svg>
                  <b>{product.alert.title}</b>
                </div>
                {product.alert.text.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </aside>
            )}
            {product.highlights?.length ? (
              <ul className="pdp-highlights">
                {product.highlights.map((h) => (
                  <li key={h}>
                    <SakuraPetal />
                    {h}
                  </li>
                ))}
              </ul>
            ) : null}
            <dl className="pdp-specs">
              {specs.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
            {/* Na Etapa 3 entra aqui o botão "Adicionar à sacola", com checkout Mercado Pago. */}
            <PurchaseNotice />
            <WhatsAppNotice tone="light" message={message} />
            <ul className="pdp-perks">
              <li>Mesmo preço das lojas japonesas, sem acréscimo</li>
              <li>Envio rastreado, chega em 15 a 30 dias</li>
              <li>Pix ou cartão de crédito</li>
              <li>Taxa de retirada no Brasil por conta do cliente</li>
            </ul>
          </div>
        </div>
      </section>

      {product.curatorNote && (
        <section className="curator-note" aria-label="Nota da curadoria">
          <div className="wrap">
            <div className="eyebrow">Por que escolhemos</div>
            <blockquote>{product.curatorNote}</blockquote>
            <span>Curadoria {site.name}, direto do Japão</span>
          </div>
        </section>
      )}

      <section className="block wrap pdp-story">
        <div className="pdp-story-grid">
          <div className="pdp-text">
            <div className="eyebrow">Sobre o produto</div>
            <p>{product.description}</p>
          </div>
          <div className="pdp-text">
            <div className="eyebrow">Ritual de uso</div>
            <p>{product.howToUse}</p>
          </div>
        </div>
        {product.ingredients?.length ? (
          <div className="pdp-ingredients">
            <div className="eyebrow">Ativos principais</div>
            <ul>
              {product.ingredients.map((i) => (
                <li key={i.name}>
                  <b>{i.name}</b>
                  <span>{i.benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      {related.length > 0 && (
        <section className="block wrap" aria-label={pairs.length ? "Combina com" : "Você também pode gostar"}>
          <div className="head">
            <div className="head-t">
              <div className="eyebrow">{pairs.length ? "Monte sua rotina" : "Da mesma categoria"}</div>
              <h2>{pairs.length ? "Combina com" : "Você também pode gostar"}</h2>
            </div>
          </div>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
