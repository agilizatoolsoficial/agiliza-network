'use client'

import { useState, useMemo } from 'react'
import { TOOLS, Container, Card, Input, Icon } from '@agiliza/ui'
import type { IconName } from '@agiliza/ui'

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
    <Container size="xl" className="flex flex-col items-center pt-6 pb-10 sm:pt-8 sm:pb-12">
      {/* Hero Section */}
      <section className="mb-8 flex max-w-3xl flex-col items-center text-center sm:mb-10">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
          Sua Central de Ferramentas Web{' '}
          <span className="text-blue-300">
            Rápidas, Privadas & Gratuitas
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-500">
          Comprima PDFs, gere QR Codes Pix, faça cálculos e edite arquivos direto no navegador.
        </p>

        {/* Search Input Bar */}
        <div className="relative mt-7 w-full max-w-2xl">
          <div className="relative">
            <Input
              id="search-tools"
              type="text"
              size="md"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              placeholder="Buscar ferramenta (ex: PDF, Pix, CLT vs PJ, JSON...)"
              aria-label="Buscar ferramenta"
              className="rounded-lg pl-11 pr-4 shadow-sm shadow-slate-900/5"
            />
            <svg
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
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
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md bg-slate-800 px-2 py-1 text-[11px] text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
                aria-label="Limpar busca"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-5 w-full max-w-full overflow-x-auto pb-1 sm:overflow-visible">
          <div className="flex w-max min-w-full justify-start gap-2 sm:w-full sm:flex-wrap sm:justify-center" role="tablist" aria-label="Categorias de ferramentas">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap rounded-md border px-3 py-2 text-[11px] font-semibold transition-colors ${
                  selectedCategory === cat.id
                    ? 'border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                    : 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="mb-10 w-full" aria-label="Lista de ferramentas disponíveis">
        {filteredTools.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white py-12 text-center shadow-sm">
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
          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => (
              <a
                key={tool.id}
                href={tool.href}
                className="group relative h-full"
              >
                <Card variant="default" padding="md" hoverable className="flex h-full min-h-[200px] flex-col justify-between">
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800/80 text-blue-300">
                        <Icon name={tool.icon} className="h-5 w-5" />
                      </span>
                      {tool.badge && (
                        <span className="rounded-md border border-blue-500/20 bg-blue-500/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-300">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <h2 className="flex items-center gap-1.5 text-base font-bold text-white transition-colors group-hover:text-blue-300">
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
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                      {tool.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-800/60 pt-3 text-[11px] font-semibold text-blue-400 group-hover:text-blue-300">
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
      <section className="my-10 grid w-full grid-cols-1 gap-5 md:grid-cols-3" aria-label="Diferenciais da plataforma">
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
