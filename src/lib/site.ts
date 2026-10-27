// Dados gerais da loja. Troque aqui o nome, contatos e redes sociais.
export const site = {
  name: "KSJP",
  tagline: "Beleza japonesa original, direto do Japão para o Brasil.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ksjp.app",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "",
  instagram: "https://instagram.com/",
  installments: 3,
};

// Regras de compra por encomenda. Usadas no aviso de atenção e na página /regras.
export const rules = {
  depositPercent: 60,
  serviceFee: 150,
  holdDays: 15,
};

// Cotação usada para mostrar o preço da loja japonesa em reais. Atualize quando o câmbio mudar.
// Exemplo: 0.036 quer dizer que 1 iene vale R$ 0,036 (¥ 1.000 = R$ 36).
export const exchange = {
  yenToReal: 0.036,
};

// Converte o preço da loja japonesa (em ienes) para reais, sem acréscimo.
export function fromYen(yen: number) {
  return Math.round(yen * exchange.yenToReal * 100) / 100;
}

export function whatsappLink(message: string) {
  const text = encodeURIComponent(message);
  return site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${text}`
    : `https://wa.me/?text=${text}`;
}
