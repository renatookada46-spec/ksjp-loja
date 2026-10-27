import Image from "next/image";
import type { CSSProperties } from "react";
import type { Product } from "@/lib/products";

// Mostra a foto do produto. Sem foto, desenha a embalagem em CSS.
export function ProductVisual({
  product,
  large = false,
  image,
}: {
  product: Product;
  large?: boolean;
  image?: string;
}) {
  const photo = image ?? product.images?.[0];
  if (photo) {
    return (
      <div className={large ? "stage lg photo" : "stage photo"} style={{ "--tone": product.tone } as CSSProperties}>
        {product.badge && (
          <span className={product.badge.highlight ? "badge red" : "badge"}>{product.badge.label}</span>
        )}
        <Image
          src={photo}
          alt={`${product.brand} ${product.name}`}
          fill
          sizes={large ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 50vw, 25vw"}
          priority={large}
        />
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
