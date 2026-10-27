import Link from "next/link";
import { Logo } from "./Header";
import { PaymentMethods } from "./PaymentMethods";
import { site, whatsappLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot">
          <div>
            <Logo />
            <p>{site.tagline}</p>
            <PaymentMethods />
          </div>
          <div>
            <h4>Loja</h4>
            <ul>
              <li><Link href="/produtos?categoria=skincare">Skincare</Link></li>
              <li><Link href="/produtos?categoria=protetor-solar">Protetor solar</Link></li>
              <li><Link href="/produtos?categoria=cabelo">Cabelo</Link></li>
              <li><Link href="/produtos?categoria=kits">Kits</Link></li>
            </ul>
          </div>
          <div>
            <h4>Ajuda</h4>
            <ul>
              <li><Link href="/regras">Regras de compra</Link></li>
              <li><Link href="/#como-funciona">Prazos e frete</Link></li>
              <li><Link href="/#kits">Impostos</Link></li>
              <li><a href={whatsappLink("Olá! Tenho uma dúvida antes de comprar.")} target="_blank" rel="noopener noreferrer">Dúvidas antes de comprar</a></li>
            </ul>
          </div>
          <div>
            <h4>Siga</h4>
            <ul>
              <li><a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href={whatsappLink("Olá! Tenho uma dúvida antes de comprar.")} target="_blank" rel="noopener noreferrer">WhatsApp (só dúvidas antes de comprar)</a></li>
            </ul>
          </div>
        </div>
        <div className="legal">
          © {new Date().getFullYear()} {site.name}. Produtos e preços desta versão são exemplos.
        </div>
      </div>
    </footer>
  );
}
