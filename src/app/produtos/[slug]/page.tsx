import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductCard";
import { PurchaseNotice } from "@/components/PurchaseNotice";
import { WhatsAppNotice } from "@/components/WhatsAppNotice";
import { ProductVisual } from "@/components/ProductVisual";
import { brl } from "@/lib/format";
import { getProductBySlug, getProducts } from "@/lib/catalog";
import { getCategory } from "@/lib/products";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return { title: `${product.brand} ${product.name}`, description: product.description };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  const message = `Olá! Tenho uma dúvida antes de comprar: ${product.brand} ${product.name} ${product.size} (${brl(product.price)}).`;

  return (
    <div className="paper">
      <section className="block wrap">
        <nav className="crumbs" aria-label="Você está em">
          <Link href="/">Início</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/produtos?categoria=${product.category}`}>{category?.name}</Link>
          <span aria-hidden="true">/</span>
          <span>{product.brand}</span>
        </nav>
        <div className="pdp">
          <ProductVisual product={product} large />
          <div className="pdp-info">
            <div className="eyebrow">{product.brand}</div>
            <h1>{product.name}</h1>
            <div className="price">
              <b>{brl(product.price)}</b>
              <span>
                ou {site.installments}x de {brl(product.price / site.installments)} · {product.size}
              </span>
            </div>
            {/* Na Etapa 3 entra aqui o botão "Adicionar à sacola", com checkout Mercado Pago. */}
            <PurchaseNotice />
            <WhatsAppNotice tone="light" message={message} />
            <ul className="pdp-perks">
              <li>Mesmo preço das lojas japonesas, sem acréscimo</li>
              <li>Comprado em loja oficial no Japão</li>
              <li>Envio rastreado, chega em 15 a 30 dias</li>
              <li>Pix ou cartão de crédito</li>
              <li>Taxa de retirada no Brasil por conta do cliente</li>
            </ul>
            <div className="pdp-text">
              <h2>Sobre o produto</h2>
              <p>{product.description}</p>
            </div>
            <div className="pdp-text">
              <h2>Como usar</h2>
              <p>{product.howToUse}</p>
            </div>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="block wrap" aria-label="Você também pode gostar">
          <div className="head">
            <div className="head-t">
              <div className="eyebrow">Da mesma categoria</div>
              <h2>Você também pode gostar</h2>
            </div>
          </div>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
