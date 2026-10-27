'use client'

import { useState } from 'react'
import { Icon } from '@agiliza/ui'

type TextTab = 'counter' | 'json' | 'diff' | 'lorem'

export function TextTools() {
  const [activeTab, setActiveTab] = useState<TextTab>('counter')

  // --- Counter & Case State ---
  const [text, setText] = useState(
    'AgilizaText é a sua ferramenta online gratuita para contar caracteres, palavras e linhas, além de formatar textos e JSON instantaneamente.'
  )

  const charCount = text.length
  const charNoSpaceCount = text.replace(/\s+/g, '').length
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
  const lineCount = text ? text.split(/\r\n|\r|\n/).length : 0
  const readTimeMin = Math.ceil(wordCount / 200)

  const handleCaseChange = (type: 'upper' | 'lower' | 'title' | 'slug') => {
    if (type === 'upper') setText(text.toUpperCase())
    if (type === 'lower') setText(text.toLowerCase())
    if (type === 'title') {
      setText(
        text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
      )
    }
    if (type === 'slug') {
      setText(
        text
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9 -]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
      )
    }
  }

  // --- JSON State ---
  const [jsonInput, setJsonInput] = useState('{\n  "nome": "AgilizaTools",\n  "status": "ativo",\n  "ferramentas": 10\n}')
  const [jsonError, setJsonError] = useState('')

  const handleJsonFormat = (indent: number) => {
    try {
      const parsed = JSON.parse(jsonInput)
      setJsonInput(JSON.stringify(parsed, null, indent))
      setJsonError('')
    } catch (err: any) {
      setJsonError(`Erro de sintaxe JSON: ${err.message}`)
    }
  }

  // --- Diff State ---
  const [diffTextA, setDiffTextA] = useState('Linha 1: Texto original\nLinha 2: Exemplo de conteúdo')
  const [diffTextB, setDiffTextB] = useState('Linha 1: Texto alterado\nLinha 2: Exemplo de conteúdo')

  // --- Lorem Ipsum Generator ---
  const generateLorem = (paragraphsCount: number) => {
    const loremSample =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    const result = Array(paragraphsCount).fill(loremSample).join('\n\n')
    setText(result)
    setActiveTab('counter')
  }

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
        {([
          { id: 'counter', label: 'Contador & Caixa', icon: 'type' },
          { id: 'json', label: 'Formatador JSON', icon: 'settings' },
          { id: 'diff', label: 'Comparar Textos', icon: 'search' },
          { id: 'lorem', label: 'Lorem Ipsum', icon: 'file' },
        ] as const).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TextTab)}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Icon name={tab.icon} className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── 1. Counter & Case Converter ────────────────────────────────────── */}
      {activeTab === 'counter' && (
        <div className="space-y-6">
          {/* Live metrics cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-center">
              <span className="text-2xl font-extrabold text-blue-400">{charCount}</span>
              <span className="block text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">Caracteres</span>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-center">
              <span className="text-2xl font-extrabold text-cyan-400">{charNoSpaceCount}</span>
              <span className="block text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">Sem Espaços</span>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-center">
              <span className="text-2xl font-extrabold text-cyan-400">{wordCount}</span>
              <span className="block text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">Palavras</span>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-center">
              <span className="text-2xl font-extrabold text-emerald-400">{lineCount}</span>
              <span className="block text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">Linhas</span>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-center col-span-2 sm:col-span-1">
              <span className="text-2xl font-extrabold text-amber-400">~{readTimeMin}m</span>
              <span className="block text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">Tempo Leitura</span>
            </div>
          </div>

          {/* Textarea */}
          <div>
            <textarea
              rows={8}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Cole ou digite seu texto aqui..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none resize-y"
            />
          </div>

          {/* Quick Case Formatters */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => handleCaseChange('upper')}
              className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 rounded-lg"
            >
              MAIÚSCULAS
            </button>
            <button
              onClick={() => handleCaseChange('lower')}
              className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 rounded-lg"
            >
              minúsculas
            </button>
            <button
              onClick={() => handleCaseChange('title')}
              className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 rounded-lg"
            >
              Primeira Maiúscula
            </button>
            <button
              onClick={() => handleCaseChange('slug')}
              className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 rounded-lg"
            >
              slug-url-amigavel
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(text)}
              className="ml-auto px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded-lg shadow-md"
            >
              <Icon name="copy" className="mr-1.5 inline h-4 w-4" /> Copiar Texto
            </button>
          </div>
        </div>
      )}

      {/* ── 2. JSON Formatter & Validator ─────────────────────────────────── */}
      {activeTab === 'json' && (
        <div className="space-y-4">
          <textarea
            rows={10}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Cole seu código JSON aqui..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-cyan-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {jsonError && <p className="text-xs font-semibold text-rose-400 bg-rose-950/40 p-3 rounded-lg border border-rose-500/30">{jsonError}</p>}

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleJsonFormat(2)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg shadow-md"
            >
              Format (2 Espaços)
            </button>
            <button
              onClick={() => handleJsonFormat(4)}
              className="px-4 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs rounded-lg"
            >
              Format (4 Espaços)
            </button>
            <button
              onClick={() => handleJsonFormat(0)}
              className="px-4 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs rounded-lg"
            >
              Minificar (Compacto)
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(jsonInput)}
              className="ml-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-md"
            >
              <Icon name="copy" className="mr-1.5 inline h-4 w-4" /> Copiar JSON
            </button>
          </div>
        </div>
      )}

      {/* ── 3. Text Diff Viewer ────────────────────────────────────────────── */}
      {activeTab === 'diff' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Texto Original (A):</label>
              <textarea
                rows={8}
                value={diffTextA}
                onChange={(e) => setDiffTextA(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white resize-y font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Texto Comparado (B):</label>
              <textarea
                rows={8}
                value={diffTextB}
                onChange={(e) => setDiffTextB(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white resize-y font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── 4. Lorem Ipsum ────────────────────────────────────────────────── */}
      {activeTab === 'lorem' && (
        <div className="space-y-4 text-center py-6">
          <h3 className="text-sm font-bold text-white">Gerar Texto Fictício (Lorem Ipsum)</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Gere parágrafos de preenchimento para layouts, protótipos e testes de design.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => generateLorem(1)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg shadow-md"
            >
              1 Parágrafo
            </button>
            <button
              onClick={() => generateLorem(3)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg shadow-md"
            >
              3 Parágrafos
            </button>
            <button
              onClick={() => generateLorem(5)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg shadow-md"
            >
              5 Parágrafos
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
