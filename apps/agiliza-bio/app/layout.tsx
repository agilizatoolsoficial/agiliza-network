import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header, Footer } from '@agiliza/ui'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgilizaBio — Crie sua Página de Links Grátis (Alternativa ao Linktree)',
  description: 'Crie sua página de links personalizada para a bio do Instagram e redes sociais. Grátis e sem cadastro.',
  keywords: ['pagina de links gratis', 'alternativa linktree', 'link na bio instagram', 'criar bio link'],
  authors: [{ name: 'Rede Agiliza', url: 'https://agilizatools.com.br' }],
  openGraph: {
    type: 'website',
    siteName: 'Agiliza Network',
    title: 'AgilizaBio — Crie sua Página de Links Grátis',
    description: 'Crie sua página de links personalizada para a bio do Instagram.',
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
        <Header currentTool="bio" />
        <main className="flex-1">{children}</main>
        <Footer currentTool="bio" />
      </body>
    </html>
  )
}
