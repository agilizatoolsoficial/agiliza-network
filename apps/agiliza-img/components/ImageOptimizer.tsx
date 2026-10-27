'use client'

import { useState, useRef } from 'react'
import { Icon } from '@agiliza/ui'

interface ProcessedImage {
  id: string
  originalFile: File
  name: string
  originalSize: number
  compressedBlob?: Blob
  compressedSize?: number
  previewUrl: string
  compressedUrl?: string
}

export function ImageOptimizer() {
  const [images, setImages] = useState<ProcessedImage[]>([])
  const [quality, setQuality] = useState<number>(80)
  const [targetFormat, setTargetFormat] = useState<'image/webp' | 'image/jpeg' | 'image/png'>('image/webp')
  const [maxWidth, setMaxWidth] = useState<number>(1920)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const loaded: ProcessedImage[] = Array.from(e.target.files).map((f) => ({
      id: Math.random().toString(36).substring(7),
      originalFile: f,
      name: f.name,
      originalSize: f.size,
      previewUrl: URL.createObjectURL(f),
    }))
    setImages((prev) => [...prev, ...loaded])
  }

  const processImages = async () => {
    if (images.length === 0) return
    setIsProcessing(true)

    const updated = await Promise.all(
      images.map(
        (imgItem) =>
          new Promise<ProcessedImage>((resolve) => {
            const img = new Image()
            img.onload = () => {
              const canvas = document.createElement('canvas')
              let width = img.width
              let height = img.height

              if (width > maxWidth) {
                height = (height * maxWidth) / width
                width = maxWidth
              }

              canvas.width = width
              canvas.height = height
              const ctx = canvas.getContext('2d')
              if (ctx) {
                ctx.drawImage(img, 0, 0, width, height)
              }

              canvas.toBlob(
                (blob) => {
                  if (blob) {
                    const ext = targetFormat === 'image/webp' ? 'webp' : targetFormat === 'image/jpeg' ? 'jpg' : 'png'
                    const baseName = imgItem.name.substring(0, imgItem.name.lastIndexOf('.')) || imgItem.name
                    resolve({
                      ...imgItem,
                      name: `${baseName}-otimizado.${ext}`,
                      compressedBlob: blob,
                      compressedSize: blob.size,
                      compressedUrl: URL.createObjectURL(blob),
                    })
                  } else {
                    resolve(imgItem)
                  }
                },
                targetFormat,
                quality / 100
              )
            }
            img.src = imgItem.previewUrl
          })
      )
    )

    setImages(updated)
    setIsProcessing(false)
  }

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
      {/* Settings bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Qualidade de Compressão: <span className="text-blue-400 font-bold">{quality}%</span>
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full accent-blue-500 cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Formato de Saída:</label>
          <select
            value={targetFormat}
            onChange={(e) => setTargetFormat(e.target.value as any)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
          >
            <option value="image/webp">WebP (Mais Leve - Recomendado)</option>
            <option value="image/jpeg">JPG / JPEG</option>
            <option value="image/png">PNG</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Largura Máxima (px):</label>
          <input
            type="number"
            value={maxWidth}
            onChange={(e) => setMaxWidth(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
          />
        </div>
      </div>

      {/* Upload Box */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            fileInputRef.current?.click()
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Selecionar imagens para otimizar"
        className="border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-xl p-8 text-center cursor-pointer bg-slate-950/50 transition-colors flex flex-col items-center justify-center min-h-[160px]"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/png, image/jpeg, image/webp, image/gif"
          onChange={handleFileChange}
          className="hidden"
        />
        <Icon name="image" className="mb-2 h-10 w-10 text-blue-400" />
        <p className="text-sm font-semibold text-white">Clique ou arraste suas imagens aqui</p>
        <p className="text-xs text-slate-500 mt-1">Suporta PNG, JPG, WebP e GIF</p>
      </div>

      {/* Image list */}
      {images.length > 0 && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Imagens Carregadas ({images.length})
            </h3>
            <button
              onClick={processImages}
              disabled={isProcessing}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg shadow-md transition-all disabled:opacity-50"
            >
              {isProcessing ? 'Otimizando...' : 'Otimizar Imagens Agora'}
            </button>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {images.map((imgItem) => {
              const hasCompressed = imgItem.compressedSize !== undefined
              const savedPercent = hasCompressed
                ? Math.round((1 - imgItem.compressedSize! / imgItem.originalSize) * 100)
                : 0

              return (
                <div
                  key={imgItem.id}
                  className="flex items-center justify-between bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img src={imgItem.previewUrl} alt="" className="h-10 w-10 object-cover rounded-lg" />
                    <div className="truncate">
                      <p className="truncate text-white font-medium max-w-[180px] sm:max-w-xs">{imgItem.name}</p>
                      <p className="text-[11px] text-slate-500">
                        Original: {(imgItem.originalSize / 1024).toFixed(1)} KB
                        {hasCompressed && (
                          <span className="ml-2 text-emerald-400 font-bold">
                            → {(imgItem.compressedSize! / 1024).toFixed(1)} KB ({savedPercent > 0 ? `-${savedPercent}%` : '+0%'})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {hasCompressed && imgItem.compressedUrl && (
                      <a
                        href={imgItem.compressedUrl}
                        download={imgItem.name}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-all"
                      >
                        <Icon name="download" className="mr-1 inline-block h-4 w-4" /> Baixar
                      </a>
                    )}
                    <button
                      onClick={() => removeImage(imgItem.id)}
                      className="text-rose-400 hover:text-rose-300 font-bold px-2 py-1 bg-rose-500/10 rounded-md"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
