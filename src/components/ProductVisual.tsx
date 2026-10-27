import type { CSSProperties } from "react";
import type { Product } from "@/lib/products";

// Foto do produto quando existe; senão, a embalagem desenhada em CSS.
export function ProductVisual({ product, large = false }: { product: Product; large?: boolean }) {
  if (product.imageUrl) {
    return (
      <div className={large ? "stage lg photo" : "stage photo"}>
        {product.badge && (
          <span className={product.badge.highlight ? "badge red" : "badge"}>{product.badge.label}</span>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.imageUrl} alt={`${product.brand} ${product.name}`} loading="lazy" />
      </div>
    );
  }

  const dark = product.color === "#2a2420";
  const body = (
    <div className="body gloss" style={{ "--c": product.color } as CSSProperties}>
      <span className={dark ? "lbl light" : "lbl"}>{product.brand.toUpperCase()}</span>
    </div>
  );
  const cap = <div className="cap" style={{ "--cap": product.capColor } as CSSProperties} />;

  return (
    <div className={large ? "stage lg" : "stage"} style={{ "--tone": product.tone } as CSSProperties}>
      {product.badge && (
        <span className={product.badge.highlight ? "badge red" : "badge"}>{product.badge.label}</span>
      )}
      <span className="shadow" />
      <div className={`obj ${product.shape}`}>
        {product.shape === "tube" ? <>{body}{cap}</> : <>{cap}{body}</>}
      </div>
    </div>
  );
}
