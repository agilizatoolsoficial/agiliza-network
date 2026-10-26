#!/usr/bin/env node
/**
 * setup-apps.js — Scaffolding das apps do monorepo Agiliza Network
 * Uso: node scripts/setup-apps.js [--app=<nome>] [--force]
 *
 * --app=pdf      → cria apenas a app especificada
 * --force        → sobrescreve arquivos existentes
 * (padrão)       → cria todas as apps que ainda não existem
 */

import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = join(__dirname, '..')
const APPS_DIR = join(ROOT, 'apps')

const args = process.argv.slice(2)
const FORCE = args.includes('--force')
const APP_FILTER = args.find(a => a.startsWith('--app='))?.split('=')[1]

// ─── App Definitions ─────────────────────────────────────────────────────────
const APPS = [
  {
    id: 'agiliza-pdf',
    name: '@agiliza/pdf',
    port: 3001,
    title: 'AgilizaPDF — Comprimir, Mesclar e Dividir PDFs Online Grátis',
    description: 'Comprime, mescla, divide e converte PDFs 100% no seu navegador. Sem upload para servidores. Grátis.',
    keywords: ['comprimir pdf', 'mesclar pdf', 'dividir pdf', 'converter pdf online'],
  },
  {
    id: 'agiliza-media',
    name: '@agiliza/media',
    port: 3002,
    title: 'AgilizaMedia — Baixar Vídeos do Instagram, TikTok e YouTube',
    description: 'Baixe vídeos do Instagram, TikTok e YouTube sem marca d\'água. Rápido e gratuito.',
    keywords: ['baixar video instagram', 'baixar tiktok sem marca dagua', 'youtube downloader'],
  },
  {
    id: 'agiliza-calc',
    name: '@agiliza/calc',
    port: 3003,
    title: 'AgilizaCalc — Calculadora CLT vs PJ, Rescisão e Juros Compostos',
    description: 'Calculadoras financeiras e trabalhistas: CLT vs PJ, rescisão, FGTS, juros compostos e IR. Grátis.',
    keywords: ['calculadora clt pj', 'calcular rescisão', 'calculadora juros compostos', 'calcular fgts'],
  },
  {
    id: 'agiliza-qr',
    name: '@agiliza/qr',
    port: 3004,
    title: 'AgilizaQR — Gerar QR Code Pix, Wi-Fi e WhatsApp Online Grátis',
    description: 'Gere QR Codes personalizados para Pix, Wi-Fi, WhatsApp e links. Exporta em PNG, SVG e PDF.',
    keywords: ['gerar qr code pix', 'qr code wifi', 'qr code whatsapp', 'criar qr code gratis'],
  },
  {
    id: 'agiliza-bio',
    name: '@agiliza/bio',
    port: 3005,
    title: 'AgilizaBio — Crie sua Página de Links Grátis (Alternativa ao Linktree)',
    description: 'Crie sua página de links personalizada para o Instagram bio. Alternativa gratuita ao Linktree.',
    keywords: ['pagina de links gratis', 'alternativa linktree', 'link na bio instagram', 'criar bio link'],
  },
  {
    id: 'agiliza-nota',
    name: '@agiliza/nota',
    port: 3006,
    title: 'AgilizaNota — Gerar Recibo de Pagamento Online Grátis em PDF',
    description: 'Gere recibos de pagamento, declarações de conteúdo e contratos em PDF. Simples e gratuito.',
    keywords: ['gerar recibo pagamento', 'recibo online pdf', 'declaracao de conteudo', 'contrato prestacao servico'],
  },
  {
    id: 'agiliza-img',
    name: '@agiliza/img',
    port: 3007,
    title: 'AgilizaImg — Comprimir e Converter Imagens Online Grátis (WebP, PNG, JPG)',
    description: 'Comprime e converte imagens para WebP, PNG e JPG direto no browser. Sem upload. Grátis.',
    keywords: ['comprimir imagem online', 'converter webp', 'reduzir tamanho foto', 'otimizar imagem gratis'],
  },
  {
    id: 'agiliza-text',
    name: '@agiliza/text',
    port: 3008,
    title: 'AgilizaText — Contador de Caracteres, Formatação e JSON Online',
    description: 'Conte palavras, formate maiúsculas/minúsculas, valide JSON e compare textos online. Grátis.',
    keywords: ['contar caracteres online', 'contador palavras', 'formatar json online', 'comparar textos'],
  },
  {
    id: 'agiliza-dev',
    name: '@agiliza/dev',
    port: 3009,
    title: 'AgilizaDev — Gerar CPF, CNPJ, CEP e Dados para Testes',
    description: 'Gere e valide CPF, CNPJ, cartões de crédito e dados fictícios brasileiros para testes de software.',
    keywords: ['gerar cpf valido teste', 'gerar cnpj', 'validar cpf cnpj', 'consultar cep'],
  },
  {
    id: 'agiliza-sign',
    name: '@agiliza/sign',
    port: 3010,
    title: 'AgilizaSign — Assinar PDF Online Grátis Sem Cadastro',
    description: 'Assine documentos PDF online de forma simples. Desenhe, digite ou importe sua assinatura. Grátis.',
    keywords: ['assinar pdf online', 'assinatura digital pdf gratis', 'assinar documento online', 'assinar pdf sem cadastro'],
  },
]

// ─── Template Generators ─────────────────────────────────────────────────────

function packageJson(app) {
  return JSON.stringify({
    name: app.name,
    version: '0.1.0',
    type: 'module',
    private: true,
    scripts: {
      dev: `next dev --port ${app.port}`,
      build: 'next build',
      start: `next start --port ${app.port}`,
      lint: 'eslint --max-warnings 0',
      'check-types': 'next typegen && tsc --noEmit',
    },
    dependencies: {
      '@agiliza/ui': '*',
      next: '16.3.2',
      react: '19.2.8',
      'react-dom': '19.2.8',
    },
    devDependencies: {
      '@agiliza/eslint-config': '*',
      '@agiliza/typescript-config': '*',
      '@types/node': '26.3.0',
      '@types/react': '19.2.18',
      '@types/react-dom': '19.2.5',
      eslint: '10.9.1',
      typescript: '7.0.2',
    },
  }, null, 2) + '\n'
}

function tsconfigJson() {
  return JSON.stringify({
    extends: '@agiliza/typescript-config/nextjs.json',
    compilerOptions: {
      paths: { '@/*': ['./src/*', './*'] },
    },
    include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
    exclude: ['node_modules'],
  }, null, 2) + '\n'
}

function nextConfig() {
  return `import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Permite importar @agiliza/ui (transpila o pacote local)
  transpilePackages: ['@agiliza/ui'],
}

export default nextConfig
`
}

function postcssConfig() {
  return `export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
`
}

function eslintConfig(app) {
  return `import { nextJsConfig } from '@agiliza/eslint-config/next'

/** @type {import("eslint").Linter.Config} */
export default [...nextJsConfig]
`
}

function rootLayout(app) {
  const appTitle = app.title.split('—')[0].trim()
  return `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NetworkHeader, NetworkFooter } from '@agiliza/ui'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: \`%s | ${appTitle} — Agiliza Network\`,
    default: '${app.title}',
  },
  description: '${app.description}',
  keywords: ${JSON.stringify(app.keywords)},
  authors: [{ name: 'Rede Agiliza', url: 'https://agilizatools.com.br' }],
  openGraph: {
    type: 'website',
    siteName: 'Agiliza Network',
    title: '${app.title}',
    description: '${app.description}',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '${appTitle}' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@agilizatools',
    title: '${app.title}',
    description: '${app.description}',
  },
  alternates: {
    canonical: 'https://${app.id.replace('agiliza-', '')}.agilizatools.com.br',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {/* <NetworkHeader currentTool="${app.id.replace('agiliza-', '')}" /> */}
        <main>{children}</main>
        {/* <NetworkFooter /> */}
      </body>
    </html>
  )
}
`
}

function rootPage(app) {
  const appTitle = app.title.split('—')[0].trim()
  return `export default function Page() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <h1>${appTitle}</h1>
      <p>${app.description}</p>
      <p style={{ color: '#94A3B8' }}>
        🚧 Em desenvolvimento — porta {process.env.PORT || '${app.port}'}
      </p>
    </div>
  )
}
`
}

function globalsCss() {
  return `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --color-brand-primary:    #2563EB;
  --color-brand-secondary:  #3B82F6;
  --color-brand-accent:     #06B6D4;
  --color-bg:               #0F172A;
  --color-surface:          #1E293B;
  --color-border:           #334155;
  --color-text-primary:     #F1F5F9;
  --color-text-secondary:   #94A3B8;
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
}

html {
  color-scheme: dark;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

:focus-visible {
  outline: 2px solid #3B82F6;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`
}

function sitemapTs(app) {
  const toolSlug = app.id.replace('agiliza-', '')
  return `import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://${toolSlug}.agilizatools.com.br',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
`
}

function robotsTs(app) {
  const toolSlug = app.id.replace('agiliza-', '')
  return `import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://${toolSlug}.agilizatools.com.br/sitemap.xml',
  }
}
`
}

// ─── Scaffold Function ────────────────────────────────────────────────────────

function writeFile(path, content, label) {
  if (existsSync(path) && !FORCE) {
    console.log(`    ⏭  skip  ${label} (já existe)`)
    return
  }
  writeFileSync(path, content, 'utf8')
  console.log(`    ✅ write ${label}`)
}

function mkdir(path) {
  mkdirSync(path, { recursive: true })
}

function scaffoldApp(app) {
  const appDir = join(APPS_DIR, app.id)
  const appRouterDir = join(appDir, 'app')

  console.log(`\n📦 ${app.name} (porta ${app.port})`)
  console.log(`   📁 ${appDir.replace(ROOT, '.')}`)

  mkdir(appDir)
  mkdir(appRouterDir)
  mkdir(join(appDir, 'components'))
  mkdir(join(appDir, 'lib'))
  mkdir(join(appDir, 'hooks'))
  mkdir(join(appDir, 'types'))
  mkdir(join(appDir, 'public'))

  writeFile(join(appDir, 'package.json'), packageJson(app), 'package.json')
  writeFile(join(appDir, 'tsconfig.json'), tsconfigJson(), 'tsconfig.json')
  writeFile(join(appDir, 'next.config.ts'), nextConfig(), 'next.config.ts')
  writeFile(join(appDir, 'postcss.config.mjs'), postcssConfig(), 'postcss.config.mjs')
  writeFile(join(appDir, 'eslint.config.mjs'), eslintConfig(app), 'eslint.config.mjs')
  writeFile(join(appDir, '.gitignore'), '# Next.js\n.next/\nout/\n.vercel/\n\n# Env\n.env*.local\n.env\n\n# Logs\n*.log\n', '.gitignore')
  writeFile(join(appDir, '.env.example'), `# Ambiente\nNEXT_PUBLIC_APP_URL=http://localhost:${app.port}\n`, '.env.example')

  writeFile(join(appRouterDir, 'layout.tsx'), rootLayout(app), 'app/layout.tsx')
  writeFile(join(appRouterDir, 'page.tsx'), rootPage(app), 'app/page.tsx')
  writeFile(join(appRouterDir, 'globals.css'), globalsCss(), 'app/globals.css')
  writeFile(join(appRouterDir, 'sitemap.ts'), sitemapTs(app), 'app/sitemap.ts')
  writeFile(join(appRouterDir, 'robots.ts'), robotsTs(app), 'app/robots.ts')
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log('\n🚀 Agiliza Network — Setup de Apps')
console.log('═'.repeat(50))
if (FORCE) console.log('⚠️  Modo --force: arquivos existentes serão sobrescritos')

const appsToCreate = APP_FILTER
  ? APPS.filter(a => a.id === `agiliza-${APP_FILTER}` || a.id === APP_FILTER)
  : APPS

if (appsToCreate.length === 0) {
  console.error(`\n❌ App não encontrada: ${APP_FILTER}`)
  console.error(`   Apps disponíveis: ${APPS.map(a => a.id.replace('agiliza-', '')).join(', ')}`)
  process.exit(1)
}

for (const app of appsToCreate) {
  scaffoldApp(app)
}

console.log('\n═'.repeat(50))
console.log(`\n✅ ${appsToCreate.length} app(s) configurada(s)!`)
console.log('\n📋 Próximos passos:')
console.log('   1. npm install')
console.log('   2. npm run dev:qr          (rodar uma ferramenta)')
console.log('   3. npm run dev             (rodar todas)\n')
