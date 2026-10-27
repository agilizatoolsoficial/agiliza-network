import { PDFProcessor } from '../components/PDFProcessor'
import { Icon } from '@agiliza/ui'

export default function PDFPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center">
      {/* Hero */}
      <section className="text-center mb-8 w-full flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-950 border border-blue-800/60 px-3.5 py-1 text-xs font-semibold text-blue-300 mb-3">
          <Icon name="file" className="h-4 w-4" />
          <span>100% Client-side · Sem Upload para Servidores · Grátis</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          AgilizaPDF — Edição & Conversão de PDF Online
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          Comprima, mescle, divida, converta imagens e gire páginas de PDFs direto no seu navegador com total privacidade.
        </p>
      </section>

      {/* Main Processor Workspace */}
      <section className="w-full">
        <PDFProcessor />
      </section>

      {/* Benefits / Info */}
      <section className="my-12 w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: 'Privacidade Total',
            desc: 'Seus documentos confidenciais nunca saem do seu computador. Todo o processamento ocorre no próprio navegador.',
          },
          {
            title: 'Sem Limites de Tamanho',
            desc: 'Faça upload e edite PDFs grandes sem bloqueios de tamanho ou contagem diária de documentos.',
          },
          {
            title: 'Rápido e Gratuito',
            desc: 'Sem necessidade de cadastro, senhas ou downloads de softwares pesados. Abra e use instantaneamente.',
          },
        ].map((item, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
            <h3 className="text-xs font-bold text-white mb-1">{item.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section className="w-full max-w-3xl my-6">
        <h2 className="text-lg font-bold text-white text-center mb-6">Perguntas Frequentes</h2>
        <div className="space-y-3">
          {[
            {
              q: 'Como funciona o processamento client-side?',
              a: 'O AgilizaPDF utiliza a tecnologia WebAssembly e HTML5 Canvas diretamente no seu navegador Chrome, Firefox, Edge ou Safari. Seus arquivos não são enviados para nenhum servidor externo.',
            },
            {
              q: 'Posso mesclar PDFs de tamanhos diferentes?',
              a: 'Sim! Você pode combinar PDFs na ordem desejada independente da orientação ou dimensão das páginas.',
            },
            {
              q: 'O serviço é realmente 100% gratuito?',
              a: 'Sim, o AgilizaPDF é totalmente gratuito e não exige cartão de crédito ou cadastro.',
            },
          ].map((faq, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h3 className="text-xs font-bold text-white mb-1">{faq.q}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
