"use client";

// Abertura com foto: abelha voando em volta do mel, gota caindo da colher e mel escorrendo do topo (GSAP).
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
// Ponta da colher de mel, de onde cai a gota.
const DROP = { x: 1040, y: 538 };
// Caminho de voo da abelha: sai de baixo, sobe até a colher, rodeia o mel e volta.
const FLIGHT =
  "M330,660 C430,560 520,430 740,390 C930,350 1150,250 1225,370 C1290,480 1150,600 1050,560 C930,515 960,400 1090,420 C1240,445 1270,690 1020,760 C780,830 430,790 330,660 Z";

// Gotas que escorrem do topo: posição (0 a 1440), largura e tamanho máximo.
const DRIPS = [
  [40, 22, 70], [150, 30, 110], [250, 18, 55], [370, 26, 95], [500, 34, 130], [610, 20, 60],
  [730, 28, 105], [860, 22, 75], [980, 32, 125], [1090, 18, 50], [1210, 28, 100], [1340, 24, 80],
] as const;

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
        // Entrada: texto e foto aparecem, depois o mel começa a escorrer.
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".hh-photo", { opacity: 0, scale: 1.06, filter: "blur(12px)", duration: 1.6 })
          .from(".hh-copy > *", { y: 30, opacity: 0, filter: "blur(10px)", duration: 1, stagger: 0.12 }, 0.3);

        // Mel do topo: cada gota estica e encolhe no seu ritmo.
        gsap.utils.toArray<SVGRectElement>(".hh-drip").forEach((el) => {
          const max = Number(el.dataset.max);
          gsap.fromTo(
            el,
            { attr: { height: 18 } },
            { attr: { height: max }, duration: gsap.utils.random(2.6, 5), ease: "sine.inOut", yoyo: true, repeat: -1, delay: gsap.utils.random(0, 2) },
          );
        });
        // Algumas gotas se soltam e caem.
        gsap.utils.toArray<SVGCircleElement>(".hh-fall").forEach((el, i) => {
          gsap
            .timeline({ repeat: -1, delay: 1.5 + i * 1.3, repeatDelay: gsap.utils.random(2, 4) })
            .fromTo(el, { attr: { r: 0 }, y: 0, opacity: 1 }, { attr: { r: Number(el.dataset.r) }, duration: 1.2, ease: "sine.out" })
            .to(el, { y: 420, scaleY: 1.3, opacity: 0, duration: 1.1, ease: "power2.in", transformOrigin: "50% 0%" });
        });

        // Gota que cai da colher.
        gsap
          .timeline({ repeat: -1, repeatDelay: 0.8, delay: 1 })
          .fromTo(".hh-drop", { scale: 0.2, y: 0, opacity: 1, transformOrigin: "50% 0%" }, { scale: 1, duration: 1.4, ease: "sine.out" })
          .to(".hh-drop", { y: 360, scaleY: 1.5, opacity: 0, duration: 0.7, ease: "power2.in" });

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
      <svg className="hh-top" viewBox="0 0 1440 180" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
        <defs>
          <linearGradient id="hh-honey" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f7c75a" />
            <stop offset="1" stopColor="#d4870f" />
          </linearGradient>
          <filter id="hh-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="b" />
            <feColorMatrix in="b" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" />
          </filter>
        </defs>
        <g filter="url(#hh-goo)" fill="url(#hh-honey)">
          <rect x="-20" y="-10" width="1480" height="34" />
          {DRIPS.map(([x, w, max]) => (
            <rect key={x} className="hh-drip" x={x} y="10" width={w} height="18" rx={w / 2} data-max={max} />
          ))}
          {DRIPS.filter((_, i) => i % 3 === 1).map(([x, w, max]) => (
            <circle key={`f${x}`} className="hh-fall" cx={x + w / 2} cy={max + 4} r="0" data-r={w / 2.4} />
          ))}
        </g>
        <rect x="-20" y="2" width="1480" height="5" fill="rgba(255,255,255,.35)" />
      </svg>

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
              <radialGradient id="hh-drop-g" cx=".35" cy=".3" r=".8">
                <stop offset="0" stopColor="#ffe29a" />
                <stop offset=".5" stopColor="#e8a124" />
                <stop offset="1" stopColor="#b8650a" />
              </radialGradient>
              <linearGradient id="hh-bee-body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f6c445" />
                <stop offset="1" stopColor="#c47a10" />
              </linearGradient>
              <clipPath id="hh-bee-clip">
                <ellipse cx="-6" cy="0" rx="20" ry="12.5" />
              </clipPath>
            </defs>
            <path className="hh-flight" d={FLIGHT} fill="none" stroke="none" />
            <ellipse className="hh-drop" cx={DROP.x} cy={DROP.y} rx="8" ry="10" fill="url(#hh-drop-g)" />
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
