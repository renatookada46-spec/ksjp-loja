"use client";

// Abertura da página de linha: os frascos sobem do fundo dourado e ficam flutuando (GSAP).
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Line } from "@/lib/lines";
import type { Product } from "@/lib/products";
import { ProductVisual } from "./ProductVisual";

gsap.registerPlugin(useGSAP);

export function LineHero({ line, products }: { line: Line; products: Product[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".lh-glow", { scale: 0.4, opacity: 0, duration: 1.6 })
          .from(".lh-copy > *", { y: 30, opacity: 0, filter: "blur(10px)", duration: 1, stagger: 0.12 }, 0.2)
          .from(
            ".lh-bottle",
            { yPercent: 60, opacity: 0, scale: 0.7, filter: "blur(18px)", duration: 1.4, stagger: { each: 0.15, from: "center" } },
            0.4,
          );
        gsap.utils.toArray<HTMLElement>(".lh-float").forEach((el, i) => {
          gsap.to(el, { y: -12, duration: 2.4 + i * 0.3, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.6 });
        });
        // Faixas de seda rosa que ondulam devagar atrás dos frascos.
        gsap.utils.toArray<HTMLElement>(".lh-silk").forEach((el, i) => {
          gsap.fromTo(
            el,
            { xPercent: -8, rotation: -6 + i * 4 },
            { xPercent: 8, rotation: 4 - i * 3, duration: 7 + i * 2, ease: "sine.inOut", yoyo: true, repeat: -1 },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section className={line.theme ? `lh lh-${line.theme}` : "lh"} ref={root} aria-label={`${line.brand} ${line.name}`}>
      {line.heroImage && <Image className="lh-bg" src={line.heroImage} alt="" fill priority sizes="100vw" />}
      <div className="lh-glow" aria-hidden="true" />
      {line.theme === "rose" && (
        <div className="lh-silks" aria-hidden="true">
          <span className="lh-silk" />
          <span className="lh-silk" />
          <span className="lh-silk" />
        </div>
      )}
      <div className="wrap lh-in">
        <div className="lh-copy">
          <div className="eyebrow">{line.eyebrow}</div>
          <h1>{line.title}</h1>
          <p>{line.subtitle}</p>
          <Link className="btn btn-red" href="#comprar">
            Comprar agora
          </Link>
        </div>
        <ul className="lh-bottles">
          {products.map((p) => (
            <li key={p.slug} className="lh-bottle">
              <div className="lh-float">
                {p.images?.[0] ? (
                  <div className="lh-photo">
                    <Image src={p.images[0]} alt={`${p.brand} ${p.name}`} fill sizes="25vw" />
                  </div>
                ) : (
                  <ProductVisual product={{ ...p, badge: undefined }} />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
