import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Card, Icon } from '@agiliza/ui'

export const metadata: Metadata = {
  title: 'Política de Privacidade | Agiliza Tools',
  description:
    'Conheça o fluxo técnico de tratamento de dados, processamento no navegador e diretrizes de privacidade das ferramentas da Rede Agiliza.',
}

export default function PrivacyPolicyPage() {
  const lastUpdated = '7 de novembro de 2026'

  return (
    <Container size="lg" className="py-8 sm:py-12">
      <nav aria-label="Breadcrumb" className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar ao início
        </Link>
      </nav>

      <header className="mb-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
          <Icon name="shield" className="h-3.5 w-3.5" />
          Transparência Técnica
        </div>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Política de Privacidade
        </h1>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          Última atualização: {lastUpdated}
        </p>
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          Esta política descreve de forma técnica e transparente como os dados, arquivos e
          parâmetros são tratados ao utilizar o portal e as ferramentas da Rede Agiliza.
        </p>
      </header>

      <div className="space-y-8">
        {/* Seção 1: Arquitetura Técnica */}
        <Card className="p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            1. Princípio Fundamental: Processamento no Cliente
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            A arquitetura das ferramentas da Rede Agiliza foi construída para privilegiar o
            processamento estritamente local (no navegador do usuário). Isso significa que, na grande
            maioria das operações com arquivos, textos, imagens e cálculos, os dados são manipulados na
            memória da sua própria máquina através de bibliotecas JavaScript e recursos da Web API
            (como Canvas e Web Workers), sem upload para servidores remotos para processamento.
          </p>
        </Card>

        {/* Seção 2: Inventário por Ferramenta */}
        <Card className="p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            2. Inventário de Tratamento de Dados por Ferramenta
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Confira como cada ferramenta opera na prática:
          </p>

          <div className="mt-6 divide-y divide-slate-200 dark:divide-slate-800">
            <article className="py-4 first:pt-0">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Agiliza PDF (pdf.agilizatools.com.br)
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Divisão, mesclagem e inspeção de páginas ocorrem exclusivamente na memória do navegador
                com a biblioteca <code>pdf-lib</code>. O conteúdo dos arquivos PDF não é enviado para a nuvem
                nem armazenado pela Rede Agiliza.
              </p>
            </article>

            <article className="py-4">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Agiliza Assinador (sign.agilizatools.com.br)
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                A aplicação de rubricas, assinaturas manuais e carimbos é desenhada e renderizada no
                dispositivo do usuário via HTML5 Canvas. O documento final assinado é baixado
                diretamente pelo navegador.
              </p>
            </article>

            <article className="py-4">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Agiliza Img (img.agilizatools.com.br)
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Redimensionamento, recorte e conversão de formato (PNG, JPEG, WebP) ocorrem por meio dos
                recursos nativos do navegador. Nenhuma imagem tratada é salva em servidores.
              </p>
            </article>

            <article className="py-4">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Agiliza QR (qr.agilizatools.com.br)
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Textos, chaves Pix e credenciais de rede Wi-Fi são convertidos em matrizes de QR Code
                diretamente no cliente. Os dados digitados não são gravados em banco de dados.
              </p>
            </article>

            <article className="py-4">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Agiliza Calc (calc.agilizatools.com.br)
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Cálculos de comparação CLT e PJ, benefícios e descontos são efetuados no dispositivo.
                Valores financeiros não são vinculados a nenhuma identidade pessoal.
              </p>
            </article>

            <article className="py-4">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Agiliza Nota (nota.agilizatools.com.br)
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Formulários para emissão de recibos e declarações permanecem na memória da sessão até a
                impressão ou exportação em PDF. Não há retenção ou cadastro de usuários.
              </p>
            </article>

            <article className="py-4">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Agiliza Text (text.agilizatools.com.br)
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Contagem de caracteres, palavras, linhas e transformação de maiúsculas e minúsculas são
                executadas inteiramente no front-end em tempo real.
              </p>
            </article>

            <article className="py-4">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Agiliza Dev (dev.agilizatools.com.br)
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Formatador de JSON, codificador base64 e gerador ou validador de CPF funcionam localmente.
                Na consulta de CEP, o navegador faz uma requisição direta à API pública do ViaCEP
                (<code>viacep.com.br</code>) apenas para obter o endereço público correspondente ao código postal.
              </p>
            </article>

            <article className="py-4">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Agiliza Bio (bio.agilizatools.com.br)
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Rascunhos de páginas de biografia e links salvam preferências temporariamente no
                armazenamento local (<code>localStorage</code>) do navegador.
              </p>
            </article>

            <article className="py-4 last:pb-0">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Agiliza Mídia (media.agilizatools.com.br)
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                A ferramenta funciona como página de orientações sobre links e especificações de mídia.
                Não há coleta de mídias privadas nem downloads em servidores próprios.
              </p>
            </article>
          </div>
        </Card>

        {/* Seção 3: Cookies e Armazenamento Local */}
        <Card className="p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            3. Cookies e Armazenamento Local (LocalStorage)
          </h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <p>
              <strong>Cookies:</strong> Não utilizamos cookies proprietários ou de terceiros para fins de
              rastreamento publicitário, remarketing ou criação de perfis de usuário.
            </p>
            <p>
              <strong>LocalStorage:</strong> O navegador pode registrar pequenas configurações locais,
              como a chave <code>agiliza-theme</code> para lembrar a sua preferência de tema visual (claro
              ou escuro) e dados de rascunho de tela. Essas informações residem apenas no seu próprio
              aparelho e podem ser apagadas a qualquer momento nas configurações do seu navegador.
            </p>
          </div>
        </Card>

        {/* Seção 4: Infraestrutura e Serviços Externos */}
        <Card className="p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            4. Provedores de Hospedagem e Conexões Externas
          </h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <p>
              <strong>Hospedagem e CDN (Vercel):</strong> O portal e os aplicativos são distribuídos
              mundialmente pela rede de entrega de conteúdo da plataforma Vercel Inc. Ao acessar qualquer
              página web, a infraestrutura de rede pode registrar logs técnicos padrão de requisições HTTP
              (incluindo endereço IP, versão do navegador e data/hora do acesso) para assegurar a
              disponibilidade, proteção contra ataques de negação de serviço e integridade operacional.
            </p>
            <p>
              <strong>API ViaCEP:</strong> Utilizada sob demanda pelo utilitário de desenvolvedor para
              resolver dados públicos de logradouro a partir de um CEP informado pelo usuário.
            </p>
          </div>
        </Card>

        {/* Seção 5: Direitos do Titular (LGPD) e Contato */}
        <Card className="p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            5. Direitos do Titular e Canal de Contato
          </h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <p>
              Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD), você tem
              o direito de saber como suas informações são tratadas. Como a Rede Agiliza opera sem
              exigência de cadastro, login ou retenção em banco de dados para a execução das ferramentas,
              a maioria dos dados inseridos permanece sob seu controle direto no próprio dispositivo.
            </p>
            <p>
              Para esclarecer dúvidas técnicas sobre privacidade, sugerir aprimoramentos ou reportar
              eventuais inconsistências, você pode entrar em contato através do repositório oficial do
              projeto no GitHub (
              <a
                href="https://github.com/agilizatoolsoficial/agiliza-network"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 underline hover:text-blue-700 dark:text-blue-400"
              >
                github.com/agilizatoolsoficial/agiliza-network
              </a>
              ) ou pelo canal de comunicação institucional da Rede Agiliza.
            </p>
          </div>
        </Card>
      </div>
    </Container>
  )
}
