import { CalculatorSuite } from '../components/CalculatorSuite'
import { Icon } from '@agiliza/ui'

export default function CalcPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center">
      <section className="text-center mb-8 w-full flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-950 border border-blue-800/60 px-3.5 py-1 text-xs font-semibold text-blue-300 mb-3">
          <Icon name="calculator" className="h-4 w-4" />
          <span>Calculadoras Trabalhistas & Financeiras Grátis</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          AgilizaCalc — Calculadoras de CLT vs PJ, Rescisão e Juros
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          Simule propostas de trabalho CLT vs PJ, calcule rescisão de contrato com FGTS e simule investimentos com juros compostos.
        </p>
      </section>

      <section className="w-full">
        <CalculatorSuite />
      </section>

      {/* SEO Info Cards */}
      <section className="my-12 w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: 'CLT vs PJ',
            desc: 'Descubra exatamente quanto a proposta PJ precisa pagar a mais para compensar FGTS, 13º salário, férias remuneradas e benefícios.',
          },
          {
            title: 'Rescisão Trabalhista',
            desc: 'Estime o valor exato dos direitos na demissão sem justa causa, aviso prévio, saldo de salário e multa rescisória de 40% do FGTS.',
          },
          {
            title: 'Juros Compostos',
            desc: 'Veja o poder do tempo e dos aportes mensais na construção de patrimônio com juros acumulados sobre juros.',
          },
        ].map((item, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
            <h3 className="text-xs font-bold text-white mb-1">{item.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
