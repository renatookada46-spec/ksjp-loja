import Link from "next/link";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Categories } from "@/components/Categories";
import { ProductGrid } from "@/components/ProductCard";
import { Kits } from "@/components/Kits";
import { Ritual } from "@/components/Ritual";
import { Curator } from "@/components/Curator";
import { HowItWorks } from "@/components/HowItWorks";
import { WhatsAppNotice } from "@/components/WhatsAppNotice";
import { bestSellers } from "@/lib/products";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <div className="paper">
        <Categories />
        <section className="block wrap" aria-label="Mais vendidos">
          <div className="head">
            <div className="head-t">
              <div className="eyebrow">Mais vendidos no Japão</div>
              <h2>A vitrine desta semana</h2>
            </div>
            <Link className="link" href="/produtos">Ver todos os produtos</Link>
          </div>
          <ProductGrid products={bestSellers().slice(0, 8)} />
        </section>
      </div>
      <Ritual />
      <Kits />
      <div className="paper">
        <Curator />
        <HowItWorks />
      </div>
      <section className="wrap wa-band" aria-label="Dúvidas">
        <WhatsAppNotice />
      </section>
    </>
  );
}
