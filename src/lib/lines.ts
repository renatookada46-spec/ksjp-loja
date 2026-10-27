// Linhas de produtos com página própria (estilo página de marca).
// Cada linha conta a história, mostra os produtos, o passo a passo e os kits para presente.

export type Line = {
  slug: string;
  brand: string;
  name: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  heroImage?: string; // foto grande da abertura, em /public/linhas/<slug>/
  lead: { title: string; text: string };
  products: string[]; // slugs dos produtos da linha, na ordem
  kits: string[];
  about: { title: string; items: { name: string; text: string; image?: string }[] };
  scene?: { title: string; text: string; fragrance?: { name: string; notes: { label: string; value: string }[] } };
  steps: { title: string; text: string; tip?: string; product?: string }[];
  faq: { q: string; a: string }[];
};

export const lines: Line[] = [
  {
    slug: "refa-honey-queen",
    brand: "ReFa",
    name: "Honey Queen",
    eyebrow: "ReFa Honey Queen",
    title: "Cabelo de mel, denso e hidratado.",
    subtitle: "Com geleia real da abelha rainha, a linha de cabelo mais desejada da ReFa no Japão.",
    lead: {
      title: "Depois de um dia puxado, um ritual de recompensa.",
      text: "A geleia real é o alimento reservado só para a abelha rainha. Na Honey Queen, ela se junta ao mel e às ceramidas numa fórmula que parece um sérum, feita para reparar o cabelo danificado e devolver maciez e brilho.",
    },
    products: [
      "refa-honey-queen-shampoo",
      "refa-honey-queen-treatment",
      "refa-honey-queen-outbath",
      "refa-honey-queen-scalp",
    ],
    kits: ["refa-honey-queen-kit-duo", "refa-honey-queen-kit-trio"],
    about: {
      title: "A ciência do mel que hidrata o fio por dentro.",
      items: [
        {
          name: "Geleia real da abelha rainha",
          text: "Tem mais de 40 nutrientes, como aminoácidos, vitamina B e minerais. Combina com os aminoácidos do próprio fio e hidrata em nível de reparação, junto com ceramidas e vitamina C.",
        },
        {
          name: "Mel",
          text: "Usado na beleza desde o Egito e a Grécia antigos. Atrai e segura a água, forma uma barreira de hidratação e protege o cabelo dos danos do dia a dia.",
        },
      ],
    },
    scene: {
      title: "Espuma cremosa de mel: hidratação farta e cabelo com elasticidade.",
      text: "Muito mel costuma deixar o shampoo sem espuma. A ReFa escolheu agentes de limpeza suaves para ter as duas coisas: delicadeza com o fio e uma espuma densa, que envolve o cabelo.",
      fragrance: {
        name: "Perfume Honey Queen Limão",
        notes: [
          { label: "Saída", value: "Limão, verbena e lichia" },
          { label: "Coração", value: "Mel, gerânio e peônia" },
          { label: "Fundo", value: "Ládano, almíscar, sândalo e âmbar" },
        ],
      },
    },
    steps: [
      {
        title: "Lavar",
        text: "Molhe bem o cabelo, faça um pouco de espuma com o shampoo e lave fios e couro cabeludo com a ponta dos dedos.",
        tip: "Enxágue bem para não deixar shampoo no couro cabeludo.",
        product: "refa-honey-queen-shampoo",
      },
      {
        title: "Tratar",
        text: "Tire o excesso de água, espalhe o treatment no cabelo todo e enxágue.",
        tip: "Passe um pente para espalhar por igual.",
        product: "refa-honey-queen-treatment",
      },
      {
        title: "Finalizar",
        text: "Com o cabelo úmido ou seco, aplique o óleo do meio do comprimento até as pontas.",
        tip: "Comece com pouco: duas gotas já fazem efeito.",
        product: "refa-honey-queen-outbath",
      },
      {
        title: "Cuidado extra",
        text: "Use a escova durante o shampoo para massagear e limpar o couro cabeludo.",
        product: "refa-honey-queen-scalp",
      },
    ],
    faq: [
      {
        q: "Os produtos são originais?",
        a: "Sim. Compramos em loja oficial no Japão e guardamos a nota. São os mesmos frascos vendidos lá.",
      },
      {
        q: "O preço é o mesmo do Japão?",
        a: "Sim. Os produtos saem pelo preço da loja japonesa, convertido para reais, sem acréscimo. Ao pedido somam-se o frete da caixa (por quilo) e o serviço por caixa.",
      },
      {
        q: "Serve para cabelo cacheado ou com química?",
        a: "A linha é feita para cabelo danificado e ressecado, e pode ser usada em cabelo com química. Para couro cabeludo sensível, faça um teste antes.",
      },
      {
        q: "Como funciona o pagamento?",
        a: "Você paga 60% no pedido e os 40% restantes quando pedir o envio, no Pix ou no cartão. Leia as regras de compra antes.",
      },
      {
        q: "Quem paga a taxa dos Correios?",
        a: "A taxa de retirada no Brasil (imposto de importação e Correios) é por conta do cliente e é cobrada na chegada da caixa.",
      },
    ],
  },
];

export function getLine(slug: string) {
  return lines.find((l) => l.slug === slug);
}
