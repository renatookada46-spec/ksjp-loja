"use client";

// Abertura com foto: abelha voando em volta do mel (GSAP).
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Line } from "@/lib/lines";

gsap.registerPlugin(useGSAP, MotionPathPlugin);

// Medidas da foto (em pixels). Tudo que é desenhado por cima usa essas coordenadas.
const W = 1500;
const H = 935;
// Caminho de voo da abelha: sai de baixo, sobe até a colher, rodeia o mel e volta.
const FLIGHT =
  "M330,660 C430,560 520,430 740,390 C930,350 1150,250 1225,370 C1290,480 1150,600 1050,560 C930,515 960,400 1090,420 C1240,445 1270,690 1020,760 C780,830 430,790 330,660 Z";

function Bee() {
  return (
    <g className="hh-bee-flip">
      <g className="hh-bee-bob">
        <g className="hh-wing hh-wing-back">
          <ellipse cx="-4" cy="-17" rx="15" ry="8" transform="rotate(-28 -4 -17)" fill="rgba(255,255,255,.55)" stroke="rgba(90,70,50,.45)" strokeWidth="1" />
        </g>
        <ellipse cx="-6" cy="0" rx="20" ry="12.5" fill="url(#hh-bee-body)" />
        <g clipPath="url(#hh-bee-clip)" fill="#2b1a08">
          <rect x="-17" y="-14" width="5" height="28" />
          <rect x="-7" y="-14" width="5.5" height="28" />
          <rect x="3" y="-14" width="5" height="28" />
        </g>
        <path d="M-26,0 L-33,-2.5 L-33,2.5 Z" fill="#2b1a08" />
        <circle cx="16" cy="-1" r="8.5" fill="#2b1a08" />
        <circle cx="19.5" cy="-3" r="2.2" fill="#fff" opacity=".7" />
        <path d="M18,-8 C21,-16 25,-19 29,-19 M14,-8 C15,-17 18,-21 22,-22" stroke="#2b1a08" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path d="M-10,11 l-3,7 M-2,12 l-1,7 M6,11 l2,7" stroke="#2b1a08" strokeWidth="1.6" strokeLinecap="round" />
        <g className="hh-wing hh-wing-front">
          <ellipse cx="-1" cy="-18" rx="17" ry="9" transform="rotate(-12 -1 -18)" fill="rgba(255,255,255,.7)" stroke="rgba(90,70,50,.5)" strokeWidth="1" />
        </g>
      </g>
    </g>
  );
}

export function HoneyHero({ line }: { line: Line }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Entrada: texto e foto aparecem.
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".hh-photo", { opacity: 0, scale: 1.06, filter: "blur(12px)", duration: 1.6 })
          .from(".hh-copy > *", { y: 30, opacity: 0, filter: "blur(10px)", duration: 1, stagger: 0.12 }, 0.3);

        // Abelha: asas batendo, voo pelo caminho e um leve sobe e desce.
        gsap.to(".hh-wing", { scaleY: 0.25, duration: 0.035, repeat: -1, yoyo: true, ease: "none", transformOrigin: "50% 100%" });
        gsap.to(".hh-bee-bob", { y: -6, duration: 0.45, repeat: -1, yoyo: true, ease: "sine.inOut" });
        const bee = root.current?.querySelector<SVGGElement>(".hh-bee");
        const flip = root.current?.querySelector<SVGGElement>(".hh-bee-flip");
        let lastX = 0;
        gsap.to(".hh-bee", {
          duration: 16,
          repeat: -1,
          ease: "none",
          motionPath: { path: ".hh-flight", align: ".hh-flight", alignOrigin: [0.5, 0.5] },
          onUpdate() {
            if (!bee || !flip) return;
            const x = Number(gsap.getProperty(bee, "x"));
            if (Math.abs(x - lastX) > 0.3) gsap.set(flip, { scaleX: x < lastX ? -1 : 1, transformOrigin: "50% 50%" });
            lastX = x;
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section className="hh" ref={root} aria-label={`${line.brand} ${line.name}`}>

      <div className="wrap hh-in">
        <div className="hh-copy">
          <div className="eyebrow">{line.eyebrow}</div>
          <h1>{line.title}</h1>
          <p>{line.subtitle}</p>
          <div className="hh-cta">
            <Link className="btn btn-red" href="#comprar">
              Comprar agora
            </Link>
            <Link className="btn btn-ink" href="#sobre">
              Conhecer a linha
            </Link>
          </div>
        </div>
        <div className="hh-photo">
          <Image src={line.heroImage!} alt={`${line.brand} ${line.name} Shampoo com mel`} fill priority sizes="(max-width: 1023px) 100vw, 60vw" />
          <svg className="hh-over" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
            <defs>
              <linearGradient id="hh-bee-body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f6c445" />
                <stop offset="1" stopColor="#c47a10" />
              </linearGradient>
              <clipPath id="hh-bee-clip">
                <ellipse cx="-6" cy="0" rx="20" ry="12.5" />
              </clipPath>
            </defs>
            <path className="hh-flight" d={FLIGHT} fill="none" stroke="none" />
            <g className="hh-bee" transform="translate(330 660)">
              <g transform="scale(1.9)">
                <Bee />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
