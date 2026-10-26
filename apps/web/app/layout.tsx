import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header, Footer } from '@agiliza/ui'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Agiliza Tools — Suíte de Ferramentas Web Utilitárias Gratuitas',
  description: '100% Grátis, Privado e Sem Cadastro. Comprima PDFs, gere QR Code Pix, calcule CLT vs PJ, edite imagens, formate JSON e muito mais.',
  keywords: ['ferramentas online gratis', 'agiliza tools', 'gerador qr code pix', 'comprimir pdf online', 'calculadora clt pj', 'gerar cpf valido'],
  authors: [{ name: 'Rede Agiliza', url: 'https://agilizatools.com.br' }],
  openGraph: {
    type: 'website',
    siteName: 'Agiliza Tools',
    title: 'Agiliza Tools — Suíte de Ferramentas Web Utilitárias Gratuitas',
    description: 'Ferramentas web rápidas, gratuitas e sem envio de dados para servidores.',
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
        <Header homeHref="/" />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
