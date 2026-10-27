'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import type { ToolId } from '../types/tools'
import { TOOLS } from '../types/tools'
import { ThemeToggle } from '../theme-toggle'
import { Icon } from '../icon'

export interface HeaderProps {
  currentTool?: ToolId
  homeHref?: string
}

export function Header({ currentTool, homeHref = 'https://agilizatools.com.br' }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [touchActive, setTouchActive] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const touchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const showToolsMenu = currentTool !== undefined || homeHref !== '/'

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setDropdownOpen(false)
      setMenuOpen(false)
    }
  }, [])

  const handleTouchOutside = useCallback((e: TouchEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setDropdownOpen(false)
    }
    setTouchActive(true)
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current)
    touchTimerRef.current = setTimeout(() => setTouchActive(false), 500)
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (touchActive) return
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleTouchOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleTouchOutside)
      document.removeEventListener('keydown', handleKeyDown)
      if (touchTimerRef.current) clearTimeout(touchTimerRef.current)
    }
  }, [handleKeyDown, handleTouchOutside, touchActive])

  return (
    <header
      className="sticky top-3 z-50 mx-4 mt-3 w-auto max-w-7xl rounded-lg border border-slate-800/80 bg-slate-950/85 shadow-sm shadow-slate-900/10 backdrop-blur-md transition-colors sm:mx-auto"
      role="banner"
    >
      <div className="flex h-14 w-full items-center justify-between px-3 sm:px-5">
        {/* Brand Logo */}
        <a
          href={homeHref}
          className="group flex items-center gap-2 text-base font-extrabold text-white transition-opacity hover:opacity-90"
          aria-label="Agiliza Tools — Página inicial"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center" aria-hidden="true">
            <svg viewBox="0 0 32 32" className="h-full w-full">
              <rect x="1" y="1" width="30" height="30" rx="8" fill="#2563EB" />
              <path d="M8 24 16 7l8 17" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11.5 18h9" fill="none" stroke="#67E8F9" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
          <span className="text-white">
            Agiliza Tools
          </span>
        </a>

        {/* Desktop Navigation */}
        {showToolsMenu && <nav className="hidden items-center gap-2 md:flex" aria-label="Navegação principal">
          <div className="relative" ref={dropdownRef}>
            <button
              id="tools-menu-button"
              type="button"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              aria-controls="tools-dropdown"
              onClick={() => setDropdownOpen((o) => !o)}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                dropdownOpen
                  ? 'bg-slate-800 text-white shadow-inner'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <span>Ferramentas</span>
              <svg
                className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                  dropdownOpen ? 'rotate-180 text-blue-400' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div
                id="tools-dropdown"
                role="menu"
                aria-labelledby="tools-menu-button"
                className="absolute right-0 top-full mt-2 w-80 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/60 ring-1 ring-white/5"
              >
                <div className="p-2 grid grid-cols-1 gap-1">
                  {TOOLS.map((tool) => {
                    const isActive = currentTool === tool.id
                    return (
                      <a
                        key={tool.id}
                        href={tool.href}
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                        className={`flex items-center gap-3 rounded-xl p-2.5 text-xs transition-all ${
                          isActive
                            ? 'bg-blue-600/15 text-blue-300 font-bold border border-blue-500/30'
                            : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                        }`}
                      >
                        <Icon name={tool.icon} className="h-5 w-5 shrink-0 text-blue-300" />
                        <div className="flex-1 truncate">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-white">{tool.name}</span>
                            {tool.badge && (
                              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                {tool.badge}
                              </span>
                            )}
                          </div>
                          <span className="block truncate text-[11px] text-slate-400 font-normal">
                            {tool.description}
                          </span>
                        </div>
                      </a>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>}

        <div className="flex items-center gap-4 sm:gap-5">
          <ThemeToggle />
          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
              className="touch-action:manipulation flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {menuOpen && (
        <nav className="border-t border-slate-800 bg-slate-950 px-4 py-4 md:hidden" aria-label="Menu mobile">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Todas as Ferramentas
          </p>
          <div className="grid grid-cols-2 gap-2">
            {TOOLS.map((tool) => (
              <a
                key={tool.id}
                href={tool.href}
                className={`flex items-center gap-2 rounded-xl p-2.5 text-xs transition-colors ${
                  currentTool === tool.id
                    ? 'bg-blue-600/20 text-blue-300 font-bold border border-blue-500/30'
                    : 'bg-slate-900 border border-slate-800/60 text-slate-300 hover:bg-slate-800'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                <span aria-hidden="true">{tool.icon}</span>
                <span className="truncate">{tool.name}</span>
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
