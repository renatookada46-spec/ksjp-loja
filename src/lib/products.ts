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
};

export const categories: Category[] = [
  { slug: "skincare", name: "Skincare", description: "Hidratação e tratamento" },
  { slug: "protetor-solar", name: "Protetor solar", description: "Texturas leves" },
  { slug: "cabelo", name: "Cabelo", description: "Escovas e tratamentos" },
  { slug: "maquiagem", name: "Maquiagem", description: "Canmake, Kate, Kose" },
  { slug: "kits", name: "Kits", description: "Até US$ 50, sem susto" },
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
  },
  {
    slug: "shiseido-fino-mascara-capilar",
    brand: "Shiseido",
    name: "Fino Máscara Capilar Premium",
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
    capColor: "#b3342b",
    tone: "#e4dccf",
    badge: { label: "Kit" },
    description:
      "Óleo de limpeza, loção hialurônica e protetor solar. A rotina completa, montada para ficar dentro do limite de US$ 50.",
    howToUse: "Limpeza à noite, loção de manhã e à noite, protetor solar todas as manhãs.",
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
