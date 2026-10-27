import type { IconName } from '../icon'

export type ToolId =
  | 'pdf'
  | 'media'
  | 'calc'
  | 'qr'
  | 'bio'
  | 'nota'
  | 'img'
  | 'text'
  | 'dev'
  | 'sign'

export interface ToolMeta {
  id: ToolId
  name: string
  label: string
  description: string
  href: string
  icon: IconName
  badge?: string
}

export const TOOLS: ToolMeta[] = [
  {
    id: 'pdf',
    name: 'AgilizaPDF',
    label: 'PDF',
    description: 'Comprime, mescla e divide PDFs no navegador',
    href: 'https://pdf.agilizatools.com.br',
    icon: 'file',
    badge: 'Popular',
  },
  {
    id: 'media',
    name: 'AgilizaMedia',
    label: 'Media',
    description: 'Baixa vídeos do Instagram, TikTok e YouTube',
    href: 'https://media.agilizatools.com.br',
    icon: 'video',
  },
  {
    id: 'calc',
    name: 'AgilizaCalc',
    label: 'Calc',
    description: 'Calculadoras CLT vs PJ, rescisão e FGTS',
    href: 'https://calc.agilizatools.com.br',
    icon: 'calculator',
    badge: 'Popular',
  },
  {
    id: 'qr',
    name: 'AgilizaQR',
    label: 'QR Code',
    description: 'Gera QR Codes para Pix, Wi-Fi e links',
    href: 'https://qr.agilizatools.com.br',
    icon: 'qrCode',
  },
  {
    id: 'bio',
    name: 'AgilizaBio',
    label: 'Bio',
    description: 'Cria sua página de links (alternativa ao Linktree)',
    href: 'https://bio.agilizatools.com.br',
    icon: 'link',
    badge: 'Novo',
  },
  {
    id: 'nota',
    name: 'AgilizaNota',
    label: 'Nota',
    description: 'Gera recibos e declarações em PDF',
    href: 'https://nota.agilizatools.com.br',
    icon: 'receipt',
  },
  {
    id: 'img',
    name: 'AgilizaImg',
    label: 'Imagem',
    description: 'Comprime e converte imagens para WebP',
    href: 'https://img.agilizatools.com.br',
    icon: 'image',
  },
  {
    id: 'text',
    name: 'AgilizaText',
    label: 'Texto',
    description: 'Conta caracteres, formata e valida JSON',
    href: 'https://text.agilizatools.com.br',
    icon: 'type',
  },
  {
    id: 'dev',
    name: 'AgilizaDev',
    label: 'Dev',
    description: 'Gera e valida CPF, CNPJ e consulta CEP',
    href: 'https://dev.agilizatools.com.br',
    icon: 'code',
  },
  {
    id: 'sign',
    name: 'AgilizaSign',
    label: 'Assinar',
    description: 'Assina documentos PDF online sem cadastro',
    href: 'https://sign.agilizatools.com.br',
    icon: 'penTool',
  },
]
