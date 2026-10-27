import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header, Footer } from '@agiliza/ui'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgilizaDev — Gerar CPF, CNPJ, CEP e Dados para Testes',
  description: 'Gere e valide CPF, CNPJ, cartões de crédito e dados fictícios brasileiros para testes de software.',
  keywords: ['gerar cpf valido teste', 'gerar cnpj', 'validar cpf cnpj', 'consultar cep'],
  authors: [{ name: 'Rede Agiliza', url: 'https://agilizatools.com.br' }],
  openGraph: {
    type: 'website',
    siteName: 'Agiliza Network',
    title: 'AgilizaDev — Gerador & Validador de Documentos BR',
    description: 'Gerador e validador de CPF, CNPJ, CNH e consulta de CEP.',
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
        <Header currentTool="dev" />
        <main className="flex-1">{children}</main>
        <Footer currentTool="dev" />
      </body>
    </html>
  )
}
