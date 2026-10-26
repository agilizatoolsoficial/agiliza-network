import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header, Footer } from '@agiliza/ui'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgilizaSign — Assinar PDF Online Grátis Sem Cadastro',
  description: 'Assine documentos PDF online de forma simples. Desenhe, digite ou importe sua assinatura. Grátis.',
  keywords: ['assinar pdf online', 'assinatura digital pdf gratis', 'assinar documento online', 'assinar pdf sem cadastro'],
  authors: [{ name: 'Rede Agiliza', url: 'https://agilizatools.com.br' }],
  openGraph: {
    type: 'website',
    siteName: 'Agiliza Network',
    title: 'AgilizaSign — Assinatura Digital de PDFs',
    description: 'Assine PDFs desenhando, digitando ou importando imagens de assinatura.',
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
        <Header currentTool="sign" />
        <main className="flex-1">{children}</main>
        <Footer currentTool="sign" />
      </body>
    </html>
  )
}
