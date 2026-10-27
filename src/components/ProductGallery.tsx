"use client";

// Galeria da página de produto: foto grande e miniaturas para trocar.
import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { ProductVisual } from "./ProductVisual";

export function ProductGallery({ product }: { product: Product }) {
  const images = product.images ?? [];
  const [current, setCurrent] = useState(0);

  return (
    <div className="gallery">
      <ProductVisual product={product} large image={images[current]} />
      {images.length > 1 && (
        <div className="gallery-thumbs" role="tablist" aria-label="Fotos do produto">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={`Foto ${i + 1}`}
              className={i === current ? "is-on" : undefined}
              onClick={() => setCurrent(i)}
            >
              <Image src={src} alt="" fill sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
