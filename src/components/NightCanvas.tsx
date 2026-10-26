"use client";

import { useEffect, useRef } from "react";

// Fundo animado da abertura: luzes desfocadas de uma rua à noite e chuva fina.
export function NightCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const colors = ["179,52,43", "184,155,98", "239,233,223", "120,140,200"];
    let width = 0;
    let height = 0;
    let frame = 0;
    let lights: { x: number; y: number; r: number; c: string; a: number; s: number; p: number }[] = [];
    let rain: { x: number; y: number; l: number; v: number }[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lights = Array.from({ length: Math.max(18, Math.round(width / 22)) }, () => ({
        x: Math.random() * width,
        y: height * 0.35 + Math.random() * height * 0.65,
        r: 6 + Math.random() * 26,
        c: colors[Math.floor(Math.random() * colors.length)],
        a: 0.05 + Math.random() * 0.18,
        s: 0.05 + Math.random() * 0.2,
        p: Math.random() * 6,
      }));
      rain = Array.from({ length: Math.round(width / 9) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        l: 8 + Math.random() * 18,
        v: 3 + Math.random() * 4,
      }));
    };

    const draw = (t: number) => {
      const bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, "#0f0e0d");
      bg.addColorStop(1, "#1d1512");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      for (const l of lights) {
        const alpha = l.a * (0.7 + 0.3 * Math.sin(t / 1400 + l.p));
        const g = ctx.createRadialGradient(l.x, l.y, 0, l.x, l.y, l.r);
        g.addColorStop(0, `rgba(${l.c},${alpha})`);
        g.addColorStop(1, `rgba(${l.c},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(l.x, l.y, l.r, 0, Math.PI * 2);
        ctx.fill();
        if (!reduce) {
          l.x += l.s;
          if (l.x > width + 30) l.x = -30;
        }
      }

      ctx.strokeStyle = "rgba(239,233,223,.07)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const d of rain) {
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 2, d.y + d.l);
        if (!reduce) {
          d.y += d.v;
          if (d.y > height) {
            d.y = -20;
            d.x = Math.random() * width;
          }
        }
      }
      ctx.stroke();

      if (!reduce) frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
