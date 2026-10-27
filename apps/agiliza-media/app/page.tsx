import { MediaDownloader } from '../components/MediaDownloader'
import { Icon } from '@agiliza/ui'
import type { IconName } from '@agiliza/ui'

export default function MediaPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center">
      <section className="text-center mb-8 w-full flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-950 border border-blue-800/60 px-3.5 py-1 text-xs font-semibold text-blue-300 mb-3">
          <Icon name="video" className="h-4 w-4" />
          <span>Sem Marca d'Água · Alta Qualidade · 100% Grátis</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          AgilizaMedia — Downloader de Vídeos & Mídia
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          Baixe vídeos e áudios do Instagram Reels, TikTok sem marca d'água, YouTube e Twitter em alta resolução.
        </p>
      </section>

      <section className="w-full">
        <MediaDownloader />
      </section>

      {/* Supported Platforms Cards */}
      <section className="my-12 w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
        {([
          { name: 'Instagram', icon: 'camera', desc: 'Reels, Posts & IGTV' },
          { name: 'TikTok', icon: 'music', desc: 'Sem marca d\'água' },
          { name: 'YouTube', icon: 'play', desc: 'Shorts & Vídeos HD' },
          { name: 'Twitter / X', icon: 'globe', desc: 'Vídeos & GIFs' },
        ] satisfies { name: string; icon: IconName; desc: string }[]).map((plat) => (
          <div key={plat.name} className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
            <Icon name={plat.icon} className="mx-auto mb-2 h-7 w-7 text-blue-400" />
            <h3 className="text-xs font-bold text-white">{plat.name}</h3>
            <p className="text-[11px] text-slate-500 mt-1">{plat.desc}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
