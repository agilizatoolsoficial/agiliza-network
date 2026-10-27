'use client'

import { useState } from 'react'
import { Icon } from '@agiliza/ui'

type DevTab = 'generator' | 'cep' | 'encoder' | 'mock'

export function DevSuite() {
  const [activeTab, setActiveTab] = useState<DevTab>('generator')

  // --- Document Generator State ---
  const [useMask, setUseMask] = useState(true)
  const [generatedCpf, setGeneratedCpf] = useState('')
  const [generatedCnpj, setGeneratedCnpj] = useState('')
  const [validateInput, setValidateInput] = useState('')
  const [validationResult, setValidationResult] = useState<{ isValid?: boolean; type?: string } | null>(null)

  // Algorithm for valid CPF
  const generateCPF = () => {
    const randomDigits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10))
    // Calculate digit 1
    let sum1 = randomDigits.reduce((acc, digit, idx) => acc + digit * (10 - idx), 0)
    let d1 = (sum1 * 10) % 11
    if (d1 === 10 || d1 === 11) d1 = 0

    // Calculate digit 2
    const digitsWithD1 = [...randomDigits, d1]
    let sum2 = digitsWithD1.reduce((acc, digit, idx) => acc + digit * (11 - idx), 0)
    let d2 = (sum2 * 10) % 11
    if (d2 === 10 || d2 === 11) d2 = 0

    const raw = [...randomDigits, d1, d2].join('')
    if (useMask) {
      setGeneratedCpf(raw.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'))
    } else {
      setGeneratedCpf(raw)
    }
  }

  // Algorithm for valid CNPJ
  const generateCNPJ = () => {
    const base = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10))
    const branch = [0, 0, 0, 1] // 0001
    const raw12 = [...base, ...branch]

    const weight1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    const sum1 = raw12.reduce((acc, d, idx) => acc + d * weight1[idx]!, 0)
    let d1 = 11 - (sum1 % 11)
    if (d1 >= 10) d1 = 0

    const raw13 = [...raw12, d1]
    const weight2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    const sum2 = raw13.reduce((acc, d, idx) => acc + d * weight2[idx]!, 0)
    let d2 = 11 - (sum2 % 11)
    if (d2 >= 10) d2 = 0

    const raw = [...raw13, d2].join('')
    if (useMask) {
      setGeneratedCnpj(raw.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5'))
    } else {
      setGeneratedCnpj(raw)
    }
  }

  const validateDoc = () => {
    const clean = validateInput.replace(/\D/g, '')
    if (clean.length === 11) {
      setValidationResult({ isValid: true, type: 'CPF Válido' })
    } else if (clean.length === 14) {
      setValidationResult({ isValid: true, type: 'CNPJ Válido' })
    } else {
      setValidationResult({ isValid: false, type: 'Documento Inválido (digite 11 ou 14 dígitos)' })
    }
  }

  // --- CEP State ---
  const [cepInput, setCepInput] = useState('')
  const [cepResult, setCepResult] = useState<any>(null)
  const [cepLoading, setCepLoading] = useState(false)

  const handleSearchCEP = async (e: React.FormEvent) => {
    e.preventDefault()
    const cleanCep = cepInput.replace(/\D/g, '')
    if (cleanCep.length !== 8) return
    setCepLoading(true)
    setCepResult(null)

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
      const data = await res.json()
      if (!data.erro) {
        setCepResult(data)
      } else {
        setCepResult({ erro: true })
      }
    } catch {
      setCepResult({ erro: true })
    } finally {
      setCepLoading(false)
    }
  }

  // --- Base64 State ---
  const [encoderText, setEncoderText] = useState('Texto de teste para Base64')
  const [base64Result, setBase64Result] = useState('')

  const handleBase64Encode = () => {
    try {
      setBase64Result(btoa(encoderText))
    } catch {
      setBase64Result('Erro ao codificar')
    }
  }

  const handleBase64Decode = () => {
    try {
      setBase64Result(atob(encoderText))
    } catch {
      setBase64Result('Base64 inválido')
    }
  }

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
        {([
          { id: 'generator', label: 'CPF & CNPJ', icon: 'file' },
          { id: 'cep', label: 'Consultar CEP', icon: 'mapPin' },
          { id: 'encoder', label: 'Base64 & URL', icon: 'code' },
          { id: 'mock', label: 'Dados de Teste', icon: 'user' },
        ] as const).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as DevTab)}
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

      {/* ── 1. CPF & CNPJ Generator ────────────────────────────────────────── */}
      {activeTab === 'generator' && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <input
              type="checkbox"
              id="mask"
              checked={useMask}
              onChange={(e) => setUseMask(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-blue-600"
            />
            <label htmlFor="mask" className="text-xs text-slate-300 font-semibold cursor-pointer">
              Formatar com pontuação
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CPF Box */}
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-3">
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Gerador de CPF Válido</h3>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={generatedCpf || 'Clique para gerar...'}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm font-mono font-bold text-white text-center"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={generateCPF}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg shadow-md"
                >
                  Gerar CPF
                </button>
                {generatedCpf && (
                  <button
                    onClick={() => navigator.clipboard.writeText(generatedCpf)}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg"
                  >
                    <Icon name="copy" className="mr-1.5 inline h-4 w-4" /> Copiar
                  </button>
                )}
              </div>
            </div>

            {/* CNPJ Box */}
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-3">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Gerador de CNPJ Válido</h3>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={generatedCnpj || 'Clique para gerar...'}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm font-mono font-bold text-white text-center"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={generateCNPJ}
                  className="flex-1 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-lg shadow-md"
                >
                  Gerar CNPJ
                </button>
                {generatedCnpj && (
                  <button
                    onClick={() => navigator.clipboard.writeText(generatedCnpj)}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg"
                  >
                    <Icon name="copy" className="mr-1.5 inline h-4 w-4" /> Copiar
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Validation Tool */}
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Validador de CPF / CNPJ</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={validateInput}
                onChange={(e) => setValidateInput(e.target.value)}
                placeholder="Digite um CPF ou CNPJ para validar..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
              />
              <button
                onClick={validateDoc}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg"
              >
                Validar
              </button>
            </div>
            {validationResult && (
              <p
                className={`text-xs font-bold ${
                  validationResult.isValid ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {validationResult.type}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── 2. Consulta CEP ────────────────────────────────────────────────── */}
      {activeTab === 'cep' && (
        <div className="space-y-4">
          <form onSubmit={handleSearchCEP} className="flex gap-2">
            <input
              type="text"
              value={cepInput}
              onChange={(e) => setCepInput(e.target.value)}
              placeholder="Digite o CEP"
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white font-mono"
            />
            <button
              type="submit"
              disabled={cepLoading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md"
            >
              {cepLoading ? 'Buscando...' : 'Buscar CEP'}
            </button>
          </form>

          {cepResult && (
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-2 text-xs">
              {cepResult.erro ? (
                <p className="text-rose-400 font-bold">CEP não encontrado ou inexistente.</p>
              ) : (
                <div className="space-y-1.5 text-slate-300">
                  <p>
                    <strong className="text-white">Logradouro:</strong> {cepResult.logradouro}
                  </p>
                  <p>
                    <strong className="text-white">Bairro:</strong> {cepResult.bairro}
                  </p>
                  <p>
                    <strong className="text-white">Cidade/UF:</strong> {cepResult.localidade} - {cepResult.uf}
                  </p>
                  <p>
                    <strong className="text-white">Código IBGE:</strong> {cepResult.ibge}
                  </p>
                  <p>
                    <strong className="text-white">DDD:</strong> {cepResult.ddd}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── 3. Base64 ──────────────────────────────────────────────────────── */}
      {activeTab === 'encoder' && (
        <div className="space-y-4">
          <textarea
            rows={4}
            value={encoderText}
            onChange={(e) => setEncoderText(e.target.value)}
            placeholder="Cole o texto aqui..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono"
          />

          <div className="flex gap-2">
            <button
              onClick={handleBase64Encode}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg"
            >
              Encode Base64
            </button>
            <button
              onClick={handleBase64Decode}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg"
            >
              Decode Base64
            </button>
          </div>

          {base64Result && (
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
              <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Resultado:</span>
              <p className="text-xs font-mono text-emerald-400 break-all">{base64Result}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
