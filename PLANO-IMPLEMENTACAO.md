# Plano de Implementação — Eleve Imports

**Projeto:** Site vitrine + CRM integrado
**Stack:** Nuxt 4 · TypeScript · Tailwind v4 · Appwrite · Cloudflare Pages
**Versão do plano:** 1.0 — Abril 2026

---

## Visão geral

A Eleve Imports é uma vitrine digital de importados premium (iPhones e perfumes árabes).
O projeto vai além de um site estático: é um ecossistema completo com site público otimizado para SEO, painel administrativo (CRM) para gestão de produtos, clientes, pedidos e comunicação, tudo integrado ao Appwrite como backend.

### Princípios norteadores

- **SEO first** — Cada decisão de arquitetura, URL, conteúdo e performance prioriza ranqueamento orgânico
- **Mobile first** — 80%+ do tráfego virá de mobile; toda UI é desenhada para telas pequenas antes
- **Performance extrema** — Core Web Vitals no verde (LCP < 2.5s, CLS < 0.1, INP < 200ms)
- **Conversão via WhatsApp** — O funil termina no WhatsApp; cada página facilita esse caminho
- **Manutenção simples** — O dono do negócio precisa conseguir gerenciar produtos e clientes sem suporte técnico

---

## Arquitetura geral

```
┌──────────────────────────────────────────────────────────┐
│                    CLOUDFLARE PAGES                       │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐ │
│  │  Site Público│  │  Painel CRM  │  │  API (Nitro)    │ │
│  │  (SSG/SWR)  │  │  (/admin)    │  │  /api/*         │ │
│  └──────┬──────┘  └──────┬───────┘  └────────┬────────┘ │
│         │                │                    │          │
│         └────────────────┴────────────────────┘          │
│                          │                               │
└──────────────────────────┼───────────────────────────────┘
                           │
                    ┌──────┴──────┐
                    │  APPWRITE   │
                    │  Backend    │
                    ├─────────────┤
                    │ Database    │
                    │ Storage     │
                    │ Auth        │
                    │ Functions   │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
        ┌─────┴────┐ ┌────┴─────┐ ┌───┴────┐
        │WhatsApp  │ │Analytics │ │Backups │
        │(wa.me)   │ │(Plausible│ │        │
        │          │ │ ou CF)   │ │        │
        └──────────┘ └──────────┘ └────────┘
```

---

## Fases de implementação

O projeto está dividido em 5 fases, cada uma entregando valor incremental.
A fase 1 já foi parcialmente executada (base do projeto).

---

## FASE 1 — Fundação (✅ parcialmente concluída)

> **Objetivo:** Estrutura base do projeto funcionando, buildando e com deploy possível.

### 1.1 Estrutura do projeto ✅

- [x] Inicializar Nuxt 4 com TypeScript
- [x] Configurar Tailwind v4 com design system (tokens gold/dark/cream)
- [x] Configurar ESLint + Prettier
- [x] Definir tipos TypeScript (Product, Category, SEO)
- [x] Criar estrutura de pastas profissional (app/, server/, types/, data/, lib/)

### 1.2 SEO base ✅

- [x] @nuxtjs/seo (sitemap, robots, schema-org, og-image)
- [x] Meta tags dinâmicas por página (useSeoMeta)
- [x] Schema.org: Organization, WebSite, WebPage, Product
- [x] robots.txt + sitemap.xml automáticos
- [x] Canonical URLs
- [x] Open Graph + Twitter Cards

### 1.3 Integração Appwrite ✅

- [x] Cliente browser (público, sem API Key)
- [x] Cliente server (Nitro, com API Key privada)
- [x] API routes com fallback mock → Appwrite
- [x] Variáveis de ambiente seguras (.env)

### 1.4 Layout e componentes base ✅

- [x] Layout default (header sticky + main + footer)
- [x] Header responsivo com menu mobile
- [x] Footer multi-coluna
- [x] Componentes UI (UiButton, UiBadge)
- [x] ProductCard, ProductGrid com skeleton loading

### 1.5 Páginas iniciais ✅

- [x] Homepage com Hero, Categorias, Destaques, Benefícios, CTA
- [x] /catalogo com filtros e busca
- [x] /catalogo/[slug] — página de produto
- [x] /sobre, /contato
- [x] Página de erro 404

### 1.6 Deploy base ✅

- [x] Preset Cloudflare Pages (Nitro)
- [x] Build limpo com prerender
- [x] Git + repositório remoto configurado

### 1.7 Pendências da Fase 1

- [ ] Criar collections reais no Appwrite (products, categories)
- [ ] Configurar Storage do Appwrite para imagens
- [ ] Fazer deploy real na Cloudflare Pages
- [ ] Conectar domínio eleveimports.com.br
- [ ] Configurar variáveis de ambiente no Cloudflare

---

## FASE 2 — Site público completo

> **Objetivo:** Site bonito, rápido, com conteúdo real, otimizado para conversão e SEO.

### 2.1 Design e identidade visual

- [ ] Criar logo profissional da Eleve Imports (SVG)
- [ ] Definir paleta final de cores (confirmar gold #C9A84C como primária)
- [ ] Criar OG Image template padrão (1200×630px)
- [ ] Criar OG Image dinâmica por produto (nuxt-og-image)
- [ ] Criar apple-touch-icon (180×180)
- [ ] Criar favicon.ico (fallback) + favicon.svg (moderno)
- [ ] Criar imagens placeholder profissionais para categorias
- [ ] Definir estilo fotográfico para produtos (fundo, iluminação, ângulos)

### 2.2 Homepage avançada

- [ ] Hero com imagem real de alta qualidade (ou vídeo curto)
- [ ] Carrossel/slider de produtos em destaque (Swiper ou Embla)
- [ ] Seção de "Novidades" com produtos recém-chegados
- [ ] Seção de depoimentos/avaliações de clientes reais
- [ ] Contador de clientes atendidos / pedidos entregues (social proof)
- [ ] Seção de "Como funciona" (passo a passo visual do processo de compra)
- [ ] Banner de promoção rotativo (gerenciável via CRM)
- [ ] Seção FAQ com accordion (schema FAQ markup)
- [ ] Lazy loading de seções abaixo da dobra

### 2.3 Catálogo avançado

- [ ] Filtros avançados: categoria, marca, faixa de preço, disponibilidade, ordenação
- [ ] URL persistente com filtros (query params: /catalogo?categoria=iphones&preco=5000-8000)
- [ ] Paginação ou infinite scroll com preservação de estado
- [ ] View mode: grid (2/3/4 colunas) e lista
- [ ] Busca com debounce e highlight de resultados
- [ ] Breadcrumbs com schema BreadcrumbList
- [ ] Contador de resultados
- [ ] Tags de filtro rápido (chips clicáveis)
- [ ] Skeleton loading consistente
- [ ] Empty state com sugestões

### 2.4 Página de produto completa

- [ ] Galeria de imagens com zoom (pinch-to-zoom mobile, hover desktop)
- [ ] Lightbox fullscreen para galeria
- [ ] Seletor de variantes (cor, armazenamento para iPhones)
- [ ] Tabela de especificações técnicas
- [ ] Accordion com: descrição, especificações, política de garantia
- [ ] Seção "Produtos relacionados" (mesma categoria)
- [ ] Seção "Você também pode gostar" (cross-sell entre categorias)
- [ ] Botão "Compartilhar" (Web Share API com fallback)
- [ ] WhatsApp com mensagem pré-preenchida com nome/link do produto
- [ ] Schema Product completo: preço, disponibilidade, review, brand, sku
- [ ] Breadcrumb: Home > Catálogo > Categoria > Produto
- [ ] Meta tags dinâmicas com imagem, preço, disponibilidade
- [ ] URL amigável: /catalogo/iphone-16-pro-max-256gb

### 2.5 Páginas institucionais

- [ ] /sobre — história, missão, valores, fotos da equipe/operação
- [ ] /contato — formulário funcional (salva no Appwrite), WhatsApp, Instagram, mapa
- [ ] /politica-de-privacidade — LGPD compliance
- [ ] /termos-de-uso
- [ ] /garantia — política de garantia detalhada
- [ ] /como-comprar — guia passo a passo com ícones
- [ ] /perguntas-frequentes — FAQ com schema markup

### 2.6 SEO avançado

- [ ] Cada categoria com H1 único, texto descritivo e meta description customizada
- [ ] Cada produto com title tag otimizada: "{Produto} | {Categoria} | Eleve Imports"
- [ ] Internal linking strategy: produtos linkam para categoria, categorias linkam entre si
- [ ] Sitemap dinâmico com todas as URLs de produtos e categorias
- [ ] hreflang (se expandir para outros idiomas futuramente)
- [ ] Structured data completo: Organization, LocalBusiness, Product, FAQ, BreadcrumbList, WebSite com SearchAction
- [ ] Core Web Vitals: otimizar LCP (hero image preload), CLS (dimensões fixas), INP (event handlers otimizados)
- [ ] Imagens: todas em WebP/AVIF, com alt text descritivo, lazy loading, srcset responsivo
- [ ] Preconnect para fontes Google e Appwrite Storage
- [ ] Link rel="preload" para fontes e CSS crítico
- [ ] Compressão: Brotli via Cloudflare
- [ ] Cache headers otimizados por tipo de recurso

### 2.7 Blog / Conteúdo SEO

- [ ] /blog — listagem de artigos com paginação
- [ ] /blog/[slug] — artigo individual com schema Article
- [ ] Categorias de blog: "Guias", "Comparativos", "Novidades"
- [ ] Collection "blog_posts" no Appwrite com campos: title, slug, content (markdown), excerpt, coverImage, author, category, tags, seoTitle, seoDescription, publishedAt, isPublished
- [ ] Composable `useBlogPosts()` e `useBlogPost(slug)`
- [ ] Artigos iniciais planejados:
  - "iPhone 16 Pro Max vs iPhone 15 Pro Max: qual vale mais a pena?"
  - "Guia completo de perfumes árabes: o que é oud, attar e mukhallat"
  - "Como saber se um iPhone importado é original"
  - "Os 5 perfumes árabes mais vendidos do Brasil"
  - "iPhone desbloqueado: tudo o que você precisa saber"
- [ ] Cada artigo com links internos para produtos e categorias relevantes
- [ ] Schema Article + Author + DatePublished

### 2.8 Performance e UX

- [ ] Page transitions suaves (Nuxt page transition)
- [ ] Loading states consistentes (skeleton, spinner)
- [ ] Error boundaries por seção (não quebra a página toda)
- [ ] Toast/notification system para feedback de ações
- [ ] Scroll-to-top button
- [ ] Acessibilidade: ARIA labels, focus management, contraste AA, keyboard navigation
- [ ] Print-friendly para página de produto (CSS @media print)
- [ ] PWA manifest (installable, offline basic)

### 2.9 Analytics e tracking

- [ ] Plausible Analytics ou Cloudflare Web Analytics (privacy-first, sem cookies)
- [ ] Eventos customizados: view_product, click_whatsapp, filter_used, search_query
- [ ] UTM tracking para campanhas (Instagram, WhatsApp)
- [ ] Google Search Console: verificação + submit sitemap
- [ ] Cloudflare Analytics dashboard

---

## FASE 3 — Appwrite: banco de dados e storage

> **Objetivo:** Dados reais, gerenciáveis, com estrutura robusta no Appwrite.

### 3.1 Database — collections

#### Collection: `products`

```
Campos:
├── name              String          required
├── slug              String          required, unique, indexed
├── shortDescription  String          required, max 200
├── description       String          required
├── price             Float           required
├── priceOriginal     Float           optional
├── currency          Enum[BRL]       required, default: BRL
├── brand             String          required, indexed
├── categoryId        String          required, indexed
├── categorySlug      String          required, indexed
├── categoryName      String          required
├── images            String[]        optional
├── thumbnailUrl      String          optional
├── availability      Enum[available, out_of_stock, coming_soon]  required, indexed
├── isFeatured        Boolean         required, default: false, indexed
├── isNew             Boolean         required, default: false
├── tags              String[]        optional
├── specifications    String          optional (JSON stringified)
├── variants          String          optional (JSON stringified)
├── seoTitle          String          optional
├── seoDescription    String          optional
├── seoKeywords       String[]        optional
├── order             Integer         optional, default: 0
└── $createdAt, $updatedAt           auto
```

Índices:
- `slug` (unique)
- `categorySlug` + `availability` (compound)
- `isFeatured` + `$createdAt` (compound)
- `brand` + `categorySlug` (compound)
- `name` (fulltext search)
- `tags` (fulltext search)

#### Collection: `categories`

```
Campos:
├── name              String          required
├── slug              String          required, unique, indexed
├── description       String          optional
├── thumbnailUrl      String          optional
├── icon              String          optional
├── order             Integer         required, default: 0
├── isActive          Boolean         required, default: true
├── seoTitle          String          optional
├── seoDescription    String          optional
└── seoKeywords       String[]        optional
```

#### Collection: `banners`

```
Campos:
├── title             String          required
├── subtitle          String          optional
├── imageUrl          String          required
├── imageMobileUrl    String          optional
├── linkTo            String          optional
├── ctaText           String          optional
├── position          Enum[hero, promo, category]  required
├── order             Integer         required, default: 0
├── isActive          Boolean         required, default: true
├── startsAt          DateTime        optional
└── endsAt            DateTime        optional
```

#### Collection: `contacts` (formulário de contato)

```
Campos:
├── name              String          required
├── email             String          optional
├── phone             String          required
├── message           String          required
├── source            Enum[site, whatsapp, instagram]  required
├── status            Enum[new, read, replied, archived]  required, default: new
├── notes             String          optional
└── $createdAt        auto
```

#### Collection: `customers` (CRM)

```
Campos:
├── name              String          required
├── phone             String          required, indexed
├── email             String          optional
├── instagram         String          optional
├── city              String          optional
├── state             String          optional
├── notes             String          optional
├── tags              String[]        optional
├── source            Enum[whatsapp, instagram, site, indicacao, outro]  required
├── totalPurchases    Integer         default: 0
├── totalSpent        Float           default: 0
├── lastPurchaseAt    DateTime        optional
├── status            Enum[lead, active, vip, inactive]  required, default: lead
└── $createdAt        auto
```

Índices:
- `phone` (unique)
- `status` (key)
- `tags` (fulltext)
- `name` (fulltext)

#### Collection: `orders` (pedidos/vendas)

```
Campos:
├── customerId        String          required, indexed
├── customerName      String          required
├── customerPhone     String          required
├── items             String          required (JSON: [{productId, name, price, qty}])
├── totalAmount       Float           required
├── status            Enum[pending, confirmed, paid, shipped, delivered, cancelled]  required, indexed
├── paymentMethod     Enum[pix, transfer, credit, other]  optional
├── trackingCode      String          optional
├── notes             String          optional
├── shippingAddress   String          optional
└── $createdAt        auto
```

#### Collection: `site_config`

```
Campos:
├── key               String          required, unique
├── value             String          required
├── type              Enum[string, number, boolean, json]  required
└── description       String          optional
```

Chaves previstas:
- `whatsapp_number` — número do WhatsApp principal
- `instagram_handle` — @ do Instagram
- `site_announcement` — texto de barra de anúncio
- `maintenance_mode` — true/false
- `featured_category` — slug da categoria em destaque

#### Collection: `blog_posts`

```
Campos:
├── title             String          required
├── slug              String          required, unique, indexed
├── excerpt           String          required, max 300
├── content           String          required (markdown)
├── coverImage        String          optional
├── author            String          required
├── category          String          required, indexed
├── tags              String[]        optional
├── seoTitle          String          optional
├── seoDescription    String          optional
├── isPublished       Boolean         required, default: false, indexed
├── publishedAt       DateTime        optional
└── $createdAt        auto
```

### 3.2 Storage

```
Buckets:
├── product-images     ← Imagens de produtos (público, read: any)
│   └── Max: 5MB, Tipos: jpg, jpeg, png, webp, avif
├── category-images    ← Thumbnails de categorias (público)
│   └── Max: 3MB
├── banner-images      ← Banners do site (público)
│   └── Max: 5MB
├── blog-images        ← Imagens de posts (público)
│   └── Max: 5MB
└── attachments        ← Arquivos internos do CRM (privado, read: users)
    └── Max: 10MB
```

### 3.3 Auth (Appwrite Authentication)

```
Métodos habilitados:
├── Email + Password     ← Login do admin/CRM
└── (futuro) Magic Link  ← Login simplificado

Roles:
├── admin    ← Acesso total ao CRM, CRUD de tudo
└── viewer   ← Apenas leitura (futuro: parceiros, equipe)
```

### 3.4 Permissões (Database Security)

```
products, categories, banners, blog_posts:
├── Read:  role("any")          ← Público (site precisa ler)
├── Create: role("users")       ← Apenas usuários autenticados
├── Update: role("users")
└── Delete: role("users")

customers, orders, contacts:
├── Read:   role("users")       ← Apenas admin autenticado
├── Create: role("users") + role("any") para contacts
├── Update: role("users")
└── Delete: role("users")

site_config:
├── Read:  role("any")
├── Write: role("users")
```

### 3.5 Migração de dados

- [ ] Script de seed: popular categories (iphones, perfumes-arabes)
- [ ] Script de seed: popular products iniciais com dados reais
- [ ] Script de seed: popular site_config com valores padrão
- [ ] Documentar processo de backup/restore

---

## FASE 4 — CRM / Painel administrativo

> **Objetivo:** Interface interna para gerenciar o negócio todo sem depender de desenvolvedor.

### 4.1 Arquitetura do CRM

O CRM será implementado como páginas protegidas dentro do mesmo projeto Nuxt, sob a rota `/admin`. Isso simplifica o deploy (um só build) e compartilha tipos, composables e integração Appwrite.

```
/admin
├── /admin/login                   ← Tela de login (Appwrite Auth)
├── /admin                         ← Dashboard
├── /admin/produtos                ← CRUD de produtos
│   ├── /admin/produtos/novo
│   └── /admin/produtos/[id]
├── /admin/categorias              ← CRUD de categorias
├── /admin/pedidos                 ← Gestão de pedidos
│   └── /admin/pedidos/[id]
├── /admin/clientes                ← CRM de clientes
│   ├── /admin/clientes/novo
│   └── /admin/clientes/[id]
├── /admin/contatos                ← Mensagens recebidas do site
├── /admin/blog                    ← CRUD de posts do blog
│   ├── /admin/blog/novo
│   └── /admin/blog/[id]
├── /admin/banners                 ← Gestão de banners
├── /admin/configuracoes           ← Site config
└── /admin/relatorios              ← Relatórios e métricas
```

### 4.2 Layout do CRM

- [ ] Layout separado: `layouts/admin.vue`
- [ ] Sidebar com navegação (collapsible em mobile)
- [ ] Top bar com: nome do usuário, botão de logout, link para o site
- [ ] Breadcrumbs em todas as páginas
- [ ] Tema: dark mode com tons de gold (consistente com marca)
- [ ] 100% responsivo — gerenciável pelo celular

### 4.3 Dashboard (`/admin`)

- [ ] Cards de resumo: total de produtos, pedidos do mês, faturamento, novos clientes
- [ ] Gráfico de vendas dos últimos 30 dias (chart.js ou unovis)
- [ ] Lista de pedidos recentes (5 últimos)
- [ ] Lista de contatos não lidos
- [ ] Atalhos rápidos: novo produto, novo pedido, ver site

### 4.4 Gestão de produtos (`/admin/produtos`)

- [ ] Lista com busca, filtro por categoria, filtro por status
- [ ] Tabela com: imagem, nome, categoria, preço, status, destaque, ações
- [ ] Bulk actions: ativar/desativar destaque, mudar disponibilidade
- [ ] Formulário de criação/edição:
  - Upload de imagens com drag-and-drop (salva no Appwrite Storage)
  - Preview da imagem
  - Reordenação de imagens
  - Campos de SEO com preview de como aparecerá no Google
  - Editor de descrição com markdown preview
  - Auto-geração de slug a partir do nome
  - Validação client-side em tempo real
- [ ] Botão "Ver no site" que abre o produto no frontend
- [ ] Duplicar produto (para criar variações rápido)

### 4.5 Gestão de categorias (`/admin/categorias`)

- [ ] Lista ordenável (drag-and-drop para reordenar)
- [ ] CRUD simples: nome, slug, descrição, imagem, ícone, SEO
- [ ] Contador de produtos por categoria
- [ ] Toggle ativo/inativo

### 4.6 Gestão de pedidos (`/admin/pedidos`)

- [ ] Lista com filtros: status, período, cliente
- [ ] Pipeline visual (kanban): pendente → confirmado → pago → enviado → entregue
- [ ] Detalhes do pedido: cliente, itens, valores, status, notas
- [ ] Edição de status com histórico de mudanças
- [ ] Campo de tracking (código de rastreio)
- [ ] Botão "Enviar atualização via WhatsApp" (abre wa.me com mensagem pré-preenchida)
- [ ] Criação manual de pedido (selecionar cliente + produtos)
- [ ] Resumo financeiro: total de pedidos por status

### 4.7 CRM de clientes (`/admin/clientes`)

- [ ] Lista com busca, filtro por status (lead, ativo, VIP, inativo)
- [ ] Ficha do cliente:
  - Dados pessoais (nome, telefone, email, Instagram, cidade/estado)
  - Tags (ex: "VIP", "atacado", "revendedor")
  - Histórico de pedidos
  - Total gasto e total de compras
  - Notas internas
  - Origem (WhatsApp, Instagram, site, indicação)
  - Data do último contato / última compra
- [ ] Botão "Chamar no WhatsApp" (wa.me com número do cliente)
- [ ] Botão "Ver no Instagram" (se preenchido)
- [ ] Importação básica de clientes (CSV)
- [ ] Segmentação: filtrar por tags, por valor gasto, por inatividade

### 4.8 Mensagens de contato (`/admin/contatos`)

- [ ] Lista com status: novo, lido, respondido, arquivado
- [ ] Badge de contatos não lidos no sidebar
- [ ] Detalhes: nome, telefone, mensagem, data, origem
- [ ] Ação: marcar como lido, responder via WhatsApp, arquivar

### 4.9 Blog (`/admin/blog`)

- [ ] Lista de posts com status: rascunho, publicado
- [ ] Editor markdown com preview side-by-side
- [ ] Upload de imagem de capa
- [ ] Campos SEO com preview
- [ ] Agendamento de publicação (publishedAt)
- [ ] Tags e categorias do blog

### 4.10 Banners (`/admin/banners`)

- [ ] Lista de banners com preview visual
- [ ] Upload de imagem desktop + mobile
- [ ] Configuração: link, CTA text, posição (hero/promo/category), período ativo
- [ ] Reordenação drag-and-drop
- [ ] Toggle ativo/inativo

### 4.11 Configurações (`/admin/configuracoes`)

- [ ] Edição do número de WhatsApp
- [ ] Edição do Instagram
- [ ] Barra de anúncio do site (texto + liga/desliga)
- [ ] Modo manutenção (liga/desliga)
- [ ] Categoria em destaque na home

### 4.12 Relatórios (`/admin/relatorios`)

- [ ] Vendas por período (dia, semana, mês)
- [ ] Produtos mais vendidos
- [ ] Categorias mais vendidas
- [ ] Clientes mais ativos
- [ ] Origem dos clientes (canal de aquisição)
- [ ] Ticket médio
- [ ] Exportação para CSV/Excel

### 4.13 Autenticação e segurança do CRM

- [ ] Login via Appwrite Auth (email + senha)
- [ ] Middleware de proteção: todas as rotas /admin requerem autenticação
- [ ] Redirect para /admin/login se não autenticado
- [ ] Session management (auto-logout após inatividade)
- [ ] Route rule: `/admin/**` NÃO é pré-renderizado (sempre SSR/CSR)
- [ ] Robots: `/admin/` está no disallow do robots.txt
- [ ] Rate limiting nas API routes do CRM

### 4.14 Componentes UI do CRM

- [ ] AdminTable — tabela com sort, search, pagination, bulk select
- [ ] AdminForm — formulário com validação, submit, loading states
- [ ] AdminModal — modal com confirm/cancel
- [ ] AdminUpload — drag-and-drop file upload com preview
- [ ] AdminStats — card de estatística com ícone e trend
- [ ] AdminChart — gráfico simples (barras, linhas)
- [ ] AdminBadge — status badges coloridos
- [ ] AdminSidebar — navegação lateral collapsible
- [ ] AdminToast — sistema de notificações
- [ ] AdminEmpty — empty states com ação

---

## FASE 5 — Otimização, integrações e crescimento

> **Objetivo:** Polir, automatizar, escalar.

### 5.1 WhatsApp avançado

- [ ] Botão flutuante de WhatsApp em todas as páginas (posição fixa, animado)
- [ ] Mensagem pré-preenchida por contexto:
  - Produto: "Olá! Tenho interesse no {produto} (R$ {preço}). Ref: {url}"
  - Categoria: "Olá! Quero ver os produtos de {categoria}."
  - Geral: "Olá! Quero saber mais sobre a Eleve Imports."
- [ ] Click-to-WhatsApp tracking (evento analytics)
- [ ] Integração futura: WhatsApp Business API (Evolution API ou similar) para:
  - Notificações automáticas de status de pedido
  - Mensagens de follow-up pós-compra
  - Broadcast de promoções para clientes segmentados

### 5.2 SEO contínuo

- [ ] Google Search Console: monitorar indexação, clicks, impressões
- [ ] Criar e manter 2 artigos de blog por mês (conteúdo SEO)
- [ ] Otimizar páginas com baixo CTR (melhorar title/description)
- [ ] Conquistar backlinks: parcerias com blogs de tech e perfumaria
- [ ] SEO local: Google Business Profile (se tiver endereço físico)
- [ ] Monitorar Core Web Vitals mensalmente
- [ ] A/B test de titles com Google Search Console data

### 5.3 Performance contínua

- [ ] Cloudflare Cache Rules otimizadas por tipo de conteúdo
- [ ] Image CDN: usar Cloudflare Images ou Appwrite Storage com transform
- [ ] Bundle analysis: monitorar tamanho do JS client
- [ ] Prefetch inteligente de produtos (on hover/viewport)
- [ ] Service Worker para cache offline de catálogo

### 5.4 Integrações futuras

- [ ] **Plausible/Umami Analytics** — analytics privacy-first self-hosted
- [ ] **Cloudflare Turnstile** — captcha no formulário de contato (anti-spam)
- [ ] **Email transacional** — confirmação de pedido, envio de tracking (Resend ou Brevo)
- [ ] **Integração com Instagram** — feed de posts na homepage
- [ ] **Webhook de pedidos** — notificar no Telegram/Discord quando novo pedido
- [ ] **PDF de recibo** — gerar recibo/comprovante de pedido no CRM
- [ ] **Multi-moeda** — suporte a USD/EUR para clientes internacionais

### 5.5 Expansão de catálogo

- [ ] Suporte a novas categorias (ex: Apple Watch, AirPods, acessórios)
- [ ] Página de "Comparar produtos" (side-by-side)
- [ ] Wishlist / "Avise-me quando disponível"
- [ ] Filtros avançados por especificação (storage, cor, modelo)
- [ ] Ordenação por relevância, preço, novidade

### 5.6 Automações no Appwrite

- [ ] Appwrite Function: ao criar pedido, atualizar totalPurchases e totalSpent do cliente
- [ ] Appwrite Function: ao produto ficar disponível, notificar clientes interessados
- [ ] Appwrite Function: backup automático semanal das collections
- [ ] Appwrite Function: cleanup de imagens órfãs no Storage

---

## Modelagem de URLs (SEO)

Cada URL é uma decisão de SEO. Estrutura planejada:

```
/                                            ← Homepage
/catalogo                                    ← Todos os produtos
/catalogo?categoria=iphones                  ← Filtro por categoria (query param)
/catalogo?categoria=perfumes-arabes
/catalogo?busca=iphone+16                    ← Busca
/catalogo/iphone-16-pro-max-256gb            ← Produto individual
/catalogo/oud-royal-100ml                    ← Produto individual
/sobre                                       ← Sobre a empresa
/contato                                     ← Contato
/como-comprar                                ← Guia de compra
/garantia                                    ← Política de garantia
/perguntas-frequentes                        ← FAQ
/politica-de-privacidade                     ← LGPD
/termos-de-uso                               ← Termos
/blog                                        ← Listagem do blog
/blog/iphone-16-vs-15-pro-max               ← Artigo
/blog/guia-perfumes-arabes-oud-attar         ← Artigo
/admin                                       ← CRM (não indexado)
/admin/login
/admin/produtos
/admin/pedidos
/admin/clientes
...
```

Regras:
- Slugs sempre em lowercase, sem acentos, separados por hífens
- Sem trailing slash
- Sem .html ou extensões
- Sem IDs numéricos na URL pública
- Canonicals em todas as páginas
- 301 redirects para URLs alteradas (manter via routeRules)

---

## Stack final detalhada

| Camada | Tecnologia | Justificativa |
|---|---|---|
| Framework | Nuxt 4 | SSR/SSG híbrido, SEO nativo, DX excelente |
| Linguagem | TypeScript strict | Segurança de tipos, manutenibilidade |
| CSS | Tailwind v4 | Utility-first, design system via @theme |
| Fontes | @nuxt/fonts (Inter + Playfair Display) | Auto-otimizado, self-hosted |
| Ícones | @nuxt/icon (Phosphor) | Tree-shaking, SSR-safe |
| Imagens | @nuxt/image | WebP/AVIF, srcset, lazy loading |
| SEO | @nuxtjs/seo | Sitemap, robots, schema-org, og-image |
| Estado | Pinia | Leve, SSR-friendly |
| Utilitários | VueUse | Composables prontos, testados |
| Backend | Appwrite | Auth, Database, Storage, Functions |
| SDK browser | appwrite@24 | Client-side (público) |
| SDK server | node-appwrite@21 | Server-side (API Key privada) |
| Deploy | Cloudflare Pages | Edge global, Workers, cache, SSL, DDoS |
| Analytics | Plausible ou CF Analytics | Privacy-first |
| Lint | ESLint + Prettier | Consistência de código |

---

## Estimativa de esforço por fase

| Fase | Escopo | Complexidade |
|---|---|---|
| Fase 1 | Fundação | ✅ Concluída (80%) |
| Fase 2 | Site público completo | Alta — design, conteúdo, SEO, blog |
| Fase 3 | Appwrite: DB + Storage | Média — criação de collections, seeds, permissões |
| Fase 4 | CRM / Painel admin | Alta — muitas telas, CRUD completo, auth |
| Fase 5 | Otimização e integrações | Contínua — evolução incremental |

### Ordem de execução recomendada

```
Fase 1 (finalizar) → Fase 3 (banco) → Fase 2 (site) → Fase 4 (CRM) → Fase 5 (crescimento)
```

A Fase 3 vem antes da 2 porque o site público precisa de dados reais no Appwrite para funcionar corretamente. A Fase 4 (CRM) depende da 3 (banco) estar completa.

---

## Critérios de qualidade

### SEO
- [ ] Lighthouse SEO: 100
- [ ] Todas as páginas com title, description, og:image únicos
- [ ] Schema.org validado no Rich Results Test
- [ ] Sitemap com todas as URLs ativas
- [ ] 0 erros no Google Search Console

### Performance
- [ ] Lighthouse Performance: 90+
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] INP < 200ms
- [ ] JS bundle client < 300KB gzipped

### Acessibilidade
- [ ] Lighthouse Accessibility: 90+
- [ ] Contraste AA em todos os textos
- [ ] Navegação completa por teclado
- [ ] ARIA labels em elementos interativos
- [ ] Alt text em todas as imagens

### Código
- [ ] 0 erros de TypeScript (strict mode)
- [ ] 0 erros de ESLint
- [ ] Prettier formatado
- [ ] Sem secrets no código ou commits
- [ ] Componentes < 200 linhas (média)

---

## Riscos e mitigações

| Risco | Impacto | Mitigação |
|---|---|---|
| Appwrite fora do ar | Site não carrega produtos | Fallback para dados em cache / mock |
| Imagens pesadas | LCP alto, UX ruim | @nuxt/image com WebP/AVIF + lazy loading |
| Conteúdo SEO fraco | Baixo ranqueamento | Blog com conteúdo evergreen + metas otimizadas |
| CRM complexo demais | Dono não usa | UI simples, poucos cliques, mobile-friendly |
| Cloudflare Workers limits | Build ou runtime falha | Monitorar bundle size, usar edge-light imports |
| Secrets vazados | Segurança comprometida | .env nunca versionado, API Key só server-side |

---

*Este plano é um documento vivo. Deve ser atualizado conforme decisões são tomadas e prioridades mudam.*
