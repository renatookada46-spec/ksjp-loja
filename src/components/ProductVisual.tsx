import type { CSSProperties } from "react";
import type { Product } from "@/lib/products";

// Embalagem desenhada em CSS. Na Etapa 2 é substituída pela foto real do produto.
export function ProductVisual({ product, large = false }: { product: Product; large?: boolean }) {
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
