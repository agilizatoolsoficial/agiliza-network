'use client'

import { useState, useMemo } from 'react'
import { TOOLS, Container, Card, Input, ThemeToggle, Icon } from '@agiliza/ui'
import type { IconName } from '@agiliza/ui'
import { useTheme } from '@agiliza/ui'

interface CategoryOption {
  id: string
  label: string
  ids?: string[]
}

const CATEGORIES: CategoryOption[] = [
  { id: 'all', label: 'Todas as Ferramentas' },
  { id: 'documentos', label: 'PDF & Documentos', ids: ['pdf', 'nota', 'sign'] },
  { id: 'utilitarios', label: 'Produtividade', ids: ['qr', 'bio', 'text', 'dev'] },
  { id: 'financas', label: 'Finanças & Cálculos', ids: ['calc'] },
  { id: 'midia', label: 'Mídia & Imagem', ids: ['media', 'img'] },
]

export default function Home() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { theme, toggleTheme } = useTheme()

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase()
    return TOOLS.filter((tool) => {
      const matchesSearch =
        !query ||
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.label.toLowerCase().includes(query)

      if (selectedCategory === 'all') return matchesSearch

      const categoryObj = CATEGORIES.find((c) => c.id === selectedCategory)
      const matchesCategory = categoryObj?.ids?.includes(tool.id)

      return matchesSearch && matchesCategory
    })
  }, [search, selectedCategory])

  return (
    <Container size="xl" section className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="text-center my-6 max-w-3xl flex flex-col items-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-950/80 border border-blue-500/30 px-4 py-1.5 text-xs font-semibold text-blue-300 mb-4 shadow-lg shadow-blue-950/50">
          <Icon name="bolt" className="h-4 w-4" />
          <span>Rede Agiliza — 10 Ferramentas Utilitárias Gratuitas</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Sua Central de Ferramentas Web{' '}
          <span className="text-blue-300">
            Rápidas, Privadas & Gratuitas
          </span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
          Processamento 100% no seu navegador. Comprima PDFs, gere QR Code Pix, calcule rescisão, edite imagens, formate JSON e crie bio links sem cadastro.
        </p>

        {/* Search Input Bar */}
        <div className="mt-8 w-full max-w-xl relative">
          <div className="relative">
            <Input
              id="search-tools"
              type="text"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              placeholder="Buscar ferramenta (ex: PDF, Pix, CLT vs PJ, JSON...)"
              aria-label="Buscar ferramenta"
              className="pl-12 pr-12"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white px-2 py-1 rounded-md transition-colors"
                aria-label="Limpar busca"
              >
                Limpar
              </button>
            )}
          </div>
          <div className="absolute top-2 right-0">
            <ThemeToggle />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-6 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Categorias de ferramentas">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-1 ring-blue-400'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Tools Grid */}
      <section className="w-full my-8" aria-label="Lista de ferramentas disponíveis">
        {filteredTools.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">Nenhuma ferramenta encontrada para "{search}".</p>
            <button
              type="button"
              onClick={() => {
                setSearch('')
                setSelectedCategory('all')
              }}
              className="mt-3 text-xs font-semibold text-blue-400 hover:underline"
            >
              Ver todas as 10 ferramentas
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <a
                key={tool.id}
                href={tool.href}
                className="group relative"
              >
                <Card variant="default" padding="lg" hoverable className="h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/80 text-blue-300">
                        <Icon name={tool.icon} className="h-6 w-6" />
                      </span>
                      {tool.badge && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors flex items-center gap-1.5">
                      {tool.name}
                      <svg
                        className="h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </h2>
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-blue-400 font-semibold group-hover:text-blue-300">
                    <span>Acessar ferramenta</span>
                    <span aria-hidden="true">→</span>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Feature Highlights */}
      <section className="my-12 w-full grid grid-cols-1 md:grid-cols-3 gap-6" aria-label="Diferenciais da plataforma">
        {[
          {
            icon: 'shield',
            title: '100% Privado & Client-side',
            desc: 'Seus arquivos, documentos e dados não são enviados para nenhum servidor externo. Tudo é processado direto no seu navegador.',
          },
          {
            icon: 'bolt',
            title: 'Gratuito & Sem Cadastro',
            desc: 'Sem necessidade de login, senhas ou assinaturas pagas. Acesse e use qualquer utilitário instantaneamente.',
          },
          {
            icon: 'smartphone',
            title: 'Responsivo & Otimizado',
            desc: 'Funciona perfeitamente em smartphones, tablets e computadores, com alta performance e carregamento instantâneo.',
          },
        ].map((feat, idx) => (
          <Card key={idx} variant="bordered" padding="md" className="text-center">
            <Icon name={feat.icon as IconName} className="mx-auto mb-3 h-8 w-8 text-blue-300" />
            <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
          </Card>
        ))}
      </section>

      {/* FAQ Section */}
      <section className="my-8 w-full max-w-4xl" aria-label="Perguntas Frequentes">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white">Dúvidas Frequentes</h2>
          <p className="text-xs text-slate-400 mt-1">Conheça mais sobre a suíte Agiliza Tools</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              q: 'As ferramentas da Rede Agiliza são gratuitas?',
              a: 'Sim! Todas as 10 ferramentas são 100% gratuitas e ilimitadas para uso pessoal e comercial.',
            },
            {
              q: 'Meus arquivos são salvos em algum servidor?',
              a: 'Não. Ferramentas como AgilizaPDF, AgilizaImg e AgilizaSign processam os arquivos localmente via WebAssembly e Canvas no seu próprio navegador.',
            },
            {
              q: 'Preciso criar conta para usar?',
              a: 'Não é necessário nenhum cadastro ou fornecimento de e-mail para utilizar as ferramentas utilitárias.',
            },
            {
              q: 'Quais ferramentas estão disponíveis?',
              a: 'AgilizaPDF, AgilizaMedia, AgilizaCalc, AgilizaQR, AgilizaBio, AgilizaNota, AgilizaImg, AgilizaText, AgilizaDev e AgilizaSign.',
            },
          ].map((item, idx) => (
            <Card key={idx} variant="default" padding="sm" className="bg-slate-900/90">
              <h3 className="text-xs font-bold text-white mb-1.5">{item.q}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.a}</p>
            </Card>
          ))}
        </div>
      </section>
    </Container>
  )
}
