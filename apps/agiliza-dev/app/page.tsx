import { DevSuite } from '../components/DevSuite'
import { Icon } from '@agiliza/ui'

export default function DevPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center">
      <section className="text-center mb-8 w-full flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-950 border border-blue-800/60 px-3.5 py-1 text-xs font-semibold text-blue-300 mb-3">
          <Icon name="code" className="h-4 w-4" />
          <span>Validador de Dígitos BR · ViaCEP · Base64 & Ferramentas Dev</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          AgilizaDev — Gerador de CPF, CNPJ e Testes
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          Gere e valide CPF, CNPJ, consulte endereços por CEP e codifique Base64 para testes de software com rapidez.
        </p>
      </section>

      <section className="w-full">
        <DevSuite />
      </section>
    </div>
  )
}
