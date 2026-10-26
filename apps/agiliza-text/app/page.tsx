import { TextTools } from '../components/TextTools'
import { Icon } from '@agiliza/ui'

export default function TextPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center">
      <section className="text-center mb-8 w-full flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-950 border border-blue-800/60 px-3.5 py-1 text-xs font-semibold text-blue-300 mb-3">
          <Icon name="type" className="h-4 w-4" />
          <span>Contador Instantâneo · Validador JSON · Formatação de Caixa</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          AgilizaText — Contador de Caracteres & Utilitários
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          Conte palavras e caracteres em tempo real, valide e formate códigos JSON, compare textos e converta caixa de letras.
        </p>
      </section>

      <section className="w-full">
        <TextTools />
      </section>
    </div>
  )
}
