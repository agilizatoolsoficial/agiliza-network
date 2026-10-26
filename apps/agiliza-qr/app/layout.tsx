import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header, Footer } from '@agiliza/ui'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgilizaQR — Gerar QR Code Pix, Wi-Fi e WhatsApp Online Grátis',
  description: 'Gere QR Codes personalizados para Pix, Wi-Fi, WhatsApp e links. Exporta em PNG, SVG e PDF.',
  keywords: ['gerar qr code pix', 'qr code wifi', 'qr code whatsapp', 'criar qr code gratis'],
  authors: [{ name: 'Rede Agiliza', url: 'https://agilizatools.com.br' }],
  openGraph: {
    type: 'website',
    siteName: 'Agiliza Network',
    title: 'AgilizaQR — Gerador de QR Code Instantâneo',
    description: 'Gere QR Codes personalizados para Pix, Wi-Fi, WhatsApp e links.',
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
        <Header currentTool="qr" />
        <main className="flex-1">{children}</main>
        <Footer currentTool="qr" />
      </body>
    </html>
  )
}
