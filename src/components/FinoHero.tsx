"use client";

// Abertura de cinema da linha Fino: a tela começa escura, um clarão revela a foto oficial,
// uma gota de sérum cai da pipeta no pote, partículas de luz brilham e um reflexo passa pelos frascos (GSAP).
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Line } from "@/lib/lines";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Medidas da foto larga (em pixels). Tudo que é desenhado por cima usa essas coordenadas.
const W = 2560;
const H = 930;
// Ponta da pipeta, de onde cai a gota, e a tampa do pote, onde ela pousa.
const DROP = { x: 1090, y: 338 };
const LAND = 585;

type Spark = { x: number; y: number; r: number; t: number; speed: number; drift: number };

// Partículas de luz desenhadas num canvas, concentradas no halo atrás dos frascos.
function startSparkles(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  let w = 0;
  let h = 0;
  const sparks: Spark[] = [];
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
  const count = Math.round(Math.min(Math.max(w / 1440, 0.4), 1) * 70);
  for (let i = 0; i < count; i++) {
    sparks.push({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.8,
      t: Math.random() * Math.PI * 2,
      speed: 0.01 + Math.random() * 0.03,
      drift: 0.00005 + Math.random() * 0.0002,
    });
  }
  const tick = () => {
    ctx.clearRect(0, 0, w, h);
    for (const s of sparks) {
      s.t += s.speed;
      s.y -= s.drift;
      if (s.y < -0.02) s.y = 1.02;
      const a = Math.max(0, Math.sin(s.t)) ** 3;
      if (a < 0.02) continue;
      const x = s.x * w;
      const y = s.y * h;
      const g = ctx.createRadialGradient(x, y, 0, x, y, s.r * 6);
      g.addColorStop(0, `rgba(255,255,255,${0.95 * a})`);
      g.addColorStop(0.3, `rgba(255,228,238,${0.35 * a})`);
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(x - s.r * 6, y - s.r * 6, s.r * 12, s.r * 12);
      // Cruz de brilho nas partículas maiores.
      if (s.r > 1.8) {
        ctx.strokeStyle = `rgba(255,255,255,${0.6 * a})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(x - s.r * 5, y);
        ctx.lineTo(x + s.r * 5, y);
        ctx.moveTo(x, y - s.r * 5);
        ctx.lineTo(x, y + s.r * 5);
        ctx.stroke();
      }
    }
  };
  gsap.ticker.add(tick);
  return () => {
    gsap.ticker.remove(tick);
    window.removeEventListener("resize", resize);
  };
}

export function FinoHero({ line }: { line: Line }) {
  const root = useRef<HTMLElement>(null);
  const sparkles = useRef<HTMLCanvasElement>(null);
  const kv = line.heroKv!;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { reduce } = context.conditions as Record<string, boolean>;
          if (reduce) {
            gsap.set(".fh-curtain, .fh-flare", { autoAlpha: 0 });
            return;
          }
          const stop = sparkles.current ? startSparkles(sparkles.current) : () => {};

          // Entrada: escuro, clarão no halo, a foto aparece e o texto sobe.
          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .fromTo(".fh-flare", { scale: 0.1, opacity: 0 }, { scale: 1.4, opacity: 1, duration: 0.9, ease: "power2.in" })
            .to(".fh-curtain", { autoAlpha: 0, duration: 1.4, ease: "power2.inOut" }, 0.55)
            .to(".fh-flare", { scale: 2.6, autoAlpha: 0, duration: 1.6, ease: "power2.out" }, 0.9)
            .from(".fh-photo", { scale: 1.14, filter: "blur(18px) brightness(1.7)", duration: 2.2 }, 0.55)
            .from(".fh-eyebrow", { opacity: 0, letterSpacing: "0.6em", duration: 1.4 }, 1.2)
            .from(".fh-line", { yPercent: 110, duration: 1.1, stagger: 0.12 }, 1.3)
            .from(".fh-sub, .fh-cta", { y: 24, opacity: 0, filter: "blur(8px)", duration: 1, stagger: 0.12 }, 1.8);

          // Gota de sérum: cresce na pipeta, cai e abre um anel de luz na tampa do pote.
          gsap
            .timeline({ repeat: -1, repeatDelay: 1.6, delay: 2.6 })
            .fromTo(".fh-drop", { attr: { cy: DROP.y }, scale: 0.2, opacity: 1, transformOrigin: "50% 0%" }, { scale: 1, duration: 1.6, ease: "sine.out" })
            .to(".fh-drop", { attr: { cy: LAND }, scaleY: 1.35, duration: 0.55, ease: "power2.in" })
            .set(".fh-drop", { opacity: 0 })
            .fromTo(".fh-splash", { attr: { rx: 4, ry: 1.5 }, opacity: 0.9 }, { attr: { rx: 70, ry: 14 }, opacity: 0, duration: 0.9, ease: "power2.out" }, "<");

          // Reflexo de luz que atravessa os frascos de tempos em tempos.
          gsap
            .timeline({ repeat: -1, repeatDelay: 4, delay: 3.2 })
            .fromTo(".fh-shine", { xPercent: -150 }, { xPercent: 450, duration: 2.6, ease: "power2.inOut" })
            .fromTo(".fh-shine", { opacity: 0 }, { opacity: 1, duration: 0.6, yoyo: true, repeat: 1, repeatDelay: 1.4 }, 0);
          // Halo respirando devagar.
          gsap.to(".fh-halo", { scale: 1.08, opacity: 0.85, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });

          // Ao rolar: a foto se afasta devagar e o texto some, como um corte de cena.
          gsap
            .timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 } })
            .to(".fh-photo", { yPercent: 10, scale: 1.06, ease: "none" }, 0)
            .to(".fh-copy", { yPercent: -30, opacity: 0, ease: "none" }, 0);

          return stop;
        },
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  const words = line.title.split(", ");

  return (
    <section className="fh" ref={root} aria-label={`${line.brand} ${line.name}`}>
      <div className="fh-stage">
        <div className="fh-photo">
          <Image className="fh-wide" src={kv.wide} alt={kv.alt} width={W} height={H} priority sizes="(max-width: 767px) 1px, 100vw" />
          <Image className="fh-tall" src={kv.tall} alt={kv.alt} width={750} height={706} priority sizes="(max-width: 767px) 100vw, 1px" />
          <svg className="fh-over" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
            <defs>
              <radialGradient id="fh-drop-g" cx=".35" cy=".3" r=".8">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset=".55" stopColor="#f3e9ef" />
                <stop offset="1" stopColor="#b9aeb8" />
              </radialGradient>
              <radialGradient id="fh-halo-g">
                <stop offset="0" stopColor="rgba(255,255,255,.75)" />
                <stop offset=".45" stopColor="rgba(255,236,244,.25)" />
                <stop offset="1" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
            </defs>
            <circle className="fh-halo" cx="1290" cy="350" r="330" fill="url(#fh-halo-g)" opacity=".55" style={{ transformOrigin: "1290px 350px" }} />
            <ellipse className="fh-drop" cx={DROP.x} cy={DROP.y} rx="9" ry="12" fill="url(#fh-drop-g)" stroke="rgba(150,140,150,.45)" strokeWidth="1" />
            <ellipse className="fh-splash" cx={DROP.x} cy={LAND + 8} rx="4" ry="1.5" fill="none" stroke="rgba(255,255,255,.95)" strokeWidth="3" opacity="0" />
          </svg>
          <span className="fh-shine" aria-hidden="true" />
        </div>
        <canvas className="fh-sparkles" ref={sparkles} aria-hidden="true" />
      </div>

      <div className="wrap fh-in">
        <div className="fh-copy">
          <div className="eyebrow fh-eyebrow">{line.eyebrow}</div>
          <h1>
            {words.map((w, i) => (
              <span key={w} className="fh-mask">
                <span className="fh-line">
                  {w}
                  {i < words.length - 1 ? "," : ""}
                </span>
              </span>
            ))}
          </h1>
          <p className="fh-sub">{line.subtitle}</p>
          <div className="fh-cta">
            <Link className="btn btn-red" href="#comprar">
              Comprar agora
            </Link>
            <Link className="btn fh-ghost" href="#sobre">
              Conhecer a linha
            </Link>
          </div>
        </div>
      </div>

      <div className="fh-curtain" aria-hidden="true" />
      <div className="fh-flare" aria-hidden="true" />
    </section>
  );
}
