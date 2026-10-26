import Link from "next/link";
import { categories } from "@/lib/products";

export function Categories() {
  const tiles = [
    ...categories.map((c) => ({ href: `/produtos?categoria=${c.slug}`, name: c.name, description: c.description })),
    { href: "/produtos", name: "Mais vendidos", description: "Os favoritos do Japão" },
  ];

  return (
    <section className="block wrap" aria-label="Categorias">
      <div className="head">
        <div className="head-t">
          <div className="eyebrow">Explore</div>
          <h2>Por onde começar</h2>
        </div>
      </div>
      <div className="cats">
        {tiles.map((t) => (
          <Link key={t.name} className="cat" href={t.href}>
            <span className="ring" aria-hidden="true" />
            <div>
              <b>{t.name}</b>
              <small>{t.description}</small>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
