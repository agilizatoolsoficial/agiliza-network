import { PDFSigner } from '../components/PDFSigner'
import { Icon } from '@agiliza/ui'

export default function SignPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center">
      <section className="text-center mb-8 w-full flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-950 border border-blue-800/60 px-3.5 py-1 text-xs font-semibold text-blue-300 mb-3">
          <Icon name="penTool" className="h-4 w-4" />
          <span>100% Grátis · Sem Cadastro · Processamento Local Privado</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          AgilizaSign — Assinatura Digital de PDFs
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          Assine contratos e documentos PDF online em segundos. Desenhe no touch/mouse ou digite seu nome.
        </p>
      </section>

      <section className="w-full">
        <PDFSigner />
      </section>
    </div>
  )
}
