'use client'

import { useState, useMemo } from 'react'
import { Button, Card, Icon } from '@agiliza/ui'
import type { IconName } from '@agiliza/ui'

type CalcTab = 'clt_pj' | 'rescisao' | 'juros'

export function CalculatorSuite() {
  const [activeTab, setActiveTab] = useState<CalcTab>('clt_pj')

  // --- CLT vs PJ State ---
  const [cltSalary, setCltSalary] = useState<number>(5000)
  const [pjSalary, setPjSalary] = useState<number>(8000)
  const [valeRefeicao, setValeRefeicao] = useState<number>(800)
  const [planoSaude, setPlanoSaude] = useState<number>(400)

  // Calculations for CLT
  const cltMetrics = useMemo(() => {
    const inss = Math.min(cltSalary * 0.11, 900)
    const irrf = Math.max(0, (cltSalary - inss) * 0.15)
    const fgts = cltSalary * 0.08
    const decimoTerceiroMes = cltSalary / 12
    const feriasMes = (cltSalary * 1.333) / 12
    const netMonthly = cltSalary - inss - irrf + valeRefeicao + planoSaude
    const totalRealValue = netMonthly + fgts + decimoTerceiroMes + feriasMes

    return { inss, irrf, fgts, decimoTerceiroMes, feriasMes, netMonthly, totalRealValue }
  }, [cltSalary, valeRefeicao, planoSaude])

  // Calculations for PJ (Simples Nacional ~6%)
  const pjMetrics = useMemo(() => {
    const imposto = pjSalary * 0.06
    const contador = 200
    const netMonthly = pjSalary - imposto - contador

    return { imposto, contador, netMonthly }
  }, [pjSalary])

  // --- Rescisão State ---
  const [salarioBase, setSalarioBase] = useState<number>(4000)
  const [mesesTrabalhados, setMesesTrabalhados] = useState<number>(10)
  const [avisoPrevioIndenizado, setAvisoPrevioIndenizado] = useState<boolean>(true)
  const [saldoFgts, setSaldoFgts] = useState<number>(3200)

  const rescisaoMetrics = useMemo(() => {
    const saldoSalario = (salarioBase / 30) * 15
    const decimoTerceiro = (salarioBase / 12) * Math.min(12, Math.max(1, mesesTrabalhados))
    const ferias = ((salarioBase / 12) * Math.min(12, Math.max(1, mesesTrabalhados))) * 1.333
    const avisoPrevio = avisoPrevioIndenizado ? salarioBase : 0
    const multaFgts = saldoFgts * 0.4
    const total = saldoSalario + decimoTerceiro + ferias + avisoPrevio + multaFgts

    return { saldoSalario, decimoTerceiro, ferias, avisoPrevio, multaFgts, total }
  }, [salarioBase, mesesTrabalhados, avisoPrevioIndenizado, saldoFgts])

  // --- Juros Compostos State ---
  const [valorInicial, setValorInicial] = useState<number>(1000)
  const [aporteMensal, setAporteMensal] = useState<number>(500)
  const [taxaAnual, setTaxaAnual] = useState<number>(12)
  const [anos, setAnos] = useState<number>(5)

  const jurosMetrics = useMemo(() => {
    const taxaMensal = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1
    const totalMeses = Math.max(1, anos * 12)
    let saldoAcumulado = Math.max(0, valorInicial)
    let totalInvestido = Math.max(0, valorInicial)

    for (let i = 0; i < totalMeses; i++) {
      saldoAcumulado = (saldoAcumulado + aporteMensal) * (1 + taxaMensal)
      totalInvestido += aporteMensal
    }

    const totalJuros = saldoAcumulado - totalInvestido
    return { saldoAcumulado, totalInvestido, totalJuros }
  }, [valorInicial, aporteMensal, taxaAnual, anos])

  return (
    <Card variant="elevated" padding="lg" className="w-full">
      {/* Tabs */}
      <div className="grid grid-cols-3 gap-2 mb-8 bg-slate-950 p-1.5 rounded-xl border border-slate-800" role="tablist">
        {[
          { id: 'clt_pj', label: 'CLT vs PJ', icon: 'scale' },
          { id: 'rescisao', label: 'Rescisão CLT', icon: 'file' },
          { id: 'juros', label: 'Juros Compostos', icon: 'calculator' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id as CalcTab)}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-lg text-xs font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Icon name={tab.icon as IconName} className="h-4 w-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── 1. CLT vs PJ Calculator ────────────────────────────────────────── */}
      {activeTab === 'clt_pj' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input CLT */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                <Icon name="building" className="h-4 w-4" /> Proposta CLT
              </h3>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Salário Bruto CLT (R$):</label>
                <input
                  type="number"
                  value={cltSalary}
                  onChange={(e) => setCltSalary(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Vale Refeição (R$):</label>
                  <input
                    type="number"
                    value={valeRefeicao}
                    onChange={(e) => setValeRefeicao(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Plano Saúde (R$):</label>
                  <input
                    type="number"
                    value={planoSaude}
                    onChange={(e) => setPlanoSaude(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* Input PJ */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Icon name="rocket" className="h-4 w-4" /> Proposta PJ
              </h3>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Faturamento Mensal PJ (R$):</label>
                <input
                  type="number"
                  value={pjSalary}
                  onChange={(e) => setPjSalary(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Considera imposto do Simples Nacional (~6%) e custo médio de contabilidade (~R$ 200/mês).
              </p>
            </div>
          </div>

          {/* Results Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div className="bg-blue-950/40 border border-blue-500/30 p-5 rounded-2xl">
              <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-2">Resultado CLT</h4>
              <p className="text-2xl font-extrabold text-white">
                R$ {cltMetrics.netMonthly.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                <span className="text-xs font-normal text-slate-400"> /mês líquido</span>
              </p>
              <p className="text-xs text-blue-300 mt-2">
                + R$ {cltMetrics.totalRealValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} /mês (com FGTS, 13º e Férias)
              </p>
            </div>

            <div className="bg-cyan-950/40 border border-cyan-500/30 p-5 rounded-2xl">
              <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">Resultado PJ</h4>
              <p className="text-2xl font-extrabold text-white">
                R$ {pjMetrics.netMonthly.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                <span className="text-xs font-normal text-slate-400"> /mês líquido</span>
              </p>
              <p className="text-xs text-cyan-300 mt-2">
                {pjMetrics.netMonthly > cltMetrics.totalRealValue
                  ? 'A proposta PJ apresenta maior retorno líquido total!'
                  : 'A proposta CLT compensa em benefícios e encargos estocados.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── 2. Rescisão Calculator ─────────────────────────────────────────── */}
      {activeTab === 'rescisao' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Último Salário Bruto (R$):</label>
              <input
                type="number"
                value={salarioBase}
                onChange={(e) => setSalarioBase(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Meses Trabalhados no Ano (1-12):</label>
              <input
                type="number"
                value={mesesTrabalhados}
                onChange={(e) => setMesesTrabalhados(Math.max(1, Math.min(12, Number(e.target.value))))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Saldo de FGTS Acumulado (R$):</label>
              <input
                type="number"
                value={saldoFgts}
                onChange={(e) => setSaldoFgts(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
            <div className="flex items-center gap-2 pt-4">
              <input
                type="checkbox"
                id="aviso"
                checked={avisoPrevioIndenizado}
                onChange={(e) => setAvisoPrevioIndenizado(e.target.checked)}
                className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="aviso" className="text-xs text-slate-300 cursor-pointer">
                Aviso prévio indenizado pela empresa
              </label>
            </div>
          </div>

          <div className="bg-blue-950/40 border border-blue-500/30 p-6 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider">Estimativa Total da Rescisão</h4>
            <p className="text-3xl font-extrabold text-white">
              R$ {rescisaoMetrics.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-800 text-xs text-slate-400">
              <div>
                <span>Saldo Salário:</span>
                <p className="font-bold text-white">R$ {rescisaoMetrics.saldoSalario.toFixed(2)}</p>
              </div>
              <div>
                <span>13º Proporcional:</span>
                <p className="font-bold text-white">R$ {rescisaoMetrics.decimoTerceiro.toFixed(2)}</p>
              </div>
              <div>
                <span>Férias + 1/3:</span>
                <p className="font-bold text-white">R$ {rescisaoMetrics.ferias.toFixed(2)}</p>
              </div>
              <div>
                <span>Multa 40% FGTS:</span>
                <p className="font-bold text-white">R$ {rescisaoMetrics.multaFgts.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 3. Juros Compostos ─────────────────────────────────────────────── */}
      {activeTab === 'juros' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Valor Inicial (R$):</label>
              <input
                type="number"
                value={valorInicial}
                onChange={(e) => setValorInicial(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Aporte Mensal (R$):</label>
              <input
                type="number"
                value={aporteMensal}
                onChange={(e) => setAporteMensal(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Taxa Anual (%):</label>
              <input
                type="number"
                value={taxaAnual}
                onChange={(e) => setTaxaAnual(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Período (Anos):</label>
              <input
                type="number"
                value={anos}
                onChange={(e) => setAnos(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl">
              <span className="text-xs text-slate-400">Total Investido</span>
              <p className="text-xl font-bold text-white mt-1">
                R$ {jurosMetrics.totalInvestido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-emerald-950/40 border border-emerald-500/30 p-5 rounded-2xl">
              <span className="text-xs text-emerald-300">Total em Juros Ganhos</span>
              <p className="text-xl font-bold text-emerald-400 mt-1">
                R$ {jurosMetrics.totalJuros.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-blue-950/40 border border-blue-500/30 p-5 rounded-2xl">
              <span className="text-xs text-blue-300">Montante Final Acumulado</span>
              <p className="text-2xl font-extrabold text-white mt-1">
                R$ {jurosMetrics.saldoAcumulado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
