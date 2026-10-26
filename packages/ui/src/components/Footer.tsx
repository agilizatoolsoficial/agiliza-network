import { TOOLS } from '../types/tools'
import type { ToolId } from '../types/tools'
import { Icon } from '../icon'

export interface FooterProps {
  currentTool?: ToolId
}

export function Footer({ currentTool }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-slate-950" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Tools Grid — Cross Links SEO */}
        <div className="mb-10">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Icon name="bolt" className="h-4 w-4 text-blue-400" /> Ecossistema Agiliza Tools
          </h2>
          <nav aria-label="Links de SEO para ferramentas Agiliza">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-5" role="list">
              {TOOLS.map((tool) => {
                const isActive = currentTool === tool.id
                return (
                  <li key={tool.id}>
                    <a
                      href={tool.href}
                      className={`group block text-xs transition-all ${
                        isActive
                          ? 'text-blue-400 font-bold'
                          : 'text-slate-400 hover:text-blue-300'
                      }`}
                      title={tool.description}
                    >
                      <span className="mb-1 flex items-center gap-2 font-semibold text-slate-200 group-hover:text-blue-400">
                        <Icon name={tool.icon} className="h-4 w-4 shrink-0 text-blue-300" />
                        <span>{tool.name}</span>
                      </span>
                      <span className="block text-[11px] text-slate-500 line-clamp-2 leading-relaxed group-hover:text-slate-400">
                        {tool.description}
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <hr className="border-slate-800/80" />

        {/* Bottom Institutional Row */}
        <div className="mt-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <a
              href="https://agilizatools.com.br"
              className="flex items-center gap-2 text-sm font-extrabold text-white transition-opacity hover:opacity-80"
              aria-label="Agiliza Tools — Página inicial"
            >
              <span className="flex items-center gap-2"><Icon name="bolt" className="h-4 w-4 text-blue-400" /> Agiliza Tools</span>
            </a>
            <p className="mt-1 text-xs text-slate-500">
              Ferramentas web 100% gratuitas, rápidas e com processamento local no seu navegador.
            </p>
          </div>

          <nav aria-label="Links de privacidade e termos">
            <ul className="flex flex-wrap items-center gap-6 text-xs text-slate-400" role="list">
              <li>
                <a href="https://agilizatools.com.br/privacidade" className="transition-colors hover:text-white">
                  Privacidade & Segurança
                </a>
              </li>
              <li>
                <a href="https://agilizatools.com.br/termos" className="transition-colors hover:text-white">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="https://agilizatools.com.br/contato" className="transition-colors hover:text-white">
                  Contato
                </a>
              </li>
              <li className="text-slate-600 font-mono text-[11px]">
                © {year} Rede Agiliza
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
