import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header, Footer } from '@agiliza/ui'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgilizaImg — Comprimir e Converter Imagens Online Grátis (WebP, PNG, JPG)',
  description: 'Comprime e converte imagens para WebP, PNG e JPG direto no browser. Sem upload para servidores. Grátis.',
  keywords: ['comprimir imagem online', 'converter webp', 'reduzir tamanho foto', 'otimizar imagem gratis'],
  authors: [{ name: 'Rede Agiliza', url: 'https://agilizatools.com.br' }],
  openGraph: {
    type: 'website',
    siteName: 'Agiliza Network',
    title: 'AgilizaImg — Compressor e Conversor de Imagens',
    description: 'Reduza o tamanho das suas imagens sem perder qualidade visual.',
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
        <Header currentTool="img" />
        <main className="flex-1">{children}</main>
        <Footer currentTool="img" />
      </body>
    </html>
  )
}
