import type { ReactNode } from 'react'
import { Icon } from '../icon'
import { TOOLS } from '../types/tools'
import type { ToolId, ToolMeta } from '../types/tools'

export interface FooterProps {
  currentTool?: ToolId
}

const DOCUMENT_TOOL_IDS: ToolId[] = ['pdf', 'nota', 'sign']
const MEDIA_TOOL_IDS: ToolId[] = ['media', 'img']
const PRODUCTIVITY_TOOL_IDS: ToolId[] = ['calc', 'qr', 'bio', 'text', 'dev']

function FooterToolLink({ tool, currentTool }: { tool: ToolMeta; currentTool?: ToolId }) {
  const isActive = currentTool === tool.id

  return (
    <li>
      <a
        href={tool.href}
        title={tool.description}
        aria-current={isActive ? 'page' : undefined}
        className={`group flex items-center gap-2 py-1 text-sm transition-colors ${
          isActive
            ? 'font-semibold text-blue-700 dark:text-blue-300'
            : 'text-slate-600 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300'
        }`}
      >
        <Icon name={tool.icon} className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-blue-600 dark:text-slate-500 dark:group-hover:text-blue-300" />
        <span>{tool.name}</span>
      </a>
    </li>
  )
}

function FooterSectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-700 dark:text-slate-200">
      {children}
    </h2>
  )
}

function ToolGroup({
  title,
  icon,
  tools,
  currentTool,
}: {
  title: string
  icon: 'file' | 'image' | 'code' | 'settings'
  tools: ToolMeta[]
  currentTool?: ToolId
}) {
  return (
    <section aria-label={title}>
      <h3 className="mb-1.5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
        <Icon name={icon} className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
        {title}
      </h3>
      <ul className="space-y-0.5" role="list">
        {tools.map((tool) => <FooterToolLink key={tool.id} tool={tool} currentTool={currentTool} />)}
      </ul>
    </section>
  )
}

const documents = TOOLS.filter((tool) => DOCUMENT_TOOL_IDS.includes(tool.id))
const media = TOOLS.filter((tool) => MEDIA_TOOL_IDS.includes(tool.id))
const productivity = TOOLS.filter((tool) => PRODUCTIVITY_TOOL_IDS.includes(tool.id))

export function Footer({ currentTool }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          <section aria-labelledby="footer-about-title">
            <FooterSectionTitle>
              <span id="footer-about-title">Sobre</span>
            </FooterSectionTitle>
            <a
              href="https://agilizatools.com.br"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-slate-900 transition-colors hover:text-blue-700 dark:text-white dark:hover:text-blue-300"
              aria-label="Agiliza Tools, página inicial"
            >
              <svg viewBox="0 0 32 32" className="h-4 w-4 shrink-0" aria-hidden="true">
                <rect x="1" y="1" width="30" height="30" rx="8" fill="#2563EB" />
                <path d="M8 24 16 7l8 17" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11.5 18h9" fill="none" stroke="#67E8F9" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Agiliza Tools
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Ferramentas web para documentos, mídia e produtividade.
            </p>
          </section>

          <div className="space-y-5">
            <ToolGroup title="Documentos & PDF" icon="file" tools={documents} currentTool={currentTool} />
            <ToolGroup title="Mídia & imagens" icon="image" tools={media} currentTool={currentTool} />
          </div>

          <div>
            <ToolGroup title="Produtividade & dev" icon="settings" tools={productivity} currentTool={currentTool} />
          </div>

          <nav aria-label="Links institucionais">
            <FooterSectionTitle>Institucional</FooterSectionTitle>
            <ul className="mt-3 space-y-1" role="list">
              <li>
                <a href="https://agilizatools.com.br/privacidade" className="flex items-center gap-2 py-1 text-sm text-slate-600 transition-colors hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300">
                  <Icon name="shield" className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                  Privacidade
                </a>
              </li>
              <li>
                <a href="https://agilizatools.com.br/termos" className="flex items-center gap-2 py-1 text-sm text-slate-600 transition-colors hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300">
                  <Icon name="file" className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                  Termos de uso
                </a>
              </li>
              <li>
                <a href="https://agilizatools.com.br/contato" className="flex items-center gap-2 py-1 text-sm text-slate-600 transition-colors hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300">
                  <Icon name="message" className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                  Contato
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
          © {year} Rede Agiliza
        </div>
      </div>
    </footer>
  )
}
