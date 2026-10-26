import { site } from "@/lib/site";

export function Curator() {
  return (
    <section className="block wrap" aria-label="Curadoria">
      <div className="cur">
        {/* Trocar pela foto real da curadora em /public/curadora.jpg */}
        <div className="portrait">Foto da curadora<br />nas lojas do Japão</div>
        <div className="cur-copy">
          <div className="eyebrow">Quem escolhe</div>
          <blockquote>“Eu leio cada rótulo, testo e só trago o que eu mesma usaria.”</blockquote>
          <p>
            Cada produto da {site.name} é escolhido pessoalmente nas drogarias e lojas de
            departamento do Japão, como Matsumoto Kiyoshi, Loft e Ainz &amp; Tulpe. Nada de
            revendedor no meio do caminho.
          </p>
          <div className="sign"><b>Nome da curadora</b> · Curadora, mora no Japão</div>
        </div>
      </div>
    </section>
  );
}
