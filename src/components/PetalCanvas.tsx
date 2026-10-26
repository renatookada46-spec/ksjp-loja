"use client";

import { useEffect, useRef } from "react";

type Petal = { x: number; y: number; size: number; speed: number; drift: number; angle: number; spin: number; phase: number; alpha: number };

// Pétalas de sakura caindo devagar por cima da imagem da abertura.
export function PetalCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let petals: Petal[] = [];

    const spawn = (anywhere: boolean): Petal => ({
      x: Math.random() * width,
      y: anywhere ? Math.random() * height : -20,
      size: 5 + Math.random() * 7,
      speed: 0.35 + Math.random() * 0.6,
      drift: 0.2 + Math.random() * 0.5,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.03,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.55 + Math.random() * 0.4,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      petals = Array.from({ length: Math.round(Math.min(30, Math.max(12, width / 48))) }, () => spawn(true));
    };

    const drawPetal = (p: Petal) => {
      const s = p.size;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.scale(1, 0.75 + 0.25 * Math.sin(p.phase * 2));
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = "#f2a9bf";
      ctx.beginPath();
      ctx.moveTo(0, s);
      ctx.bezierCurveTo(-s * 1.1, s * 0.2, -s * 0.7, -s * 0.9, -s * 0.15, -s);
      ctx.lineTo(0, -s * 0.75);
      ctx.lineTo(s * 0.15, -s);
      ctx.bezierCurveTo(s * 0.7, -s * 0.9, s * 1.1, s * 0.2, 0, s);
      ctx.fill();
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of petals) {
        p.phase += 0.012;
        p.y += p.speed;
        p.x += Math.sin(p.phase) * p.drift + 0.25;
        p.angle += p.spin;
        if (p.y > height + 20 || p.x > width + 20) Object.assign(p, spawn(false));
        drawPetal(p);
      }
      frame = requestAnimationFrame(draw);
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
