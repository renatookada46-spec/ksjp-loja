import Link from "next/link";
import type { Product } from "@/lib/products";
import { brl } from "@/lib/format";
import { site } from "@/lib/site";
import { ProductVisual } from "./ProductVisual";

export function ProductCard({ product }: { product: Product }) {
  const href = `/produtos/${product.slug}`;
  return (
    <article className="card reveal">
      <Link href={href} aria-label={product.name}>
        <ProductVisual product={product} />
      </Link>
      <div className="info">
        <small>{product.brand}</small>
        <h3>
          <Link href={href}>
            {product.name} {product.size}
          </Link>
        </h3>
        {product.tagline && <p className="card-tagline">{product.tagline}</p>}
        <div className="price">
          <b>{brl(product.price)}</b>
          <span>
            ou {site.installments}x de {brl(product.price / site.installments)}
          </span>
        </div>
      </div>
      <Link className="btn btn-ink" href={href}>
        Ver produto
      </Link>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
