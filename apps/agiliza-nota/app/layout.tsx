import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header, Footer } from '@agiliza/ui'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgilizaNota — Gerar Recibo de Pagamento Online Grátis em PDF',
  description: 'Gere recibos de pagamento, declarações de conteúdo e contratos em PDF. Simples e gratuito.',
  keywords: ['gerar recibo pagamento', 'recibo online pdf', 'declaracao de conteudo', 'contrato prestacao servico'],
  authors: [{ name: 'Rede Agiliza', url: 'https://agilizatools.com.br' }],
  openGraph: {
    type: 'website',
    siteName: 'Agiliza Network',
    title: 'AgilizaNota — Gerador de Recibos e Declarações PDF',
    description: 'Emita recibos de pagamento e declarações de conteúdo em PDF instantaneamente.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-950 text-slate-100`}>
        <Header currentTool="nota" />
        <main className="flex-1">{children}</main>
        <Footer currentTool="nota" />
      </body>
    </html>
  )
}
