# Design System — @agiliza/ui

> Componentes React compartilhados, tokens de design e diretrizes visuais para todas as 10 ferramentas da Rede Agiliza.

---

## 1. Identidade Visual

### Filosofia
Design **dark-first**, **funcional** e **rápido** — o usuário vem resolver um problema, não para contemplar. A UI deve dar confiança imediata e entregar resultado em menos de 3 cliques.

### Paleta de Cores (CSS Custom Properties)

```css
:root {
  /* === Brand === */
  --color-brand-primary:    #2563EB;  /* Blue 600    — cor principal */
  --color-brand-primary-h:  #1D4ED8;  /* Blue 700    — hover state */
  --color-brand-secondary:  #3B82F6;  /* Blue 500    — destaque */
  --color-brand-accent:     #06B6D4;  /* Cyan 500    — CTAs e links */
  --color-brand-accent-h:   #22D3EE;  /* Cyan 400    — CTA hover */

  /* === Neutral (Dark Mode Base) === */
  --color-bg:               #0F172A;  /* Slate 900   — background principal */
  --color-surface:          #1E293B;  /* Slate 800   — cards, modais */
  --color-surface-raised:   #263447;  /* Slate 750   — hover de cards */
  --color-border:           #334155;  /* Slate 700   — bordas */
  --color-border-subtle:    #1E293B;  /* Slate 800   — divisores */

  /* === Text === */
  --color-text-primary:     #F1F5F9;  /* Slate 100   — texto principal */
  --color-text-secondary:   #94A3B8;  /* Slate 400   — texto secundário */
  --color-text-muted:       #64748B;  /* Slate 500   — placeholder */
  --color-text-inverted:    #0F172A;  /* para fundos claros */

  /* === Semantic === */
  --color-success:          #10B981;  /* Emerald 500 */
  --color-warning:          #F59E0B;  /* Amber 500   */
  --color-error:            #EF4444;  /* Red 500     */
  --color-info:             #3B82F6;  /* Blue 500    */

}
```

### Tipografia

```css
/* Google Fonts — Inter */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  --font-sans:   'Inter', system-ui, -apple-system, sans-serif;
  --font-mono:   'JetBrains Mono', 'Fira Code', monospace;

  /* Scale (rem) */
  --text-xs:    0.75rem;   /* 12px */
  --text-sm:    0.875rem;  /* 14px */
  --text-base:  1rem;      /* 16px */
  --text-lg:    1.125rem;  /* 18px */
  --text-xl:    1.25rem;   /* 20px */
  --text-2xl:   1.5rem;    /* 24px */
  --text-3xl:   1.875rem;  /* 30px */
  --text-4xl:   2.25rem;   /* 36px */
  --text-5xl:   3rem;      /* 48px */

  /* Weight */
  --font-normal:    400;
  --font-medium:    500;
  --font-semibold:  600;
  --font-bold:      700;
  --font-extrabold: 800;
}
```

### Espaçamento (4px base)

```
4px  = 0.25rem  (--space-1)
8px  = 0.5rem   (--space-2)
12px = 0.75rem  (--space-3)
16px = 1rem     (--space-4)
24px = 1.5rem   (--space-6)
32px = 2rem     (--space-8)
48px = 3rem     (--space-12)
64px = 4rem     (--space-16)
96px = 6rem     (--space-24)
```

### Sombras e Bordas

```css
:root {
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-2xl:  24px;
  --radius-full: 9999px;

  --shadow-sm:  0 1px 2px rgba(0,0,0,0.4);
  --shadow-md:  0 4px 6px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2);
  --shadow-lg:  0 10px 15px rgba(0,0,0,0.3), 0 4px 6px rgba(0,0,0,0.2);
  --shadow-xl:  0 20px 25px rgba(0,0,0,0.4), 0 8px 10px rgba(0,0,0,0.2);
  --shadow-glow: 0 0 20px rgba(37, 99, 235, 0.3);  /* brand glow */
}
```

---

## 2. Componentes

### 2.1 `<NetworkHeader />`

**Props:**
```typescript
interface NetworkHeaderProps {
  currentTool: ToolId  // qual ferramenta está ativa (highlight no menu)
}

type ToolId =
  | 'pdf' | 'media' | 'calc' | 'qr' | 'bio'
  | 'nota' | 'img' | 'text' | 'dev' | 'sign'
```

**Comportamento:**
- Logo Agiliza com ícone SVG, linkado para `agilizatools.com.br`
- Dropdown "Ferramentas" com todas as 10 apps (hover ou click)
- A ferramenta atual fica destacada no dropdown com a cor brand
- Mobile: hamburger menu que expande lista vertical
- Sticky no topo com `backdrop-blur`

---

### 2.2 `<NetworkFooter />`

**Comportamento:**
- Grid de 3 colunas com todas as ferramentas (links `<a>` para SEO)
- Coluna "Empresa": Sobre, Contato, Privacidade, Termos
- Coluna "Ferramentas": lista das 10 apps com anchor text otimizado para SEO
- Coluna "Redes Sociais": Twitter/X, GitHub

---

### 2.3 `<Button />`

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  href?: string  // torna o botão um <a> tag
}
```

**Visual:**
| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| primary | brand-primary sólido | white | none |
| secondary | surface | brand-primary | border |
| ghost | transparent | text-secondary | none |
| danger | error/20% | error | error/40% |
| outline | transparent | text-primary | border |

---

### 2.4 `<DropZone />`

```typescript
interface DropZoneProps {
  accept: string[]          // ex: ['.pdf', '.png']
  maxSizeMB?: number        // default: 50
  multiple?: boolean        // default: false
  onFilesSelected: (files: File[]) => void
  label?: string
  sublabel?: string
  icon?: React.ReactNode
  disabled?: boolean
}
```

**Estados visuais:**
- **Idle:** Borda dashed border-color com ícone central
- **Drag Over:** Fundo brand-primary/10%, borda brand-primary sólida
- **Error:** Borda error, texto de erro
- **Loading:** Spinner no centro

---

### 2.5 `<Badge />`

```typescript
interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'brand'
  size?: 'sm' | 'md'
  children: React.ReactNode
}
```

---

### 2.6 `<ToolCard />`

Usado na página portal (hub de ferramentas):

```typescript
interface ToolCardProps {
  icon: IconName         // ícone SVG do pacote compartilhado
  name: string           // ex: "AgilizaQR"
  description: string    // 1 linha
  href: string           // URL da ferramenta
  badge?: string         // ex: "Novo", "Popular"
  tags?: string[]        // ex: ["Grátis", "Sem cadastro"]
}
```

---

### 2.7 `<Spinner />`

```typescript
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'  // 16px, 24px, 40px
  label?: string               // aria-label para acessibilidade
  color?: 'brand' | 'white' | 'muted'
}
```

---

### 2.8 `<ProgressBar />`

Para operações de upload/processamento de arquivos:

```typescript
interface ProgressBarProps {
  value: number          // 0-100
  label?: string         // ex: "Comprimindo PDF..."
  showPercentage?: boolean
  color?: 'brand' | 'success' | 'warning'
  animated?: boolean     // striped animation
}
```

---

## 3. Animações (Motion Tokens)

```css
:root {
  --duration-fast:   150ms;
  --duration-base:   250ms;
  --duration-slow:   400ms;
  --duration-slower: 600ms;

  --ease-default:    cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in:         cubic-bezier(0.4, 0, 1, 1);
  --ease-out:        cubic-bezier(0, 0, 0.2, 1);
  --ease-bounce:     cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

**Padrões de animação usados:**
- Transições curtas para hover, foco e estados de carregamento
- Animações de carregamento somente enquanto uma operação está ativa
- Respeitar `prefers-reduced-motion` em todas as ferramentas

Não usar gradientes roxos, botões em formato de pílula, emojis como ícones, fotos de demonstração que simulem pessoas ou conteúdo real, animações decorativas contínuas ou cursores personalizados. Usar a paleta azul e ciano, ícones SVG de `@agiliza/ui` e placeholders neutros até que o usuário forneça uma imagem.

---

## 4. Acessibilidade

- Todas as interações têm `focus-visible` estilizado
- Ícones decorativos com `aria-hidden="true"`
- Componentes interativos com `role` e `aria-*` corretos
- Contraste mínimo 4.5:1 (WCAG AA) em todo texto
- `<DropZone />` aceita input via teclado (`Enter`/`Space`)
- `<NetworkHeader />` com `role="navigation"` e `aria-label`

---

## 5. Estrutura do Pacote

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── NetworkHeader/
│   │   │   ├── NetworkHeader.tsx
│   │   │   ├── NetworkHeader.module.css
│   │   │   └── index.ts
│   │   ├── NetworkFooter/
│   │   ├── Button/
│   │   ├── Badge/
│   │   ├── DropZone/
│   │   ├── ToolCard/
│   │   ├── Spinner/
│   │   ├── ProgressBar/
│   │   └── JsonLd/
│   ├── tokens/
│   │   └── tokens.css      # Todas as CSS Custom Properties
│   ├── hooks/
│   │   ├── useFileValidation.ts
│   │   └── useToast.ts
│   ├── types/
│   │   └── tools.ts        # ToolId, ToolMeta types
│   └── index.ts            # Re-exports públicos
├── package.json
└── tsconfig.json
```

---

## 6. Uso nas Apps

```typescript
// apps/agiliza-qr/app/layout.tsx
import { NetworkHeader, NetworkFooter } from '@agiliza/ui'
import '@agiliza/ui/tokens.css'

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <NetworkHeader currentTool="qr" />
        <main>{children}</main>
        <NetworkFooter />
      </body>
    </html>
  )
}
```
