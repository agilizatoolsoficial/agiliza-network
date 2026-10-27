import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header, Footer } from '@agiliza/ui'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgilizaMedia — Baixar Vídeos do Instagram, TikTok e YouTube',
  description: "Baixe vídeos do Instagram, TikTok e YouTube sem marca d'água. Rápido e gratuito.",
  keywords: ['baixar video instagram', 'baixar tiktok sem marca dagua', 'youtube downloader', 'baixar mp3'],
  authors: [{ name: 'Rede Agiliza', url: 'https://agilizatools.com.br' }],
  openGraph: {
    type: 'website',
    siteName: 'Agiliza Network',
    title: 'AgilizaMedia — Baixar Vídeos e Mídias Sociais',
    description: 'Baixe vídeos e áudios do Instagram, TikTok, YouTube e X sem marca d\'água.',
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
        <Header currentTool="media" />
        <main className="flex-1">{children}</main>
        <Footer currentTool="media" />
      </body>
    </html>
  )
}
