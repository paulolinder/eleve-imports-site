# Eleve Imports

Vitrine digital de produtos importados premium — iPhones originais e perfumes árabes exclusivos.

**Stack:** Nuxt 4 · TypeScript · Tailwind CSS v4 · Appwrite · Cloudflare Pages

---

## Sumário

- [Requisitos](#requisitos)
- [Setup local](#setup-local)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Appwrite — banco de dados](#appwrite--banco-de-dados)
- [Deploy na Cloudflare Pages](#deploy-na-cloudflare-pages)
- [Comandos disponíveis](#comandos-disponíveis)

---

## Requisitos

- Node.js >= 20
- npm >= 10

---

## Setup local

```bash
# Clonar o repositório
git clone https://github.com/paulolinder/eleve-imports.git
cd eleve-imports

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Preencha os valores no .env

# Rodar em desenvolvimento
npm run dev
```

O servidor de desenvolvimento estará disponível em `http://localhost:3000`.

---

## Variáveis de ambiente

Copie `.env.example` para `.env` e preencha:

| Variável | Descrição |
|---|---|
| `APPWRITE_ENDPOINT` | URL do servidor Appwrite |
| `APPWRITE_PROJECT_ID` | ID do projeto no Appwrite |
| `APPWRITE_API_KEY` | API Key do Appwrite (**nunca versionar**) |
| `NUXT_PUBLIC_SITE_URL` | URL pública do site (ex: `https://eleveimports.com.br`) |

> A `APPWRITE_API_KEY` é usada apenas no server-side (Nitro). Nunca é exposta ao cliente.

---

## Estrutura do projeto

```
EleveImports/
├── app/                        # Source dir (Nuxt 4)
│   ├── assets/css/             # Tailwind v4 + design system
│   ├── components/
│   │   ├── layout/             # AppHeader, AppFooter
│   │   ├── sections/           # Seções da homepage
│   │   ├── products/           # ProductCard, ProductGrid
│   │   └── ui/                 # UiButton, UiBadge
│   ├── composables/            # useProducts, useCategories, useFormatPrice
│   ├── layouts/
│   ├── pages/
│   │   ├── index.vue           # Homepage
│   │   ├── catalogo/
│   │   │   ├── index.vue       # Catálogo com filtros
│   │   │   └── [slug].vue      # Página de produto
│   │   ├── sobre.vue
│   │   └── contato.vue
│   └── app.vue
├── data/                       # Mock data (fallback)
├── lib/appwrite/               # Cliente Appwrite (browser)
├── server/
│   ├── api/                    # Rotas da API
│   └── utils/appwrite.ts       # Cliente Appwrite (server)
├── types/                      # Tipos TypeScript
├── public/                     # Assets estáticos
├── nuxt.config.ts
└── .env.example
```

---

## Appwrite — banco de dados

### Database ID

```
eleve_imports_db
```

### Collections necessárias

#### `products`

| Campo | Tipo | Obrigatório |
|---|---|---|
| `name` | String | Sim |
| `slug` | String (único) | Sim |
| `shortDescription` | String | Sim |
| `description` | String | Sim |
| `price` | Float | Sim |
| `priceOriginal` | Float | Não |
| `currency` | Enum: BRL | Sim |
| `brand` | String | Sim |
| `categoryId` | String | Sim |
| `categorySlug` | String | Sim |
| `categoryName` | String | Sim |
| `images` | String[] | Não |
| `thumbnailUrl` | String | Não |
| `availability` | Enum: available/out_of_stock/coming_soon | Sim |
| `isFeatured` | Boolean | Sim |
| `isNew` | Boolean | Sim |
| `tags` | String[] | Não |
| `seoTitle` | String | Não |
| `seoDescription` | String | Não |

#### `categories`

| Campo | Tipo | Obrigatório |
|---|---|---|
| `name` | String | Sim |
| `slug` | String (único) | Sim |
| `description` | String | Não |
| `thumbnailUrl` | String | Não |
| `icon` | String | Não |
| `order` | Integer | Sim |
| `isActive` | Boolean | Sim |
| `seoTitle` | String | Não |
| `seoDescription` | String | Não |

### Permissões recomendadas

- **Leitura pública** para `products` e `categories` (role: `any`)
- **Escrita restrita** à API Key do servidor (role: `users` ou via API Key)

---

## Deploy na Cloudflare Pages

### 1. Build

```bash
npm run build
```

O output será gerado em `.output/`.

### 2. Configuração no painel Cloudflare Pages

| Campo | Valor |
|---|---|
| Framework preset | Nuxt.js |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `20` |

### 3. Variáveis de ambiente no Cloudflare

Configure no painel de **Environment variables**:

- `APPWRITE_ENDPOINT`
- `APPWRITE_PROJECT_ID`
- `APPWRITE_API_KEY` (marcar como **secret**)
- `NUXT_PUBLIC_SITE_URL`
- `NODE_ENV=production`

> Variáveis marcadas como Secret não aparecem nos logs de build.

### 4. Compatibilidade Workers

O preset `cloudflare-pages` do Nitro usa o **Cloudflare Workers** para o server-side. Certifique-se de que as permissões de `node-appwrite` são compatíveis com o runtime Workers (a versão usada já é compatível).

---

## Comandos disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run generate     # Geração estática
npm run typecheck    # Verificação de tipos
npm run lint         # Lint com ESLint
npm run lint:fix     # Lint com correção automática
npm run format       # Formatar com Prettier
```

---

## Próximos passos (roadmap)

- [ ] Configurar Storage do Appwrite para imagens de produtos
- [ ] Criar painel admin simples (Appwrite Console ou custom)
- [ ] Implementar busca com Appwrite Full-Text Search
- [ ] Adicionar Analytics (Cloudflare Analytics ou Plausible)
- [ ] Implementar integração WhatsApp com template de mensagem por produto
- [ ] Adicionar página de blog para SEO de conteúdo
- [ ] Configurar OG Image dinâmica por produto (`nuxt-og-image`)
- [ ] Adicionar testes E2E com Playwright
