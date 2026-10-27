import type { Metadata } from "next";
import Link from "next/link";
import { ProductGrid } from "@/components/ProductCard";
import { getProducts } from "@/lib/catalog";
import { categories, getCategory } from "@/lib/products";

export const metadata: Metadata = { title: "Produtos" };

type Props = { searchParams: Promise<{ categoria?: string }> };

export default async function ProductsPage({ searchParams }: Props) {
  const { categoria } = await searchParams;
  const current = categoria ? getCategory(categoria) : undefined;
  const products = await getProducts();
  const list = current ? products.filter((p) => p.category === current.slug) : products;

  return (
    <div className="paper">
      <section className="block wrap">
        <div className="head">
          <div className="head-t">
            <div className="eyebrow">{current ? current.description : "Coleção completa"}</div>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1 }}>
              {current ? current.name : "Todos os produtos"}
            </h1>
          </div>
        </div>
        <nav className="chips" aria-label="Filtrar por categoria">
          <Link className="chip" href="/produtos" aria-current={!current ? "page" : undefined}>
            Todos
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              className="chip"
              href={`/produtos?categoria=${c.slug}`}
              aria-current={current?.slug === c.slug ? "page" : undefined}
            >
              {c.name}
            </Link>
          ))}
        </nav>
        <ProductGrid products={list} />
      </section>
    </div>
  );
}
