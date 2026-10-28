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
  theme?: "rose"; // cor da abertura sem foto: dourado (padrão) ou rosa perolado
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
    heroImage: "/linhas/refa-honey-queen/hero.webp",
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
  {
    slug: "fino-premium-touch",
    brand: "Fino",
    name: "Premium Touch",
    eyebrow: "Shiseido Fino Premium Touch",
    title: "Cabelo de salão, em casa.",
    subtitle: "A linha de tratamento da Shiseido que virou clássico nas farmácias do Japão: máscara, leite e óleo para o cabelo danificado.",
    theme: "rose",
    lead: {
      title: "Cinco minutos no banho, o dia inteiro de maciez.",
      text: "A máscara Fino é uma das mais vendidas do Japão há anos. Com textura de sérum concentrado, ela trata os danos do dia a dia, e o leite e o óleo sem enxágue mantêm o cabelo protegido e com brilho até a próxima lavagem.",
    },
    products: ["shiseido-fino-mascara-capilar", "shiseido-fino-hair-milk", "shiseido-fino-hair-oil"],
    kits: [],
    about: {
      title: "Tratamento de salão, na rotina de casa.",
      items: [
        {
          name: "Fórmula concentrada",
          text: "A máscara tem textura densa, de sérum, que envolve o fio e age em poucos minutos. Feita para cabelo danificado por química, secador e chapinha.",
        },
        {
          name: "Cuidado que continua fora do banho",
          text: "O leite e o óleo são sem enxágue. Protegem do calor, controlam o frizz e selam as pontas, sem pesar nem deixar o cabelo oleoso.",
        },
      ],
    },
    scene: {
      title: "Textura cremosa, toque sedoso e um perfume floral suave.",
      text: "A máscara espalha fácil e enxágua rápido. Depois, uma pequena quantidade de leite ou de óleo basta para deixar o cabelo leve, solto e com brilho.",
    },
    steps: [
      {
        title: "Tratar",
        text: "Depois do shampoo, tire o excesso de água e aplique a máscara no comprimento e nas pontas. Deixe agir de 3 a 5 minutos e enxágue.",
        tip: "Use 2 a 3 vezes por semana, ou todo dia se o cabelo estiver muito danificado.",
        product: "shiseido-fino-mascara-capilar",
      },
      {
        title: "Proteger",
        text: "Com o cabelo úmido, espalhe o leite no comprimento e nas pontas antes de secar.",
        tip: "Ele protege do calor do secador e da chapinha.",
        product: "shiseido-fino-hair-milk",
      },
      {
        title: "Finalizar",
        text: "Com o cabelo seco, aplique 1 a 2 pumps de óleo nas pontas para selar e dar brilho.",
        tip: "Comece com pouco e aumente se precisar.",
        product: "shiseido-fino-hair-oil",
      },
    ],
    faq: [
      {
        q: "Os produtos são originais?",
        a: "Sim. Compramos em loja oficial no Japão e guardamos a nota. São os mesmos produtos vendidos lá.",
      },
      {
        q: "O preço é o mesmo do Japão?",
        a: "Sim. Os produtos saem pelo preço da loja japonesa, convertido para reais, sem acréscimo. Ao pedido somam-se o frete da caixa (por quilo) e o serviço por caixa.",
      },
      {
        q: "Preciso usar os três?",
        a: "Não. A máscara sozinha já faz diferença. O leite e o óleo são para quem quer proteger do calor e manter o brilho fora do banho. Escolha um dos dois ou use os dois juntos.",
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
