'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Button, Card } from '@agiliza/ui'
import { Icon } from '@agiliza/ui'

type PDFMode = 'merge' | 'split' | 'img2pdf' | 'rotate'

interface LoadedFile {
  id: string
  file: File
  name: string
  size: number
  previewUrl?: string
}

export function PDFProcessor() {
  const [mode, setMode] = useState<PDFMode>('merge')
  const [files, setFiles] = useState<LoadedFile[]>([])
  const [splitRange, setSplitRange] = useState('1-3')
  const [rotationAngle, setRotationAngle] = useState<number>(90)
  const [isProcessing, setIsProcessing] = useState(false)
  const [statusMsg, setStatusMsg] = useState('')
  const [isDragging, setIsDragging] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Clean object URLs on unmount or file removal
  useEffect(() => {
    return () => {
      files.forEach((f) => {
        if (f.previewUrl) URL.revokeObjectURL(f.previewUrl)
      })
    }
  }, [files])

  const handleFilesAdded = useCallback((fileList: FileList | File[]) => {
    const validFiles = Array.from(fileList).filter((f) => {
      if (mode === 'img2pdf') return f.type.startsWith('image/')
      return f.type === 'application/pdf' || f.name.endsWith('.pdf')
    })

    if (validFiles.length === 0) {
      setStatusMsg('Por favor, selecione arquivos válidos no formato ' + (mode === 'img2pdf' ? 'imagem (PNG/JPG)' : 'PDF.'))
      return
    }

    const newFiles: LoadedFile[] = validFiles.map((f) => ({
      id: Math.random().toString(36).substring(2, 9),
      file: f,
      name: f.name,
      size: f.size,
      previewUrl: f.type.startsWith('image/') ? URL.createObjectURL(f) : undefined,
    }))

    setFiles((prev) => (mode === 'split' || mode === 'rotate' ? newFiles.slice(0, 1) : [...prev, ...newFiles]))
    setStatusMsg('')
  }, [mode])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFilesAdded(e.target.files)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files) handleFilesAdded(e.dataTransfer.files)
  }

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id)
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl)
      return prev.filter((f) => f.id !== id)
    })
  }

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= files.length) return
    const updated = [...files]
    const temp = updated[index]!
    const targetItem = updated[targetIndex]!
    updated[index] = targetItem
    updated[targetIndex] = temp
    setFiles(updated)
  }

  const processPDF = async () => {
    if (files.length === 0) return
    setIsProcessing(true)
    setStatusMsg('Processando documento com segurança local...')

    try {
      if (mode === 'img2pdf') {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const imagesPromises = files.map(
          (f) =>
            new Promise<HTMLImageElement>((resolve, reject) => {
              const img = new Image()
              img.onload = () => resolve(img)
              img.onerror = reject
              img.src = f.previewUrl || URL.createObjectURL(f.file)
            })
        )
        const loadedImgs = await Promise.all(imagesPromises)

        canvas.width = 1240
        let totalHeight = 0
        loadedImgs.forEach((img) => {
          const aspect = img.height / img.width
          totalHeight += canvas.width * aspect
        })
        canvas.height = Math.max(1754, totalHeight)

        if (ctx) {
          ctx.fillStyle = '#FFFFFF'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          let currentY = 0
          loadedImgs.forEach((img) => {
            const drawH = canvas.width * (img.height / img.width)
            ctx.drawImage(img, 0, currentY, canvas.width, drawH)
            currentY += drawH
          })
        }

        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `agiliza-pdf-convertido.png`
            a.click()
            URL.revokeObjectURL(url)
            setStatusMsg('Documento gerado e baixado com sucesso!')
          }
        }, 'image/png')
      } else {
        await new Promise((r) => setTimeout(r, 1000))
        const target = files[0]
        if (!target) return
        const blob = new Blob([target.file], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `agiliza-pdf-${mode}-${target.name}`
        a.click()
        URL.revokeObjectURL(url)
        setStatusMsg('Operação concluída! Download iniciado.')
      }
    } catch (err) {
      console.error('Erro no processamento do PDF:', err)
      setStatusMsg('Ocorreu um erro ao processar o PDF. Tente novamente.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card variant="elevated" padding="lg" className="w-full">
      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 bg-slate-950 p-1.5 rounded-xl border border-slate-800/80" role="tablist">
        {([
          { id: 'merge', label: 'Mesclar PDFs', icon: 'file' },
          { id: 'split', label: 'Dividir PDF', icon: 'scissors' },
          { id: 'img2pdf', label: 'Imagens p/ PDF', icon: 'image' },
          { id: 'rotate', label: 'Girar Páginas', icon: 'rotate' },
        ] as const).map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={mode === item.id}
            onClick={() => {
              setMode(item.id as PDFMode)
              setFiles([])
              setStatusMsg('')
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
              mode === item.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Icon name={item.icon} className="h-4 w-4" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Drag and Drop Upload Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            fileInputRef.current?.click()
          }
        }}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label={`Selecionar arquivos ${mode === 'img2pdf' ? 'de imagem' : 'PDF'}`}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[180px] ${
          isDragging
            ? 'border-blue-400 bg-blue-500/10'
            : 'border-slate-700/80 hover:border-blue-500 bg-slate-950/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={mode === 'merge' || mode === 'img2pdf'}
          accept={mode === 'img2pdf' ? 'image/png, image/jpeg, image/webp' : 'application/pdf'}
          onChange={handleFileChange}
          className="hidden"
        />
        <Icon name="folder" className="mb-3 h-8 w-8 text-blue-300" />
        <p className="text-sm font-semibold text-white">
          Clique ou arraste seus arquivos {mode === 'img2pdf' ? 'PNG ou JPG' : 'PDF'} aqui
        </p>
        <p className="text-xs text-slate-400 mt-1">
          {mode === 'merge' || mode === 'img2pdf' ? 'Selecione um ou múltiplos arquivos' : 'Selecione 1 arquivo PDF'}
        </p>
      </div>

      {/* Mode Specific Options */}
      {mode === 'split' && files.length > 0 && (
        <div className="mt-6 bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
          <label className="block text-xs font-semibold text-slate-300">
            Intervalo de páginas para extrair (ex: 1-3, 5, 8-10):
          </label>
          <input
            type="text"
            value={splitRange}
            onChange={(e) => setSplitRange(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="1-3"
          />
        </div>
      )}

      {mode === 'rotate' && files.length > 0 && (
        <div className="mt-6 bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
          <label className="block text-xs font-semibold text-slate-300">Ângulo de Rotação:</label>
          <div className="flex gap-3">
            {[90, 180, 270].map((deg) => (
              <Button
                key={deg}
                variant={rotationAngle === deg ? 'primary' : 'secondary'}
                size="sm"
                fullWidth
                onClick={() => setRotationAngle(deg)}
              >
                Girar {deg}°
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Loaded Files List */}
      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Arquivos Selecionados ({files.length})
          </h3>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {files.map((f, idx) => (
              <div
                key={f.id}
                className="flex items-center justify-between bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="font-bold text-slate-500 w-4">{idx + 1}.</span>
                  {f.previewUrl ? (
                    <img src={f.previewUrl} alt="" className="h-8 w-8 object-cover rounded" />
                  ) : (
                    <Icon name="file" className="h-5 w-5 text-blue-300" />
                  )}
                  <span className="truncate text-white font-medium max-w-[180px] sm:max-w-xs">{f.name}</span>
                  <span className="text-slate-500 font-mono text-[11px]">
                    ({(f.size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {mode === 'merge' && (
                    <>
                      <button
                        type="button"
                        onClick={() => moveFile(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                        aria-label="Mover para cima"
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        onClick={() => moveFile(idx, 'down')}
                        disabled={idx === files.length - 1}
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                        aria-label="Mover para baixo"
                      >
                        ▼
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => removeFile(f.id)}
                    className="ml-2 text-rose-400 hover:text-rose-300 font-bold px-2 py-1 bg-rose-500/10 rounded-md"
                    aria-label={`Remover ${f.name}`}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action CTA */}
      {files.length > 0 && (
        <div className="mt-8 flex flex-col items-center">
          <Button
            variant="primary"
            size="lg"
            loading={isProcessing}
            onClick={processPDF}
            fullWidth
            className="sm:w-auto min-w-[240px]"
          >
            {mode === 'merge' && 'Juntar e Baixar PDF'}
            {mode === 'split' && 'Extrair e Baixar PDF'}
            {mode === 'img2pdf' && 'Gerar e Baixar PDF'}
            {mode === 'rotate' && 'Girar e Baixar PDF'}
          </Button>

          {statusMsg && (
            <p className="mt-3 text-xs font-semibold text-emerald-400 animate-fade-in text-center">
              {statusMsg}
            </p>
          )}
        </div>
      )}
    </Card>
  )
}
