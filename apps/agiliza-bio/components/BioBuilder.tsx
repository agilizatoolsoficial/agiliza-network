'use client'

import { useState } from 'react'
import { Icon } from '@agiliza/ui'
import type { IconName } from '@agiliza/ui'

interface BioLink {
  id: string
  title: string
  url: string
  icon: IconName
}

const THEMES = [
  { id: 'blue', name: 'Azul', bg: 'bg-slate-950', card: 'bg-blue-950/60 border-blue-500/40 text-white' },
  { id: 'cyan', name: 'Ciano', bg: 'bg-slate-900', card: 'bg-cyan-950/60 border-cyan-500/40 text-cyan-200' },
  { id: 'slate', name: 'Cinza', bg: 'bg-slate-900', card: 'bg-slate-800/80 border-slate-700 text-white' },
]

const LINK_ICONS: { name: IconName; label: string }[] = [
  { name: 'link', label: 'Link' },
  { name: 'globe', label: 'Site' },
  { name: 'message', label: 'Mensagem' },
  { name: 'play', label: 'Vídeo' },
  { name: 'music', label: 'Música' },
  { name: 'camera', label: 'Câmera' },
  { name: 'image', label: 'Imagem' },
  { name: 'user', label: 'Perfil' },
]

export function BioBuilder() {
  const [name, setName] = useState('')
  const [handle, setHandle] = useState('')
  const [bio, setBio] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [themeId, setThemeId] = useState('blue')

  const [links, setLinks] = useState<BioLink[]>([])

  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newIcon, setNewIcon] = useState<IconName>('link')
  const [copied, setCopied] = useState(false)

  const activeTheme = (THEMES.find((t) => t.id === themeId) || THEMES[0])!

  const addLink = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || !newUrl.trim()) return
    setLinks([
      ...links,
      {
        id: Math.random().toString(36).substring(7),
        title: newTitle,
        url: newUrl,
        icon: newIcon,
      },
    ])
    setNewTitle('')
    setNewUrl('')
  }

  const removeLink = (id: string) => {
    setLinks(links.filter((l) => l.id !== id))
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://bio.agilizatools.com.br/${handle.replace('@', '')}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Editor Column */}
      <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Icon name="settings" className="h-5 w-5 text-blue-400" /> Personalizar seu Bio Link
        </h2>

        {/* Profile Details */}
        <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Informações de Perfil</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Nome de Exibição:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome ou marca"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Usuário / Handle:</label>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="Seu usuário"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Biografia Resumida:</label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Escreva uma breve apresentação"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white resize-none"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">URL da foto de perfil (Avatar):</label>
            <input
              type="text"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
            />
          </div>
        </div>

        {/* Theme Selector */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Estilo de Tema</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => setThemeId(t.id)}
                className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                  themeId === t.id
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        {/* Links Manager */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Adicionar Novo Link</h3>
          <form onSubmit={addLink} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
              <select
                aria-label="Ícone do link"
                value={newIcon}
                onChange={(e) => setNewIcon(e.target.value as IconName)}
                className="sm:col-span-3 bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
              >
                {LINK_ICONS.map((icon) => (
                  <option key={icon.name} value={icon.name}>{icon.label}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Título do Botão"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="sm:col-span-9 bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
              />
            </div>
            <input
              type="url"
              placeholder="URL de destino (https://...)"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-all"
            >
              + Adicionar Botão ao Bio Link
            </button>
          </form>

          {/* Current Links list */}
          <div className="space-y-2 pt-2">
            {links.map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs"
              >
                <div className="flex items-center gap-2 truncate">
                  <Icon name={link.icon} className="h-4 w-4 shrink-0 text-blue-400" />
                  <span className="font-bold text-white truncate">{link.title}</span>
                  <span className="text-slate-500 truncate text-[11px]">({link.url})</span>
                </div>
                <button
                  onClick={() => removeLink(link.id)}
                  className="text-rose-400 hover:text-rose-300 font-bold px-2 py-0.5 bg-rose-500/10 rounded"
                  aria-label={`Remover ${link.title}`}
                >
                  <Icon name="x" className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Export / Share CTA */}
        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Icon name={copied ? 'check' : 'copy'} className="h-4 w-4" />
            <span>{copied ? 'Link copiado!' : 'Copiar link do perfil'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Live Preview Column */}
      <div className="lg:col-span-5 flex flex-col items-center sticky top-24">
        <span className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
          Pré-visualização em tempo real
        </span>

        {/* Smartphone Shell */}
        <div className="w-[300px] h-[580px] bg-black rounded-[40px] border-4 border-slate-700 p-3 shadow-2xl shadow-blue-950/50 flex flex-col relative overflow-hidden">
          {/* Top Speaker Notch */}
          <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-4 shrink-0" />

          {/* Screen Content */}
          <div className={`flex-1 rounded-[28px] ${activeTheme.bg} p-4 flex flex-col items-center overflow-y-auto no-scrollbar`}>
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-400 mb-3 shrink-0 shadow-md flex items-center justify-center bg-slate-800">
              {avatarUrl.trim() ? (
                <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
              ) : (
                <Icon name="user" className="h-8 w-8 text-slate-400" />
              )}
            </div>

            <h3 className="text-sm font-bold text-white text-center leading-tight">{name}</h3>
            <p className="text-[11px] font-semibold text-blue-400 mt-0.5">{handle}</p>
            <p className="text-[10px] text-slate-400 text-center mt-2 leading-relaxed px-2">{bio}</p>

            {/* Links preview list */}
            <div className="w-full space-y-2.5 mt-6">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-transform hover:scale-105 shadow-md ${activeTheme.card}`}
                >
                  <Icon name={link.icon} className="h-4 w-4 shrink-0" />
                  <span className="truncate">{link.title}</span>
                </a>
              ))}
            </div>

            <div className="mt-auto pt-6 text-[9px] text-slate-600 font-mono">
              <span className="inline-flex items-center gap-1"><Icon name="bolt" className="h-3 w-3" /> Criado com AgilizaBio</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
