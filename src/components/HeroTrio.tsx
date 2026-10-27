"use client";

// Cena dos três mais vendidos: os produtos surgem do fundo no meio da fumaça (GSAP).
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const items = [
  {
    src: "/destaques/honey-queen.webp",
    alt: "Shampoo e tratamento honey Queen",
    brand: "honey Queen",
    name: "Shampoo e tratamento",
    line: "O mel em frascos de joia.",
  },
  {
    src: "/destaques/and-honey-rich.webp",
    alt: "Shampoo e tratamento &honey Rich Luxe Repair",
    brand: "&honey Rich",
    name: "Luxe Repair",
    line: "Reparação profunda com mel.",
  },
  {
    src: "/destaques/fino-premium-touch.webp",
    alt: "Máscara capilar Fino Premium Touch",
    brand: "Fino",
    name: "Premium Touch",
    line: "Cabelo de salão em 5 minutos.",
  },
];

type Puff = { x: number; y: number; r: number; vx: number; vy: number; life: number; max: number; tint: number };

// Fumaça desenhada num canvas. "power" controla a quantidade, animado pelo GSAP.
function startSmoke(canvas: HTMLCanvasElement, state: { power: number }) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  const tints = ["242,169,191", "239,233,223", "214,178,120"];
  const sprites = tints.map((t) => {
    const s = document.createElement("canvas");
    s.width = s.height = 128;
    const g = s.getContext("2d")!;
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, `rgba(${t},.55)`);
    grad.addColorStop(0.5, `rgba(${t},.18)`);
    grad.addColorStop(1, `rgba(${t},0)`);
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    return s;
  });
  const puffs: Puff[] = [];
  let w = 0;
  let h = 0;
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener("resize", resize);

  const tick = () => {
    // Em telas menores, menos fumaça e nuvens menores, para não lavar a imagem.
    const scale = Math.min(Math.max(w / 1440, 0.45), 1);
    const want = Math.round(70 * scale * state.power);
    if (puffs.length < want) {
      const tint = Math.random() < 0.5 ? 0 : Math.random() < 0.7 ? 1 : 2;
      puffs.push({
        x: w * (0.15 + Math.random() * 0.7),
        y: h * (0.65 + Math.random() * 0.4),
        r: (60 + Math.random() * 120) * scale,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(0.25 + Math.random() * 0.6),
        life: 0,
        max: 240 + Math.random() * 220,
        tint,
      });
    }
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";
    for (let i = puffs.length - 1; i >= 0; i--) {
      const p = puffs[i];
      p.life++;
      p.x += p.vx;
      p.y += p.vy;
      p.r += 0.35;
      const t = p.life / p.max;
      if (t >= 1) {
        puffs.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = Math.sin(Math.PI * t) * 0.5 * Math.max(state.power, 0.15);
      ctx.drawImage(sprites[p.tint], p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
    }
    ctx.globalAlpha = 1;
  };
  gsap.ticker.add(tick);
  return () => {
    gsap.ticker.remove(tick);
    window.removeEventListener("resize", resize);
  };
}

export function HeroTrio() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useGSAP(
    () => {
      const smoke = { power: 0 };
      const stop = canvas.current ? startSmoke(canvas.current, smoke) : () => {};
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, reduce } = context.conditions as Record<string, boolean>;
          if (reduce) {
            smoke.power = 0.3;
            return;
          }

          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: desktop
              ? { trigger: root.current, start: "top top", end: "+=140%", pin: true, scrub: 1 }
              : { trigger: root.current, start: "top 70%", toggleActions: "play none none none" },
          });

          tl.fromTo(smoke, { power: 0 }, { power: 1, duration: 1, ease: "power1.in" })
            .from(
              ".trio-item",
              {
                opacity: 0,
                scale: 0.25,
                yPercent: 40,
                rotation: (i) => [-14, 6, 14][i],
                filter: "blur(28px) brightness(1.8)",
                duration: 1.6,
                stagger: { each: 0.35, from: "center" },
              },
              0.3,
            )
            .from(".trio-head > *", { opacity: 0, y: 40, filter: "blur(12px)", duration: 1, stagger: 0.15 }, 0.9)
            .from(".trio-cap", { opacity: 0, y: 20, duration: 0.8, stagger: 0.12 }, 1.6)
            .from(".trio-cta", { opacity: 0, y: 20, duration: 0.8 }, 1.9)
            .to(smoke, { power: 0.35, duration: 1.2, ease: "power1.out" }, 1.6);

          // Os frascos ficam flutuando devagar, como se não tivessem peso.
          gsap.utils.toArray<HTMLElement>(".trio-float").forEach((el, i) => {
            gsap.to(el, { y: -14, rotation: i % 2 ? 1.5 : -1.5, duration: 2.6 + i * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
          });

          if (desktop) {
            const movers = gsap.utils.toArray<HTMLElement>(".trio-depth").map((el, i) => ({
              x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
              y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
              depth: [18, 30, 22][i] ?? 20,
            }));
            const onMove = (e: PointerEvent) => {
              const dx = e.clientX / window.innerWidth - 0.5;
              const dy = e.clientY / window.innerHeight - 0.5;
              movers.forEach((m) => {
                m.x(dx * m.depth * 2);
                m.y(dy * m.depth);
              });
            };
            window.addEventListener("pointermove", onMove);
            return () => window.removeEventListener("pointermove", onMove);
          }
        },
      );

      return () => {
        stop();
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <section className="trio" ref={root} aria-label="Os mais desejados do Japão">
      <canvas className="trio-smoke" ref={canvas} aria-hidden="true" />
      <div className="trio-glow" aria-hidden="true" />
      <div className="wrap trio-in">
        <div className="trio-head">
          <div className="eyebrow">Os mais desejados do Japão</div>
          <h2>
            O cabelo das japonesas, <em>em três frascos.</em>
          </h2>
        </div>
        <div className="trio-stage">
          {items.map((item, i) => (
            <figure key={item.src} className={`trio-item trio-${i}`}>
              <div className="trio-depth">
                <div className="trio-float">
                  <div className="trio-img">
                    <Image src={item.src} alt={item.alt} fill sizes="(max-width: 1023px) 60vw, 30vw" />
                  </div>
                </div>
              </div>
              <figcaption className="trio-cap">
                <small>{item.brand}</small>
                <b>{item.name}</b>
                <span>{item.line}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <Link className="btn btn-red trio-cta" href="/produtos?categoria=cabelo">
          Ver os tratamentos
        </Link>
      </div>
    </section>
  );
}
