import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header, Footer } from '@agiliza/ui'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Agiliza Tools: QR Codes, imagens, textos e cálculos',
  description: 'Crie QR Codes, converta imagens, conte palavras, formate JSON e compare cenários financeiros.',
  keywords: ['ferramentas online', 'agiliza tools', 'gerador qr code pix', 'conversor de imagens', 'calculadora clt pj', 'gerar cpf para testes'],
  authors: [{ name: 'Rede Agiliza', url: 'https://agilizatools.com.br' }],
  openGraph: {
    type: 'website',
    siteName: 'Agiliza Tools',
    title: 'Agiliza Tools: QR Codes, imagens, textos e cálculos',
    description: 'Acesse ferramentas para QR Codes, imagens, textos, cálculos e documentos.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="light" data-theme="light">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header homeHref="/" />
        <main className="flex-1">{children}</main>
        <Footer privacyHref="/privacidade" />
      </body>
    </html>
  )
}
