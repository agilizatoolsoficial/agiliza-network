# 🚀 Agiliza Network — Monorepo

> **Ecossistema de 10 ferramentas web utilitárias sob a marca Rede Agiliza.**
> Arquitetura Turborepo · Next.js App Router · TypeScript · Tailwind CSS · Custo $0/mês

---

## 📦 Estrutura do Monorepo

```
agiliza-network/
├── apps/                          # Aplicações independentes (micro-frontends)
│   ├── agiliza-pdf/               # AgilizaPDF  — Conversão, fusão, divisão de PDFs
│   ├── agiliza-media/             # AgilizaMedia — Downloader de vídeos sociais
│   ├── agiliza-calc/              # AgilizaCalc  — Calculadoras financeiras/trabalhistas
│   ├── agiliza-qr/                # AgilizaQR    — Gerador de QR Code (Pix, Wi-Fi, etc.)
│   ├── agiliza-bio/               # AgilizaBio   — Página de links (Linktree-like)
│   ├── agiliza-nota/              # AgilizaNota  — Emissão de recibos e NF em PDF
│   ├── agiliza-img/               # AgilizaImg   — Compressor/conversor de imagens
│   ├── agiliza-text/              # AgilizaText  — Utilitários de texto e JSON
│   ├── agiliza-dev/               # AgilizaDev   — Gerador/validador de documentos BR
│   └── agiliza-sign/              # AgilizaSign  — Assinatura digital de PDFs
│
├── packages/                      # Código compartilhado (design system, configs)
│   ├── ui/                        # @agiliza/ui    — Componentes React compartilhados
│   ├── config-tailwind/           # @agiliza/config-tailwind — Preset Tailwind unificado
│   ├── config-eslint/             # @agiliza/config-eslint   — Regras ESLint compartilhadas
│   ├── config-typescript/         # @agiliza/config-typescript — tsconfig base
│   └── utils/                     # @agiliza/utils — Funções utilitárias compartilhadas
│
├── turbo.json                     # Pipeline de build/dev Turborepo
├── package.json                   # Root package (workspaces)
└── README.md                      # Este arquivo
```

---

## 🛠️ As 10 Ferramentas da Rede

| App | Ferramenta | Processamento | Backend Necessário |
|-----|-----------|--------------|-------------------|
| `agiliza-pdf` | **AgilizaPDF** | Client-side (PDF.js / pdf-lib) | ❌ Não |
| `agiliza-media` | **AgilizaMedia** | Serverless (yt-dlp) | ✅ Render/Fly.io |
| `agiliza-calc` | **AgilizaCalc** | Client-side (puro JS) | ❌ Não |
| `agiliza-qr` | **AgilizaQR** | Client-side (qrcode.js) | ❌ Não |
| `agiliza-bio` | **AgilizaBio** | Client + Supabase Auth/DB | ✅ Supabase |
| `agiliza-nota` | **AgilizaNota** | Client-side (jsPDF) | ❌ Não |
| `agiliza-img` | **AgilizaImg** | Client-side (Canvas/WASM) | ❌ Não |
| `agiliza-text` | **AgilizaText** | Client-side (puro JS) | ❌ Não |
| `agiliza-dev` | **AgilizaDev** | Client-side (algoritmos BR) | ❌ Não |
| `agiliza-sign` | **AgilizaSign** | Client-side (pdf-lib) | ❌ Não |

---

## ⚙️ Stack Técnica

### Core
- **Monorepo:** [Turborepo](https://turbo.build/) v2 com npm workspaces
- **Framework:** [Next.js](https://nextjs.org/) 15 (App Router, React 19, TypeScript 5)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/) v4 com preset unificado em `packages/config-tailwind`
- **Linguagem:** TypeScript (strict mode)

### Backend & Dados
- **Client-side first:** PDF, imagens, texto e QR processados 100% no browser
- **Supabase:** PostgreSQL + Auth para `AgilizaBio` (páginas de links persistentes)
- **Serverless:** Next.js API Routes + Render/Fly.io para `AgilizaMedia`

### Deploy & Infraestrutura (Custo $0)

| Serviço | Uso | Tier Gratuito |
|---------|-----|---------------|
| **Vercel** | Deploy de todas as apps Next.js | 100GB bandwidth/mês |
| **Supabase** | DB + Auth para AgilizaBio | 500MB DB, 50K usuários |
| **Cloudflare** | DNS + CDN global | Sempre gratuito |
| **Render/Fly.io** | Microserviço yt-dlp (AgilizaMedia) | 750h/mês |

---

## 🎨 Design System (`packages/ui`)

### Paleta de Cores

```
--color-brand-primary:   #2563EB  (Blue 600) — Cor principal da rede
--color-brand-secondary: #3B82F6  (Blue 500) — Destaque
--color-brand-accent:    #06B6D4  (Cyan 500)   — CTAs e links
--color-neutral-bg:      #0F172A  (Slate 900)  — Background dark
--color-neutral-surface: #1E293B  (Slate 800)  — Cards/Surfaces
--color-neutral-border:  #334155  (Slate 700)  — Bordas
```

### Componentes Compartilhados

- `<NetworkHeader />` — Navbar com logo + seletor de todas as 10 ferramentas
- `<NetworkFooter />` — Footer com cross-links para todas as ferramentas (SEO)
- `<ToolCard />` — Card de apresentação de ferramenta
- `<Button />` — Botão com variantes (primary, secondary, ghost, danger)
- `<Badge />` — Tag de status/categoria
- `<Spinner />` — Loading state
- `<DropZone />` — Área de upload de arquivo (drag & drop)
- `<SEOHead />` — Metadados OpenGraph + JSON-LD automáticos

---

## 🔍 SEO & Metadados

Cada app implementa:

- `metadata` export do Next.js App Router (title, description, openGraph, twitter)
- **JSON-LD** do tipo `SoftwareApplication` em toda ferramenta
- **Sitemap.xml** gerado dinamicamente via `app/sitemap.ts`
- **Robots.txt** otimizado
- Heading hierarchy rigorosa (`h1` único por página)
- URLs semânticas e amigáveis

---

## 🚦 Comandos

```bash
# Instalar todas as dependências
npm install

# Rodar todas as apps em desenvolvimento
npm run dev

# Rodar uma app específica
npx turbo dev --filter=agiliza-pdf

# Build de todas as apps
npm run build

# Build de uma app específica
npx turbo build --filter=agiliza-qr

# Lint
npm run lint

# Type check
npm run check-types

# Format
npm run format
```

---

## 📁 Convenções de Código

### Estrutura interna de cada app (`apps/agiliza-*`)

```
apps/agiliza-{tool}/
├── app/
│   ├── layout.tsx          # Layout raiz com NetworkHeader/Footer
│   ├── page.tsx            # Landing page da ferramenta
│   ├── sitemap.ts          # Sitemap dinâmico
│   ├── robots.ts           # Robots.txt
│   └── (features)/         # Route groups por funcionalidade
├── components/             # Componentes locais da ferramenta
├── lib/                    # Lógica de negócio / processamento
├── hooks/                  # React hooks customizados
├── types/                  # TypeScript types/interfaces locais
├── public/                 # Assets estáticos
├── package.json
├── next.config.ts
└── tsconfig.json
```

### Nomenclatura

- **Componentes:** PascalCase (`NetworkHeader.tsx`)
- **Hooks:** camelCase com prefixo `use` (`useFileProcessor.ts`)
- **Utilitários:** camelCase (`formatCurrency.ts`)
- **Tipos:** PascalCase com sufixo `Type` ou `Interface` (`ToolCardProps`)
- **Constantes:** UPPER_SNAKE_CASE (`MAX_FILE_SIZE_MB`)

---

## 🗺️ Roadmap de Desenvolvimento

### Fase 1 — MVP Core (Semanas 1-4)

- [x] Setup Turborepo + Next.js base
- [ ] `packages/ui` — Design System completo
- [ ] `packages/config-tailwind` — Preset compartilhado
- [ ] `apps/agiliza-qr` — **MVP #1** (mais simples, valida pipeline)
- [ ] `apps/agiliza-text` — **MVP #2** (zero dependências externas)
- [ ] `apps/agiliza-calc` — **MVP #3** (alta demanda por SEO)

### Fase 2 — Ferramentas de Arquivo (Semanas 5-8)

- [ ] `apps/agiliza-pdf` — Client-side PDF processing
- [ ] `apps/agiliza-img` — Canvas/WASM image optimization
- [ ] `apps/agiliza-sign` — PDF digital signature
- [ ] `apps/agiliza-nota` — Receipt/NF generator

### Fase 3 — Backend & Persistência (Semanas 9-12)

- [ ] `apps/agiliza-bio` — Supabase integration
- [ ] `apps/agiliza-dev` — Document validator BR
- [ ] `apps/agiliza-media` — Serverless yt-dlp

### Fase 4 — SEO & Performance

- [ ] Core Web Vitals optimization (LCP < 2.5s)
- [ ] Structured data validation
- [ ] Cross-linking strategy entre ferramentas

---

## 🤝 Contribuindo

1. Crie uma branch a partir de `main`: `git checkout -b feat/agiliza-{tool}-{feature}`
2. Commit com [Conventional Commits](https://www.conventionalcommits.org/): `feat(agiliza-qr): add pix qr generation`
3. Abra um Pull Request para `main`

---

## 📄 Licença

MIT © Rede Agiliza — [agilizatools.com.br](https://agilizatools.com.br)
