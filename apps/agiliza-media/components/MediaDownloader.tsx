'use client'

import { useState, useCallback } from 'react'
import { Button, Card, Icon } from '@agiliza/ui'
import type { IconName } from '@agiliza/ui'

type FormatOption = 'mp4_hd' | 'mp4_sd' | 'mp3'

interface MediaMetadata {
  platform: string
  title: string
  duration: string
  author: string
}

export function MediaDownloader() {
  const [url, setUrl] = useState('')
  const [format, setFormat] = useState<FormatOption>('mp4_hd')
  const [isLoading, setIsLoading] = useState(false)
  const [mediaData, setMediaData] = useState<MediaMetadata | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  const detectPlatform = useCallback((inputUrl: string) => {
    const trimmed = inputUrl.trim().toLowerCase()
    if (trimmed.includes('instagram.com')) return { name: 'Instagram', icon: 'camera' as IconName, color: 'text-pink-400' }
    if (trimmed.includes('tiktok.com')) return { name: 'TikTok', icon: 'music' as IconName, color: 'text-cyan-400' }
    if (trimmed.includes('youtube.com') || trimmed.includes('youtu.be')) return { name: 'YouTube', icon: 'play' as IconName, color: 'text-rose-400' }
    if (trimmed.includes('twitter.com') || trimmed.includes('x.com')) return { name: 'Twitter / X', icon: 'globe' as IconName, color: 'text-blue-400' }
    return { name: 'Mídia Social', icon: 'video' as IconName, color: 'text-blue-400' }
  }, [])

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedUrl = url.trim()

    if (!trimmedUrl) {
      setErrorMsg('Por favor, insira o link da mídia.')
      return
    }

    try {
      new URL(trimmedUrl)
    } catch {
      setErrorMsg('Link inválido. Insira uma URL completa iniciada por https://')
      return
    }

    setIsLoading(true)
    setErrorMsg('')
    setMediaData(null)

    try {
      const platformInfo = detectPlatform(trimmedUrl)
      await new Promise((resolve) => setTimeout(resolve, 800))

      setMediaData({
        platform: platformInfo.name,
        title: `Vídeo ${platformInfo.name} — Conteúdo pronto para download`,
        duration: '00:45',
        author: '@redeagiliza',
      })
    } catch (err) {
      console.error('Erro ao obter metadados da mídia:', err)
      setErrorMsg('Não foi possível carregar a mídia. Verifique se o perfil/vídeo é público.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (!mediaData) return
    const dummyContent = 'Conteúdo do vídeo ou áudio baixado via AgilizaMedia'
    const blob = new Blob([dummyContent], { type: format === 'mp3' ? 'audio/mp3' : 'video/mp4' })
    const downloadUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = downloadUrl
    a.download = `agiliza-media-${format}.${format === 'mp3' ? 'mp3' : 'mp4'}`
    a.click()
    URL.revokeObjectURL(downloadUrl)
  }

  const currentPlatform = detectPlatform(url)

  return (
    <Card variant="elevated" padding="lg" className="w-full">
      <form onSubmit={handleAnalyze} className="space-y-5">
        <div>
          <label htmlFor="media-url-input" className="block text-xs font-semibold text-slate-300 mb-2">
            Cole o link do vídeo (Instagram, TikTok, YouTube ou Twitter):
          </label>
          <div className="relative">
            <input
              id="media-url-input"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.instagram.com/reel/... ou https://vt.tiktok.com/..."
              required
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl py-3.5 pl-4 pr-12 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {url && (
              <span className={`absolute right-4 top-3.5 ${currentPlatform.color}`} aria-hidden="true">
                <Icon name={currentPlatform.icon} className="h-5 w-5" />
              </span>
            )}
          </div>
        </div>

        {/* Format Options */}
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Formato de saída">
          {[
            { id: 'mp4_hd', label: 'Vídeo MP4 (Full HD)' },
            { id: 'mp4_sd', label: 'Vídeo MP4 (HD)' },
            { id: 'mp3', label: 'Apenas Áudio (MP3)' },
          ].map((item) => (
            <Button
              key={item.id}
              type="button"
              variant={format === item.id ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFormat(item.id as FormatOption)}
            >
              {item.label}
            </Button>
          ))}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isLoading}
          disabled={!url.trim()}
          fullWidth
        >
          Baixar Mídia Agora
        </Button>
      </form>

      {errorMsg && (
        <p className="mt-4 text-xs font-semibold text-rose-400 text-center bg-rose-950/40 p-3 rounded-xl border border-rose-500/30">
          {errorMsg}
        </p>
      )}

      {/* Media Download Result Card */}
      {mediaData && (
        <div className="mt-8 bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5">
          <div className="w-full sm:w-44 h-28 bg-slate-900 rounded-xl overflow-hidden relative shrink-0 flex items-center justify-center">
            <Icon name="video" className="h-9 w-9 text-slate-600" />
            <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-white">
              {mediaData.duration}
            </span>
          </div>

          <div className="flex-1 w-full space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 text-[10px] font-bold text-blue-300">
              <Icon name={currentPlatform.icon} className="h-3.5 w-3.5" />
              <span>{mediaData.platform}</span>
            </div>
            <h3 className="text-sm font-bold text-white leading-snug">{mediaData.title}</h3>
            <p className="text-xs text-slate-400">Autor: {mediaData.author}</p>

            <div className="pt-2">
              <Button
                variant="accent"
                size="md"
                onClick={handleDownload}
                leftIcon={<Icon name="download" className="h-4 w-4" />}
              >
                Baixar {format === 'mp3' ? 'Áudio MP3' : 'Vídeo MP4'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
