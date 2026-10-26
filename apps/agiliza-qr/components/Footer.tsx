'use client'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-white py-12 text-slate-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <a href="https://agilizatools.com.br" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <img
              src="/logo.png"
              alt="Logo Agiliza"
              className="h-5 w-auto object-contain"
            />
            <span className="text-sm font-bold text-slate-900">
              Agiliza<span className="font-semibold text-slate-700">Tools</span>
            </span>
            <span className="text-xs text-slate-400">· © {currentYear} Todos os direitos reservados.</span>
          </a>

          <div className="flex flex-wrap gap-6 text-xs text-slate-500">
            <a href="https://agilizatools.com.br/termos" className="hover:text-blue-600 transition-colors">
              Termos de Uso
            </a>
            <a href="https://agilizatools.com.br/privacidade" className="hover:text-blue-600 transition-colors">
              Privacidade
            </a>
            <a href="https://agilizatools.com.br/contato" className="hover:text-blue-600 transition-colors">
              Contato & Suporte
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
