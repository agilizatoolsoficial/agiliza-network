import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header, Footer } from '@agiliza/ui'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgilizaCalc — Calculadora CLT vs PJ, Rescisão e Juros Compostos',
  description: 'Calculadoras financeiras e trabalhistas: CLT vs PJ, rescisão, FGTS, juros compostos e IR. Grátis.',
  keywords: ['calculadora clt pj', 'calcular rescisão', 'calculadora juros compostos', 'calcular fgts'],
  authors: [{ name: 'Rede Agiliza', url: 'https://agilizatools.com.br' }],
  openGraph: {
    type: 'website',
    siteName: 'Agiliza Network',
    title: 'AgilizaCalc — Calculadoras Financeiras & Trabalhistas',
    description: 'Simule salario CLT vs PJ, rescisão de contrato e investimentos com juros compostos.',
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
        <Header currentTool="calc" />
        <main className="flex-1">{children}</main>
        <Footer currentTool="calc" />
      </body>
    </html>
  )
}
