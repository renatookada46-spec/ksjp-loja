import Link from "next/link";

export default function NotFound() {
  return (
    <div className="paper">
      <section className="block wrap" style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-start" }}>
        <div className="eyebrow">Página não encontrada</div>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Esse produto saiu da prateleira.</h1>
        <p>O endereço pode ter mudado. Veja a coleção completa.</p>
        <Link className="btn btn-red" href="/produtos">Ver a coleção</Link>
      </section>
    </div>
  );
}
