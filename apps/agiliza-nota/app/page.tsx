import { DocumentGenerator } from '../components/DocumentGenerator'
import { Icon } from '@agiliza/ui'

export default function NotaPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center">
      <section className="text-center mb-8 w-full flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-950 border border-blue-800/60 px-3.5 py-1 text-xs font-semibold text-blue-300 mb-3">
          <Icon name="receipt" className="h-4 w-4" />
          <span>Emissão Instantânea · Padrão A4 Próprio para Impressão</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          AgilizaNota — Gerador de Recibos & Declarações
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          Gere recibos de pagamento profissionais e declarações de conteúdo para envios nos Correios em PDF.
        </p>
      </section>

      <section className="w-full">
        <DocumentGenerator />
      </section>
    </div>
  )
}
