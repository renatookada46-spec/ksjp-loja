import Link from "next/link";
import { site } from "@/lib/site";
import { SakuraPetal } from "./SakuraPetal";

const links = [
  { href: "/linhas/refa-honey-queen", label: "Honey Queen" },
  { href: "/produtos?categoria=skincare", label: "Skincare" },
  { href: "/produtos?categoria=protetor-solar", label: "Protetor solar" },
  { href: "/produtos?categoria=cabelo", label: "Cabelo" },
  { href: "/produtos?categoria=maquiagem", label: "Maquiagem" },
  { href: "/produtos?categoria=kits", label: "Kits" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap nav">
        <Logo />
        <nav className="menu" aria-label="Categorias">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        {/* A sacola ganha contador e carrinho de verdade na Etapa 3. */}
        <Link className="cart" href="/produtos">
          Ver coleção
        </Link>
      </div>
    </header>
  );
}

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label={`${site.name}, página inicial`}>
      <span>{site.name}</span>
      <SakuraPetal className="petal" />
    </Link>
  );
}
