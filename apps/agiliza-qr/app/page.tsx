import { Suspense } from 'react'
import { QRGenerator } from '../components/QRGenerator'
import { Icon } from '@agiliza/ui'

// ─── Pricing Plans ────────────────────────────────────────────────────────────
const PRICING_PLANS = [
  {
    name: 'Gratuito',
    price: 'R$ 0',
    period: 'para sempre',
    desc: 'Ideal para uso pessoal e pequenas necessidades do dia a dia.',
    features: [
      'Geração ilimitada de QR Codes estáticos',
      'QR Code Pix oficial (EMV/BRCode)',
      'Wi-Fi, Links, Textos e Contatos',
      'Download em PNG e SVG vetorial',
      'Sem marcas d\'água ou anúncios invasivos',
    ],
    cta: 'Usar Grátis',
    popular: false,
  },
  {
    name: 'Pro Dinâmico',
    price: 'R$ 19',
    period: '/mês',
    desc: 'Para empresas e profissionais que precisam de QR Codes editáveis e métricas.',
    features: [
      'Tudo do plano Gratuito',
      'QR Codes Dinâmicos (edite o destino a qualquer momento)',
      'Painel de métricas de leituras e localização',
      'Logo personalizado da sua empresa no centro',
      'Suporte prioritário via WhatsApp',
    ],
    cta: 'Começar Teste Pro',
    popular: true,
  },
]

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: 'O que é um QR Code e para que serve?',
    a: 'QR Code (Quick Response Code) é um código bidimensional legível por câmeras de smartphones, utilizado para compartilhar links, senhas de redes Wi-Fi, pagamentos Pix, contatos e textos de forma instantânea.',
  },
  {
    q: 'Como gerar um QR Code para Pix?',
    a: 'Basta selecionar a aba "Pix", informar sua chave Pix (CPF, CNPJ, e-mail, telefone ou chave aleatória), nome do recebedor e valor opcional. O QR Code segue o padrão oficial EMV/BRCode do Banco Central do Brasil.',
  },
  {
    q: 'O QR Code gerado tem prazo de validade?',
    a: 'Não. Os QR Codes estáticos gerados por esta ferramenta são permanentes e não expiram. No caso de Pix sem valor definido, o código pode ser utilizado quantas vezes desejar.',
  },
  {
    q: 'Posso personalizar as cores e margens?',
    a: 'Sim! Você pode personalizar tanto a cor dos módulos (QR) quanto a cor de fundo e a margem, garantindo que o código fique alinhado à sua identidade visual com total legibilidade.',
  },
  {
    q: 'Qual a diferença entre PNG e SVG?',
    a: 'PNG é o formato de imagem rasterizada ideal para redes sociais, sites e apresentações. SVG é um formato vetorial infinito, perfeito para impressão de alta resolução em materiais gráficos, placas e banners.',
  },
  {
    q: 'É seguro usar o AgilizaQR?',
    a: 'Sim, 100% seguro e privado. Todo o processamento dos dados e a geração do QR Code ocorrem diretamente no seu navegador, sem envio de informações para servidores externos.',
  },
]

// ─── Loading Skeleton ─────────────────────────────────────────────────────────
function QRSkeleton() {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 p-6 shadow-xs animate-pulse">
      <div className="h-8 w-60 bg-slate-100 rounded-lg mx-auto mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-3">
          <div className="h-8 bg-slate-100 rounded-lg" />
          <div className="h-8 bg-slate-100 rounded-lg" />
          <div className="h-8 bg-slate-100 rounded-lg" />
        </div>
        <div className="lg:col-span-5 h-64 bg-slate-100 rounded-xl" />
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function QRPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <section className="text-center mb-8 w-full flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200/60 px-3.5 py-1 text-xs font-semibold text-blue-700 mb-3 shadow-2xs">
          <Icon name="bolt" className="h-4 w-4" />
          <span>100% Grátis · Sem Cadastro · Alta Resolução</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Gerador de QR Code Instantâneo
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
          Crie, personalize e baixe QR Codes gratuitos e dinâmicos para Pix, Wi-Fi, links, contatos e muito mais.
        </p>
      </section>

      {/* ── Main Tool Workspace ────────────────────────────────────────────── */}
      <section id="gerador-qr-code" aria-label="Ferramenta de QR Code" className="w-full">
        <Suspense fallback={<QRSkeleton />}>
          <QRGenerator />
        </Suspense>
      </section>

      {/* ── How It Works (3 Steps) ─────────────────────────────────────────── */}
      <section className="my-10" aria-label="Como gerar QR Code em 3 passos">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-slate-900">
            Como gerar seu QR Code em 3 passos simples
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Rápido, intuitivo e pronto para uso digital ou impressão.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              step: '1',
              title: 'Escolha o tipo',
              desc: 'Selecione Pix, Link, Wi-Fi, Texto, Contato ou VCard.',
            },
            {
              step: '2',
              title: 'Preencha os dados',
              desc: 'Insira as informações e personalize a cor do código e fundo.',
            },
            {
              step: '3',
              title: 'Baixe em alta qualidade',
              desc: 'Faça o download imediato nos formatos PNG ou SVG vetorial.',
            },
          ].map(item => (
            <div
              key={item.step}
              className="bg-white rounded-xl border border-slate-200 p-4 text-center shadow-xs flex flex-col items-center"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs mb-2 shadow-xs">
                {item.step}
              </div>
              <h3 className="text-xs font-bold text-slate-900 mb-0.5">{item.title}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing Section ────────────────────────────────────────────────── */}
      <section id="precos" className="my-12 w-full" aria-label="Tabela de Preços">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-slate-900">
            Planos & Preços
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Escolha o plano ideal para suas necessidades pessoais ou empresariais.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'border-blue-500 bg-white shadow-md ring-1 ring-blue-500/20 relative'
                  : 'border-slate-200 bg-white shadow-xs'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-2.5 right-4 rounded-full bg-blue-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Mais Popular
                </span>
              )}

              <div>
                <h3 className="text-sm font-bold text-slate-900">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900">{plan.price}</span>
                  <span className="text-xs text-slate-500">{plan.period}</span>
                </div>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">{plan.desc}</p>

                <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg className="h-3.5 w-3.5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-2">
                <a
                  href="#gerador-qr-code"
                  className={`block w-full text-center rounded-xl py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ & SEO Section ──────────────────────────────────────────────── */}
      <section id="faq" className="my-10 w-full" aria-label="Perguntas Frequentes e Informações">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-slate-900">
            Perguntas Frequentes
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Tire suas dúvidas sobre criação e personalização de QR Codes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {FAQ_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs"
            >
              <h3 className="text-xs font-bold text-slate-900 mb-1">{item.q}</h3>
              <p className="text-xs leading-relaxed text-slate-600">{item.a}</p>
            </div>
          ))}
        </div>

        {/* Semantic SEO Block */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 text-xs leading-relaxed text-slate-600 shadow-xs space-y-2">
          <h3 className="text-xs font-bold text-slate-900">
            Sobre o AgilizaQR — Gerador Gratuito de QR Code Pix e Links
          </h3>
          <p>
            O <strong className="text-slate-800">AgilizaQR</strong> é uma ferramenta profissional gratuita desenvolvida para criar códigos QR padronizados e seguros em segundos. Seja para gerar cobranças <strong className="text-slate-800">Pix no padrão oficial do Banco Central (EMV/BRCode)</strong>, disponibilizar acesso simplificado a redes Wi-Fi ou compartilhar links de redes sociais e sites, todo o processo é realizado instantaneamente no seu navegador.
          </p>
          <p>
            Garantimos privacidade total: nenhum dado sensível ou chave de pagamento é transmitido para servidores de terceiros. Baixe seus QR Codes prontos em formato <strong className="text-slate-800">PNG</strong> para uso na web ou <strong className="text-slate-800">SVG</strong> em alta definição para impressão de banners, panfletos e placas.
          </p>
        </div>
      </section>
    </div>
  )
}
