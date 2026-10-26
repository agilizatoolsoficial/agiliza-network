'use client'

import { useState, useRef, useEffect } from 'react'
import { Icon } from '@agiliza/ui'

const NETWORK_TOOLS = [
  { name: 'AgilizaPDF', desc: 'Comprimir, mesclar e converter PDF', href: 'https://pdf.agilizatools.com.br', icon: 'file' },
  { name: 'AgilizaMedia', desc: 'Download de vídeos do Instagram e TikTok', href: 'https://media.agilizatools.com.br', icon: 'video' },
  { name: 'AgilizaCalc', desc: 'Calculadoras CLT, PJ e Financeiro', href: 'https://calc.agilizatools.com.br', icon: 'calculator' },
  { name: 'AgilizaBio', desc: 'Página de links personalizável para redes', href: 'https://bio.agilizatools.com.br', icon: 'link' },
  { name: 'AgilizaNota', desc: 'Emissão de recibos e declarações em PDF', href: 'https://nota.agilizatools.com.br', icon: 'receipt' },
  { name: 'AgilizaSign', desc: 'Assinatura digital de documentos online', href: 'https://sign.agilizatools.com.br', icon: 'penTool' },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 h-16 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="flex h-full w-full items-center justify-between px-8 sm:px-12 lg:px-16">
          {/* ── 1. Lado Esquerdo (Brand / Logo) ─────────────────────────── */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://agilizatools.com.br"
              className="flex items-center gap-2.5 text-lg font-bold text-slate-900 transition-opacity hover:opacity-90"
              aria-label="AgilizaTools — Ver Todas as Ferramentas"
            >
              <img
                src="/logo.png"
                alt="Logo Agiliza"
                className="h-8 sm:h-9 w-auto object-contain"
              />
              <span className="font-extrabold tracking-tight text-slate-900 text-lg">
                Agiliza<span className="font-semibold text-blue-600">Tools</span>
              </span>
            </a>
          </div>

          {/* ── 2. Centro (Links de Navegação) ─────────────────────────── */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a
              href="https://agilizatools.com.br"
              className="transition-colors hover:text-blue-600"
            >
              Início
            </a>

            {/* Tools Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 transition-colors hover:text-blue-600"
              >
                <span>Ferramentas</span>
                <svg
                  className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 origin-top rounded-2xl border border-slate-200 bg-white p-2 shadow-xl animate-fade-in">
                  <div className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Rede de Ferramentas
                  </div>
                  <div className="space-y-1">
                    {NETWORK_TOOLS.map((tool) => (
                      <a
                        key={tool.name}
                        href={tool.href}
                        className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-slate-50"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Icon name={tool.icon} className="h-5 w-5 shrink-0 text-blue-600" />
                        <div>
                          <p className="text-xs font-semibold text-slate-900">{tool.name}</p>
                          <p className="text-[11px] text-slate-500">{tool.desc}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a
              href="#precos"
              className="transition-colors hover:text-blue-600"
            >
              Preços
            </a>

            <a
              href="#faq"
              className="transition-colors hover:text-blue-600"
            >
              Dúvidas
            </a>
          </nav>

          {/* ── 3. Lado Direito (Ações / Botões) ────────────────────────── */}
          <div className="hidden md:flex items-center gap-5 shrink-0">
            {/* Botão Conta */}
            <button
              onClick={() => setLoginModalOpen(true)}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-700 transition-colors hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Conta</span>
            </button>

            {/* Botão CRIAR QR CODE */}
            <a
              href="#gerador-qr-code"
              style={{
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                padding: '9px 20px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '12px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
              }}
              className="shadow-xs hover:opacity-90 active:scale-95 transition-all"
            >
              CRIAR QR CODE
            </a>
          </div>

          {/* ── Mobile Hamburger ────────────────────────────────────────── */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 md:hidden"
            aria-label="Menu de Navegação"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* ── Mobile Menu Drawer ──────────────────────────────────────── */}
        {mobileMenuOpen && (
          <div className="border-b border-slate-200 bg-white px-4 py-4 md:hidden shadow-lg animate-fade-in">
            <nav className="flex flex-col gap-3">
              <a
                href="https://agilizatools.com.br"
                className="text-xs font-semibold text-slate-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Início
              </a>

              <div className="py-2 border-y border-slate-100">
                <p className="text-[11px] font-semibold text-slate-400 mb-2 uppercase">Outras Ferramentas</p>
                <div className="grid grid-cols-2 gap-2">
                  {NETWORK_TOOLS.map(tool => (
                    <a
                      key={tool.name}
                      href={tool.href}
                      className="flex items-center gap-2 rounded-lg p-1.5 text-xs text-slate-700 hover:bg-slate-50"
                    >
                      <span>{tool.icon}</span>
                      <span>{tool.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              <a
                href="#precos"
                className="text-xs font-semibold text-slate-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Preços
              </a>

              <a
                href="#faq"
                className="text-xs font-semibold text-slate-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dúvidas
              </a>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="#gerador-qr-code"
                  className="w-full text-center rounded-xl bg-blue-600 py-2.5 text-xs font-bold uppercase tracking-wider text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Criar QR Code
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setLoginModalOpen(true)
                  }}
                  className="flex items-center justify-center gap-2 w-full rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Minha Conta / Login</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* ── Modal de Login / Conta ────────────────────────────────────── */}
      {loginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl relative animate-scale-in">
            {/* Close Button */}
            <button
              onClick={() => setLoginModalOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label="Fechar"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-5">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-900">Acesse sua Conta</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Faça login para salvar seus QR Codes e histórico
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setLoginModalOpen(false); }} className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">E-mail</label>
                <input
                  type="email"
                  required
                  placeholder="Informe o e-mail"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Senha</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-blue-700 transition-colors"
              >
                Entrar
              </button>
            </form>

            <div className="mt-4 text-center text-xs text-slate-500">
              Não tem uma conta?{' '}
              <button
                type="button"
                onClick={() => setLoginModalOpen(false)}
                className="font-semibold text-blue-600 hover:underline"
              >
                Cadastre-se grátis
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
