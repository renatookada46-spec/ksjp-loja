// Catálogo de exemplo da Etapa 1. Na Etapa 2 estes dados passam a vir do Supabase.

export type CategorySlug =
  | "skincare"
  | "protetor-solar"
  | "cabelo"
  | "maquiagem"
  | "kits";

export type Category = {
  slug: CategorySlug;
  name: string;
  description: string;
  intro: string; // texto de abertura da página da categoria
};

export type ProductShape = "bottle" | "tube" | "jar";

export type Product = {
  slug: string;
  brand: string;
  name: string;
  category: CategorySlug;
  price: number;
  size: string;
  shape: ProductShape;
  color: string;
  capColor: string;
  tone: string;
  badge?: { label: string; highlight?: boolean };
  bestSeller?: boolean;
  description: string;
  howToUse: string;
  // Campos da página premium. Todos opcionais: preencha aos poucos.
  images?: string[]; // fotos em /public/produtos/<slug>/, ex.: "/produtos/<slug>/1.webp"
  tagline?: string; // uma frase que dá vontade de comprar
  highlights?: string[]; // até 3 benefícios curtos
  forWho?: string[]; // tipos de pele ou de cabelo
  texture?: string;
  ingredients?: { name: string; benefit: string }[];
  curatorNote?: string; // por que a curadoria escolheu este produto
  pairsWith?: string[]; // slugs de produtos que combinam
};

export const categories: Category[] = [
  { slug: "skincare", name: "Skincare", description: "Hidratação e tratamento", intro: "Loções, séruns e limpeza que fazem a fama da pele japonesa. Texturas leves, resultado de verdade." },
  { slug: "protetor-solar", name: "Protetor solar", description: "Texturas leves", intro: "O Japão leva o sol a sério. Protetores altos, leves e invisíveis, feitos para usar todos os dias." },
  { slug: "cabelo", name: "Cabelo", description: "Escovas e tratamentos", intro: "Os tratamentos que os salões de Tóquio usam, para cabelo macio, brilhante e com movimento." },
  { slug: "maquiagem", name: "Maquiagem", description: "Canmake, Kate, Kose", intro: "Cores delicadas e acabamento natural, do jeito que as japonesas gostam." },
  { slug: "kits", name: "Kits", description: "Rotinas prontas para presentear", intro: "Rotinas completas montadas pela curadoria. Uma caixa só, pronta para presentear." },
];

export const products: Product[] = [
  {
    slug: "hada-labo-gokujyun-locao-hialuronica",
    brand: "Hada Labo",
    name: "Loção Gokujyun Hialurônica",
    category: "skincare",
    price: 89,
    size: "170 ml",
    shape: "bottle",
    color: "#f4f6fa",
    capColor: "#2d5aa8",
    tone: "#d9e2ef",
    badge: { label: "Mais vendido", highlight: true },
    bestSeller: true,
    description:
      "A loção hidratante mais vendida do Japão. Tem quatro tipos de ácido hialurônico e deixa a pele macia e com aspecto saudável, sem pesar.",
    howToUse:
      "Depois de lavar o rosto, aplique na palma da mão e espalhe com leves batidinhas até absorver. Use de manhã e à noite.",
    tagline: "Hidratação profunda que a pele bebe em segundos.",
    highlights: ["4 tipos de ácido hialurônico", "Sem fragrância e sem corante", "Textura que não pesa"],
    forWho: ["Todos os tipos de pele", "Pele seca", "Pele desidratada"],
    texture: "Loção levemente encorpada",
    ingredients: [{"name": "Ácido hialurônico", "benefit": "Segura a água na pele e deixa o toque macio."}, {"name": "Ácido hialurônico nano", "benefit": "Partículas menores que hidratam as camadas mais fundas."}],
    curatorNote: "É o frasco que mais some das prateleiras das farmácias japonesas. Simples, honesto e funciona.",
    pairsWith: ["dhc-oleo-de-limpeza", "biore-uv-aqua-rich-watery-essence"],
  },
  {
    slug: "anessa-perfect-uv-gel-fps50",
    brand: "Anessa",
    name: "Protetor Perfect UV Gel FPS 50+",
    category: "protetor-solar",
    price: 159,
    size: "90 g",
    shape: "tube",
    color: "#f0d06a",
    capColor: "#1b1b1b",
    tone: "#efe0b5",
    badge: { label: "Verão" },
    bestSeller: true,
    description:
      "Protetor solar em gel de alta proteção, resistente a água e suor. Textura leve que não deixa a pele branca.",
    howToUse:
      "Aplique como último passo do skincare, 15 minutos antes de sair ao sol. Reaplique a cada 2 horas.",
    tagline: "A proteção que aguenta sol, praia e calor.",
    highlights: ["FPS 50+ PA++++", "Resistente a água e suor", "Não deixa a pele branca"],
    forWho: ["Todos os tipos de pele", "Praia e esporte", "Dias de calor forte"],
    texture: "Gel fresco",
    ingredients: [{"name": "Filtros UVA e UVB", "benefit": "Proteção alta contra queimadura e manchas."}, {"name": "Tecnologia Auto Booster", "benefit": "A proteção fica mais forte com calor, suor e água."}],
    curatorNote: "O protetor que as japonesas levam para a praia. A gente usa o verão inteiro.",
    pairsWith: ["dhc-oleo-de-limpeza", "hada-labo-gokujyun-locao-hialuronica"],
  },
  {
    slug: "biore-uv-aqua-rich-watery-essence",
    brand: "Biore",
    name: "UV Aqua Rich Watery Essence",
    category: "protetor-solar",
    price: 79,
    size: "70 g",
    shape: "tube",
    color: "#4aa3df",
    capColor: "#f4f4f4",
    tone: "#cfe3f0",
    bestSeller: true,
    description:
      "O protetor queridinho do Japão, com textura de essência aquosa. Seca rápido e funciona bem embaixo da maquiagem.",
    howToUse: "Espalhe uma quantidade generosa no rosto e no pescoço. Reaplique ao longo do dia.",
    tagline: "Leve como água, protege como deve.",
    highlights: ["FPS 50+ PA++++", "Textura aquosa", "Ótimo por baixo da maquiagem"],
    forWho: ["Pele oleosa", "Pele mista", "Uso diário"],
    texture: "Essência aquosa em gel",
    ingredients: [{"name": "Ácido hialurônico", "benefit": "Hidrata sem deixar a pele pesada."}, {"name": "Filtros UVA e UVB", "benefit": "Proteção alta para o dia a dia."}],
    curatorNote: "Para quem odeia sentir protetor no rosto. Ele some na pele.",
    pairsWith: ["hada-labo-gokujyun-locao-hialuronica", "melano-cc-serum-vitamina-c"],
  },
  {
    slug: "melano-cc-serum-vitamina-c",
    brand: "Melano CC",
    name: "Sérum Vitamina C Intensivo",
    category: "skincare",
    price: 99,
    size: "20 ml",
    shape: "bottle",
    color: "#f0c419",
    capColor: "#d9a90c",
    tone: "#f3e3ad",
    badge: { label: "Novo" },
    bestSeller: true,
    description:
      "Sérum com vitamina C pura que ajuda a uniformizar o tom da pele e suavizar manchas de espinhas.",
    howToUse: "À noite, aplique 2 ou 3 gotas nas áreas com manchas, antes do hidratante.",
    tagline: "Vitamina C para manchas e pele sem brilho.",
    highlights: ["Vitamina C ativa", "Age em manchas e marcas", "Conta-gotas preciso"],
    forWho: ["Manchas", "Marcas de acne", "Pele opaca"],
    texture: "Sérum leve, levemente oleoso",
    ingredients: [{"name": "Vitamina C", "benefit": "Clareia e uniformiza o tom da pele."}, {"name": "Vitamina E", "benefit": "Ajuda a proteger a pele."}],
    curatorNote: "Um clássico japonês que custa pouco e entrega muito. Comece usando à noite.",
    pairsWith: ["biore-uv-aqua-rich-watery-essence", "hada-labo-gokujyun-locao-hialuronica"],
  },
  {
    slug: "kose-sekkisei-locao",
    brand: "Kose",
    name: "Sekkisei Loção Clareadora",
    category: "skincare",
    price: 219,
    size: "140 ml",
    shape: "bottle",
    color: "#8fc9c4",
    capColor: "#e9eef0",
    tone: "#d4e8e5",
    bestSeller: true,
    description:
      "Clássico japonês com extratos de plantas que deixa a pele luminosa e com textura uniforme.",
    howToUse: "Aplique com algodão ou com as mãos, depois de lavar o rosto, de manhã e à noite.",
    tagline: "O segredo da pele luminosa das japonesas.",
    highlights: ["Extratos de ervas orientais", "Ilumina e uniformiza", "Sensação refrescante"],
    forWho: ["Pele opaca", "Pele mista a oleosa", "Tom irregular"],
    texture: "Loção aquosa",
    ingredients: [{"name": "Extrato de coix", "benefit": "Ilumina e acalma a pele."}, {"name": "Extrato de angélica", "benefit": "Ajuda a deixar o tom mais uniforme."}],
    curatorNote: "O frasco azul que está em toda penteadeira japonesa. Um luxo do dia a dia.",
    pairsWith: ["anessa-perfect-uv-gel-fps50", "dhc-oleo-de-limpeza"],
  },
  {
    slug: "shiseido-fino-mascara-capilar",
    brand: "Fino",
    name: "Máscara Capilar Premium Touch",
    category: "cabelo",
    price: 89,
    size: "230 g",
    shape: "jar",
    color: "#f2f2f2",
    capColor: "#c9a646",
    tone: "#ece4d3",
    bestSeller: true,
    description:
      "Máscara de tratamento intensivo que recupera fios danificados e deixa o cabelo macio e brilhante.",
    howToUse: "Depois do shampoo, aplique no comprimento e nas pontas, deixe agir de 3 a 5 minutos e enxágue.",
    tagline: "Cabelo de salão, em casa, em 5 minutos.",
    highlights: ["Maciez e brilho", "Ação rápida", "Para cabelo danificado"],
    forWho: ["Cabelo danificado", "Cabelo seco", "Química e escova"],
    texture: "Máscara cremosa",
    ingredients: [{"name": "Geleia real", "benefit": "Nutrição profunda para os fios."}, {"name": "Óleos nutritivos", "benefit": "Brilho e toque sedoso."}],
    curatorNote: "A máscara capilar mais vendida do Japão. Um pote dura meses.",
    pairsWith: ["canmake-cream-cheek-sakura"],
  },
  {
    slug: "canmake-cream-cheek-sakura",
    brand: "Canmake",
    name: "Blush Cream Cheek Edição Sakura",
    category: "maquiagem",
    price: 59,
    size: "2,3 g",
    shape: "jar",
    color: "#f5c6cf",
    capColor: "#e8a9b6",
    tone: "#f3dde0",
    badge: { label: "Edição limitada", highlight: true },
    bestSeller: true,
    description: "Blush cremoso de cor delicada que se funde à pele e dá um efeito natural de bochecha corada.",
    howToUse: "Aplique com a ponta dos dedos nas maçãs do rosto e esfume com batidinhas.",
    tagline: "Bochecha corada e natural, em segundos.",
    highlights: ["Textura cremosa", "Efeito natural", "Fácil de esfumar"],
    forWho: ["Todos os tipos de pele", "Maquiagem leve"],
    texture: "Creme",
    curatorNote: "Edição da estação, daquelas que esgotam rápido no Japão.",
    pairsWith: ["biore-uv-aqua-rich-watery-essence"],
  },
  {
    slug: "dhc-oleo-de-limpeza",
    brand: "DHC",
    name: "Óleo de Limpeza Deep Cleansing",
    category: "skincare",
    price: 139,
    size: "200 ml",
    shape: "bottle",
    color: "#e9c46a",
    capColor: "#3a7d44",
    tone: "#efe2bd",
    bestSeller: true,
    description:
      "Óleo de limpeza com azeite de oliva que remove maquiagem e protetor solar sem ressecar a pele.",
    howToUse: "Com o rosto seco, massageie o óleo por 30 segundos, adicione água para emulsionar e enxágue.",
    tagline: "Remove tudo e deixa a pele macia, sem repuxar.",
    highlights: ["Óleo de oliva", "Tira maquiagem e protetor", "Não deixa resíduo"],
    forWho: ["Todos os tipos de pele", "Quem usa maquiagem ou protetor"],
    texture: "Óleo que vira leite com água",
    ingredients: [{"name": "Óleo de oliva", "benefit": "Limpa e suaviza ao mesmo tempo."}, {"name": "Vitamina E", "benefit": "Ajuda a proteger a pele."}],
    curatorNote: "O primeiro passo da dupla limpeza japonesa. Depois dele, você não volta atrás.",
    pairsWith: ["hada-labo-gokujyun-locao-hialuronica", "anessa-perfect-uv-gel-fps50"],
  },
  {
    slug: "kit-rotina-hidratacao",
    brand: "KSJP",
    name: "Kit Rotina Hidratação",
    category: "kits",
    price: 249,
    size: "3 produtos",
    shape: "jar",
    color: "#2a2420",
    capColor: "#e892b0",
    tone: "#e4dccf",
    badge: { label: "Kit" },
    description:
      "Óleo de limpeza, loção hialurônica e protetor solar. A rotina completa, montada para ficar dentro do limite de US$ 50.",
    howToUse: "Limpeza à noite, loção de manhã e à noite, protetor solar todas as manhãs.",
    tagline: "A rotina japonesa completa, numa caixa só.",
    highlights: ["3 passos", "Limpeza, hidratação e proteção", "Pronto para presentear"],
    forWho: ["Quem está começando", "Presente"],
    texture: "Três texturas leves",
    curatorNote: "Se você não sabe por onde começar, comece por aqui.",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function bestSellers() {
  return products.filter((p) => p.bestSeller);
}
