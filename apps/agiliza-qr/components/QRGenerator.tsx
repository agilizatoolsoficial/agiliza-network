'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Input } from '@agiliza/ui'
import { buildPixPayload } from '../lib/pixPayload'

// â”€â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
type TabId = 'pix' | 'link' | 'wifi' | 'text' | 'contact' | 'vcard'

interface PixForm     { key: string; name: string; city: string; amount: string; description: string }
interface LinkForm    { url: string }
interface WifiForm    { ssid: string; password: string; encryption: 'WPA' | 'WEP' | 'nopass' }
interface TextForm    { text: string }
interface ContactForm { name: string; phone: string; email: string }
interface VCardForm   { name: string; company: string; role: string; phone: string; email: string; website: string; address: string }

type DownloadFormat = 'png' | 'svg'

// â”€â”€â”€ Tabs List â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  {
    id: 'pix',
    label: 'Pix',
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7.5A2.5 2.5 0 015.5 5h13A2.5 2.5 0 0121 7.5v9a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 16.5v-9zM16 12h.01M8 12h.01M12 9v6m-1.5-1a1.5 1.5 0 103 0c0-.828-.672-1.5-1.5-1.5s-1.5-.672-1.5-1.5a1.5 1.5 0 013 0" />
      </svg>
    ),
  },
  {
    id: 'link',
    label: 'Link',
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
  {
    id: 'wifi',
    label: 'Wi-Fi',
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
  },
  {
    id: 'text',
    label: 'Texto',
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'Contato',
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: 'vcard',
    label: 'VCard',
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
      </svg>
    ),
  },
]

// â”€â”€â”€ Build QR Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function buildQRData(
  tab: TabId,
  pix: PixForm,
  link: LinkForm,
  wifi: WifiForm,
  text: TextForm,
  contact: ContactForm,
  vcard: VCardForm
): string {
  switch (tab) {
    case 'pix':
      if (!pix.key.trim() || !pix.name.trim() || !pix.city.trim()) return ''
      return buildPixPayload({
        key: pix.key.trim(),
        name: pix.name.trim(),
        city: pix.city.trim(),
        amount: pix.amount ? parseFloat(pix.amount.replace(',', '.')) : undefined,
        description: pix.description.trim(),
      })
    case 'link':
      if (!link.url.trim()) return ''
      return link.url.trim().startsWith('http') ? link.url.trim() : `https://${link.url.trim()}`
    case 'wifi':
      if (!wifi.ssid.trim()) return ''
      return `WIFI:T:${wifi.encryption};S:${wifi.ssid};P:${wifi.password};;`
    case 'text':
      return text.text.trim()
    case 'contact':
      if (!contact.name.trim() && !contact.phone.trim() && !contact.email.trim()) return ''
      return `MECARD:N:${contact.name};TEL:${contact.phone};EMAIL:${contact.email};;`
    case 'vcard':
      if (
        !vcard.name.trim() &&
        !vcard.company.trim() &&
        !vcard.role.trim() &&
        !vcard.phone.trim() &&
        !vcard.email.trim() &&
        !vcard.website.trim() &&
        !vcard.address.trim()
      ) {
        return ''
      }
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${vcard.name}`,
        `ORG:${vcard.company || ''}`,
        `TITLE:${vcard.role || ''}`,
        `TEL:${vcard.phone || ''}`,
        `EMAIL:${vcard.email || ''}`,
        `URL:${vcard.website || ''}`,
        `ADR:;;${vcard.address || ''};;;;`,
        'END:VCARD',
      ].join('\n')
  }
}

// â”€â”€â”€ UI Helper Components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold text-slate-300">
      {children}
    </label>
  )
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function QRGenerator() {
  const [activeTab, setActiveTab] = useState<TabId>('pix')
  const [qrColor, setQrColor] = useState('#1E293B')
  const [bgColor, setBgColor] = useState('#FFFFFF')
  const [margin, setMargin] = useState(4)
  const [isDynamic, setIsDynamic] = useState(false)
  const [includeLogo, setIncludeLogo] = useState(true)
  const [copyFeedback, setCopyFeedback] = useState('')
  const [svgContent, setSvgContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Form states com valores em branco para exibir os placeholders de exemplo transparentes
  const [pixForm, setPixForm] = useState<PixForm>({
    key: '',
    name: '',
    city: '',
    amount: '',
    description: '',
  })
  const [linkForm, setLinkForm] = useState<LinkForm>({ url: '' })
  const [wifiForm, setWifiForm] = useState<WifiForm>({
    ssid: '',
    password: '',
    encryption: 'WPA',
  })
  const [textForm, setTextForm] = useState<TextForm>({
    text: '',
  })
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    phone: '',
    email: '',
  })
  const [vcardForm, setVcardForm] = useState<VCardForm>({
    name: '',
    company: '',
    role: '',
    phone: '',
    email: '',
    website: '',
    address: '',
  })

  const qrData = useMemo(
    () => buildQRData(activeTab, pixForm, linkForm, wifiForm, textForm, contactForm, vcardForm),
    [activeTab, pixForm, linkForm, wifiForm, textForm, contactForm, vcardForm]
  )

  const getTabTitle = () => {
    switch (activeTab) {
      case 'pix': return 'Dados do Pix'
      case 'link': return 'Dados do Link'
      case 'wifi': return 'Dados do Wi-Fi'
      case 'text': return 'Dados do Texto'
      case 'contact': return 'Dados do Contato'
      case 'vcard': return 'Dados do VCard'
    }
  }

  // â”€â”€â”€ QR Generation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const generateQR = useCallback(async () => {
    if (!qrData || !canvasRef.current) {
      setSvgContent('')
      return
    }

    setIsGenerating(true)
    try {
      const QRCode = (await import('qrcode')).default
      const canvas = canvasRef.current
      const size = 260

      // Render base QR code to canvas
      await QRCode.toCanvas(canvas, qrData, {
        width: size,
        margin: margin,
        color: {
          dark: qrColor,
          light: bgColor,
        },
        errorCorrectionLevel: 'H',
      })

      // Draw Center Logo badge
      if (includeLogo) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          const logoSize = size * 0.22
          const x = (size - logoSize) / 2
          const y = (size - logoSize) / 2

          // White container for logo with subtle shadow
          ctx.save()
          ctx.fillStyle = bgColor || '#FFFFFF'
          ctx.shadowColor = 'rgba(0,0,0,0.1)'
          ctx.shadowBlur = 4
          ctx.beginPath()
          ctx.roundRect(x, y, logoSize, logoSize, 6)
          ctx.fill()
          ctx.restore()

          // Draw the official logo image
          const logoImg = new Image()
          logoImg.src = '/logo.png'
          await new Promise<void>((resolve) => {
            logoImg.onload = () => {
              const padding = 4
              ctx.drawImage(
                logoImg,
                x + padding,
                y + padding,
                logoSize - padding * 2,
                logoSize - padding * 2
              )
              resolve()
            }
            logoImg.onerror = () => resolve()
          })
        }
      }

      // Generate SVG
      const rawSvg = await QRCode.toString(qrData, {
        type: 'svg',
        margin: margin,
        color: { dark: qrColor, light: bgColor },
        errorCorrectionLevel: 'H',
      })
      setSvgContent(rawSvg)
    } catch (err) {
      console.error('QR generation error:', err)
    } finally {
      setIsGenerating(false)
    }
  }, [qrData, qrColor, bgColor, margin, includeLogo])

  useEffect(() => {
    const timer = setTimeout(generateQR, 200)
    return () => clearTimeout(timer)
  }, [generateQR])

  // â”€â”€â”€ Download Handlers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  function download(format: DownloadFormat) {
    const filename = `agiliza-qr-${activeTab}`

    if (format === 'png' && canvasRef.current) {
      const link = document.createElement('a')
      link.href = canvasRef.current.toDataURL('image/png')
      link.download = `${filename}.png`
      link.click()
    } else if (format === 'svg' && svgContent) {
      const blob = new Blob([svgContent], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${filename}.svg`
      link.click()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    }
  }

  // â”€â”€â”€ Copy Image / Share â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  async function copyImage() {
    if (!canvasRef.current) return
    try {
      canvasRef.current.toBlob(async blob => {
        if (!blob) return
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
        setCopyFeedback('Copiado!')
        setTimeout(() => setCopyFeedback(''), 2500)
      })
    } catch {
      setCopyFeedback('Use Baixar PNG')
      setTimeout(() => setCopyFeedback(''), 2500)
    }
  }


  return (
    <div className="w-full">
      {/* â”€â”€ Tabs Selector â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="mb-5 flex justify-center">
        <div
          className="bg-slate-100 p-1 rounded-xl inline-flex flex-wrap gap-1 justify-center border border-slate-200/60"
          role="tablist"
        >
          {TABS.map(tab => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs transition-all ${
                  isActive
                    ? 'bg-white text-blue-600 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* â”€â”€ Main 2-Column Grid Centralizado â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto my-[20px] items-start">

        {/* â”€â”€ Left Column: Form Inputs (lg:col-span-7) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">
                {getTabTitle()}
              </h2>
              <span className="text-xs text-slate-400 font-medium">
                Preenchimento Automático
              </span>
            </div>

            {/* Dynamic Form Content */}
            <div className="space-y-5">
              {activeTab === 'pix' && (
                <>
                  <div>
                    <Label htmlFor="pix-key">Chave Pix</Label>
                    <Input
                      id="pix-key"
                      value={pixForm.key}
                      onChange={(e) => setPixForm(f => ({ ...f, key: e.target.value }))}
                      placeholder="Chave Pix"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pix-name">Nome do Beneficiário</Label>
                    <Input
                      id="pix-name"
                      value={pixForm.name}
                      onChange={(e) => setPixForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Nome do beneficiário"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pix-amount">Valor Opcional (R$)</Label>
                    <Input
                      id="pix-amount"
                      value={pixForm.amount}
                      onChange={(e) => setPixForm(f => ({ ...f, amount: e.target.value }))}
                      placeholder="0,00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pix-city">Cidade / CEP</Label>
                    <Input
                      id="pix-city"
                      value={pixForm.city}
                      onChange={(e) => setPixForm(f => ({ ...f, city: e.target.value }))}
                      placeholder="Cidade do beneficiário"
                    />
                  </div>
                </>
              )}

              {activeTab === 'link' && (
                <div>
                  <Label htmlFor="link-url">URL ou Link de Destino</Label>
                  <Input
                    id="link-url"
                    type="url"
                    value={linkForm.url}
                    onChange={(e) => setLinkForm({ url: e.target.value })}
                    placeholder="https://seusite.com.br"
                  />
                  <p className="mt-1.5 text-xs text-slate-400">
                    Cole links de sites, redes sociais, WhatsApp ou cardápios digitais.
                  </p>
                </div>
              )}

              {activeTab === 'wifi' && (
                <>
                  <div>
                    <Label htmlFor="wifi-ssid">Nome da Rede (SSID)</Label>
                    <Input
                      id="wifi-ssid"
                      value={wifiForm.ssid}
                      onChange={(e) => setWifiForm(f => ({ ...f, ssid: e.target.value }))}
                        placeholder="Nome da rede"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="wifi-pass">Senha</Label>
                      <Input
                        id="wifi-pass"
                        value={wifiForm.password}
                        onChange={(e) => setWifiForm(f => ({ ...f, password: e.target.value }))}
                        placeholder="Senha do Wi-Fi"
                      />
                    </div>
                    <div>
                      <Label htmlFor="wifi-enc">Criptografia</Label>
                      <select
                        id="wifi-enc"
                        value={wifiForm.encryption}
                        onChange={e => setWifiForm(f => ({ ...f, encryption: e.target.value as 'WPA' | 'WEP' | 'nopass' }))}
                        className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-slate-50/50 px-3 text-xs leading-none text-slate-800 transition-all hover:border-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20 shadow-sm mb-[10px]"
                      >
                        <option value="WPA">WPA / WPA2 (Padrão)</option>
                        <option value="WEP">WEP</option>
                        <option value="nopass">Rede Aberta (Sem Senha)</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'text' && (
                <div>
                  <Label htmlFor="text-content">Texto ou Mensagem</Label>
<textarea
                     id="text-content"
                     rows={4}
                     value={textForm.text}
                     onChange={e => setTextForm({ text: e.target.value })}
                     placeholder="Digite seu texto aqui..."
                     className="w-full min-h-[44px] rounded-xl border border-slate-300 bg-slate-50/50 p-5 text-sm text-slate-800 placeholder:text-slate-400/65 transition-all hover:border-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm mb-[15px]"
                   />
                </div>
              )}

              {activeTab === 'contact' && (
                <>
                  <div>
                    <Label htmlFor="contact-name">Nome do Contato</Label>
                    <Input
                      id="contact-name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Nome completo"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-phone">Telefone / WhatsApp</Label>
                      <Input
                        id="contact-phone"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm(f => ({ ...f, phone: e.target.value }))}
                        placeholder="Informe o telefone"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-email">E-mail</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="Informe o e-mail"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'vcard' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="vcard-name">Nome Completo</Label>
                      <Input
                        id="vcard-name"
                        value={vcardForm.name}
                        onChange={(e) => setVcardForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Nome completo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="vcard-comp">Empresa</Label>
                      <Input
                        id="vcard-comp"
                        value={vcardForm.company}
                        onChange={(e) => setVcardForm(f => ({ ...f, company: e.target.value }))}
                        placeholder="Nome da empresa"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="vcard-role">Cargo</Label>
                      <Input
                        id="vcard-role"
                        value={vcardForm.role}
                        onChange={(e) => setVcardForm(f => ({ ...f, role: e.target.value }))}
                        placeholder="Cargo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="vcard-phone">Telefone</Label>
                      <Input
                        id="vcard-phone"
                        value={vcardForm.phone}
                        onChange={(e) => setVcardForm(f => ({ ...f, phone: e.target.value }))}
                        placeholder="Informe o telefone"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="vcard-email">E-mail</Label>
                      <Input
                        id="vcard-email"
                        type="email"
                        value={vcardForm.email}
                        onChange={(e) => setVcardForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="Informe o e-mail"
                      />
                    </div>
                    <div>
                      <Label htmlFor="vcard-web">Website</Label>
                      <Input
                        id="vcard-web"
                        value={vcardForm.website}
                        onChange={(e) => setVcardForm(f => ({ ...f, website: e.target.value }))}
                        placeholder="https://exemplo.com"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Container delimitado e sombreado: Personalizar Cores e Margem */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl mt-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold text-slate-700">Personalizar Cores e Margem</p>
              <div className="grid grid-cols-3 gap-3">
                {/* Cor do QR */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-600">Cor do QR</label>
                  <div className="flex items-center rounded-lg border border-slate-200 bg-white p-1.5 shadow-sm">
                    <input
                      type="color"
                      value={qrColor}
                      onChange={e => setQrColor(e.target.value)}
                      className="h-5 w-5 shrink-0 rounded cursor-pointer border border-slate-300 mr-1.5"
                      aria-label="Cor do QR Code"
                    />
                    <input
                      type="text"
                      value={qrColor.toUpperCase()}
                      onChange={e => setQrColor(e.target.value)}
                      className="w-full bg-transparent text-xs font-mono font-medium text-slate-700 outline-none uppercase"
                    />
                  </div>
                </div>

                {/* Fundo */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-600">Fundo</label>
                  <div className="flex items-center rounded-lg border border-slate-200 bg-white p-1.5 shadow-sm">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={e => setBgColor(e.target.value)}
                      className="h-5 w-5 shrink-0 rounded cursor-pointer border border-slate-300 mr-1.5"
                      aria-label="Cor de Fundo"
                    />
                    <input
                      type="text"
                      value={bgColor.toUpperCase()}
                      onChange={e => setBgColor(e.target.value)}
                      className="w-full bg-transparent text-xs font-mono font-medium text-slate-700 outline-none uppercase"
                    />
                  </div>
                </div>

                {/* Margem */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-600">Margem</label>
                  <select
                    value={margin}
                    onChange={e => setMargin(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs font-medium text-slate-700 outline-none focus:border-blue-500 shadow-sm"
                  >
                    <option value={0}>0px</option>
                    <option value={2}>2px</option>
                    <option value={4}>4px</option>
                    <option value={8}>8px</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Dynamic Toggle Row */}
            <div className="flex items-center justify-between px-1 pt-1">
              <div>
                <span className="text-xs font-semibold text-slate-800">Tornar Dinâmico</span>
                <p className="text-[11px] text-slate-400">Permite editar o destino mesmo após a impressão</p>
              </div>
<button
                 type="button"
                 role="switch"
                 aria-checked={isDynamic}
                 aria-label="Tornar o QR Code dinâmico"
                 onClick={() => setIsDynamic(!isDynamic)}
                 className="inline-flex items-center justify-center rounded-lg p-1 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
               >
                 <span
                   className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-md border-2 border-transparent transition-colors duration-200 ease-in-out ${
                     isDynamic ? 'bg-blue-600' : 'bg-slate-300'
                   }`}
                 >
                   <span
                     aria-hidden="true"
                     className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out ${
                       isDynamic ? 'translate-x-4' : 'translate-x-0'
                     }`}
                   />
                 </span>
               </button>
            </div>
          </div>
        </div>

        {/* â”€â”€ Right Column: Preview & Download Actions (lg:col-span-5) â”€â”€â”€â”€ */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center h-full">
          <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm w-full flex flex-col items-center justify-center">
            {/* Header / Subtitle */}
            <div className="text-center mb-5">
              <h3 className="text-sm font-bold text-slate-900">
                Pré-visualização do QR Code
              </h3>
              <p className="text-xs text-slate-400 capitalize mt-0.5">
                {activeTab} #1
              </p>
            </div>

            {/* QR Code Container com respiro */}
            <div className="p-4 bg-white rounded-xl shadow-inner border border-slate-100 flex items-center justify-center relative mb-6">
              <canvas
                ref={canvasRef}
                width={240}
                height={240}
                className="h-48 w-48 rounded-md object-contain transition-all"
                aria-label="Pré-visualização do QR Code"
              />

              {isGenerating && (
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/70 backdrop-blur-2xs">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                </div>
              )}
            </div>

            {/* Action Buttons Group */}
            <div className="w-full space-y-3">
              <button
                onClick={() => download('png')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl w-full text-sm uppercase tracking-wider transition-all shadow-sm active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Baixar PNG
              </button>

              <div className="grid grid-cols-2 gap-3 w-full">
                <button
                  onClick={() => download('svg')}
                  className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Baixar SVG
                </button>

                <button
                  onClick={copyImage}
                  className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {copyFeedback || 'Copiar Imagem'}
                </button>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-400 text-center">
              âœ“ Processamento 100% local no seu navegador
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
