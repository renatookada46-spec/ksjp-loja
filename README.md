# KSJP: loja de beleza japonesa

Loja virtual em português do Brasil que vende skincare e beleza japonesa, com envio do Japão para o Brasil. Preços só em reais, pagamento no Pix ou cartão.

## Tecnologias

| Parte | Ferramenta |
| --- | --- |
| Site | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 |
| Banco de dados (Etapa 2) | Supabase (PostgreSQL, fotos e login do painel) |
| Pagamento (Etapa 3) | Mercado Pago Checkout Pro (Pix e cartão) |
| Hospedagem (Etapa 5) | Vercel, no domínio ksjp.app |

## Estrutura de pastas

```
src/
  app/
    layout.tsx               Estrutura de todas as páginas (fontes, cabeçalho, rodapé)
    page.tsx                 Página inicial
    globals.css              Todo o visual da loja (cores, tamanhos, celular e tablet)
    not-found.tsx            Página de "não encontrado"
    produtos/page.tsx        Lista de produtos com filtro por categoria
    produtos/[slug]/page.tsx Página de cada produto
  components/                Blocos da loja (abertura, vitrine, kits, curadoria...)
  lib/
    site.ts                  Nome da loja, WhatsApp e Instagram
    products.ts              Catálogo de exemplo (vai para o Supabase na Etapa 2)
    format.ts                Formatação de preço em reais
```

## Como rodar no seu computador

1. Instale o [Node.js](https://nodejs.org) versão 20 ou mais nova.
2. Abra o terminal na pasta do projeto e rode `npm install`.
3. Copie `.env.example` para `.env.local` e preencha o WhatsApp da loja.
4. Rode `npm run dev` e abra http://localhost:3000.

## Comandos

- `npm run dev`: abre a loja em modo de desenvolvimento.
- `npm run build`: gera a versão de produção (o mesmo que a Vercel faz).
- `npm run lint`: procura erros no código.

## Onde mudar as coisas

- **Nome da loja, WhatsApp e Instagram:** `src/lib/site.ts` e `.env.local`.
- **Produtos e preços:** `src/lib/products.ts`, até a Etapa 2.
- **Cores:** as variáveis no topo de `src/app/globals.css`.
- **Imagem da abertura:** troque `public/hero.webp` por outra imagem com o mesmo nome.
- **Assistente virtual:** o que ela sabe vem de `src/lib/assistant.ts` (catálogo e regras). A rota fica em `src/app/api/assistente/route.ts` e a janela em `src/components/Assistant.tsx`. Precisa da variável `ANTHROPIC_API_KEY` na Vercel.
- **Logo:** o texto vem de `src/lib/site.ts` e a pétala de `src/components/SakuraPetal.tsx`.

## Etapas

- [x] Etapa 1: vitrine, página de produto e visual cinema
- [x] Assistente virtual com IA (Claude) respondendo dúvidas
- [ ] Etapa 2: cadastro de clientes e painel admin (pausada)
- [ ] Etapa 3: carrinho e checkout Mercado Pago
- [ ] Etapa 4: pedidos, confirmação de pagamento e e-mails
- [ ] Etapa 5: publicar na Vercel com o ksjp.app
