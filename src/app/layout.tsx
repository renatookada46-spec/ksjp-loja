import type { Metadata, Viewport } from "next";
import { Shippori_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/lib/site";
import "./globals.css";

const display = Shippori_Mincho({
  variable: "--font-display",
  weight: ["400", "600", "800"],
  subsets: ["latin"],
  display: "swap",
});

const body = Zen_Kaku_Gothic_New({
  variable: "--font-body",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Beleza japonesa original`,
    template: `%s | ${site.name}`,
  },
  description:
    "Skincare e beleza escolhidos a dedo em lojas oficiais do Japão e enviados direto para você no Brasil. Pague em reais, no Pix ou no cartão.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0e0d",
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
