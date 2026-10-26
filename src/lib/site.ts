// Dados gerais da loja. Troque aqui o nome, contatos e redes sociais.
export const site = {
  name: "Kirei",
  tagline: "Beleza japonesa original, direto do Japão para o Brasil.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ksjp.app",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "",
  instagram: "https://instagram.com/",
  installments: 3,
};

export function whatsappLink(message: string) {
  const text = encodeURIComponent(message);
  return site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${text}`
    : `https://wa.me/?text=${text}`;
}
