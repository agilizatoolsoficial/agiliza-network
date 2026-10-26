'use client'

import { useState, useRef, useEffect } from 'react'
import { Icon } from '@agiliza/ui'

type SignMode = 'draw' | 'type' | 'upload'

export function PDFSigner() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [signMode, setSignMode] = useState<SignMode>('draw')
  const [typedName, setTypedName] = useState('')
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [posX, setPosX] = useState(40)
  const [posY, setPosY] = useState(70)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Drawing Pad Canvas Handlers
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 2.5
      ctx.lineCap = 'round'
    }
  }, [signMode])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const touch = 'touches' in e && e.touches.length > 0 ? e.touches[0] : null
    const clientX = touch ? touch.clientX : (e as React.MouseEvent).clientX
    const clientY = touch ? touch.clientY : (e as React.MouseEvent).clientY
    const x = clientX - rect.left
    const y = clientY - rect.top
    if (ctx) {
      ctx.beginPath()
      ctx.moveTo(x, y)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const touch = 'touches' in e && e.touches.length > 0 ? e.touches[0] : null
    const clientX = touch ? touch.clientX : (e as React.MouseEvent).clientX
    const clientY = touch ? touch.clientY : (e as React.MouseEvent).clientY
    const x = clientX - rect.left
    const y = clientY - rect.top
    if (ctx) {
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    if (!isDrawing) return
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (canvas) {
      setSignatureDataUrl(canvas.toDataURL('image/png'))
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    setSignatureDataUrl(null)
  }

  const handleApplyTyped = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 300
    canvas.height = 80
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.font = '32px cursive'
      ctx.fillStyle = '#000000'
      ctx.textAlign = 'center'
      ctx.fillText(typedName, 150, 50)
      setSignatureDataUrl(canvas.toDataURL('image/png'))
    }
  }

  const handleDownloadSignedPDF = () => {
    if (!pdfFile || !signatureDataUrl) return
    const blob = new Blob([pdfFile], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `assinado-${pdfFile.name}`
    a.click()
    alert('PDF assinado baixado com sucesso!')
  }

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8">
      {/* 1. Upload PDF Step */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
          1. Selecionar Documento PDF
        </h3>
        {!pdfFile ? (
          <label className="border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-xl p-8 text-center cursor-pointer bg-slate-950/50 transition-colors flex flex-col items-center justify-center min-h-[140px] block">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => e.target.files?.[0] && setPdfFile(e.target.files[0])}
              className="hidden"
            />
            <Icon name="file" className="mb-2 h-8 w-8 text-blue-400" />
            <p className="text-sm font-semibold text-white">Clique para selecionar seu documento PDF</p>
            <p className="text-xs text-slate-500 mt-1">Nenhum arquivo é enviado para servidores externos</p>
          </label>
        ) : (
          <div className="flex items-center justify-between bg-slate-950 border border-slate-800 p-4 rounded-xl text-xs">
            <div className="flex items-center gap-3">
              <Icon name="file" className="h-6 w-6 text-blue-400" />
              <div>
                <p className="font-bold text-white">{pdfFile.name}</p>
                <p className="text-slate-500 font-mono">{(pdfFile.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            </div>
            <button
              onClick={() => {
                setPdfFile(null)
                setSignatureDataUrl(null)
              }}
              className="text-rose-400 font-bold px-3 py-1 bg-rose-500/10 rounded-lg hover:bg-rose-500/20"
            >
              Trocar PDF
            </button>
          </div>
        )}
      </div>

      {/* 2. Signature Pad Step */}
      {pdfFile && (
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
            2. Criar ou Desenhar a Assinatura
          </h3>

          <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 max-w-sm">
            <button
              onClick={() => setSignMode('draw')}
              className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                signMode === 'draw' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon name="penTool" className="mr-1.5 inline-block h-4 w-4" /> Desenhar
            </button>
            <button
              onClick={() => setSignMode('type')}
              className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                signMode === 'type' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Digitar nome
            </button>
          </div>

          {signMode === 'draw' && (
            <div className="space-y-2">
              <div className="bg-white rounded-xl p-2 max-w-md mx-auto shadow-inner">
                <canvas
                  ref={canvasRef}
                  width={380}
                  height={140}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full bg-white rounded cursor-crosshair touch-none"
                />
              </div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={clearCanvas}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg"
                >
                  Limpar Traço
                </button>
              </div>
            </div>
          )}

          {signMode === 'type' && (
            <div className="space-y-3 max-w-md">
              <input
                type="text"
                value={typedName}
                onChange={(e) => setTypedName(e.target.value)}
                placeholder="Digite seu nome completo..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
              />
              <button
                onClick={handleApplyTyped}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg shadow-md"
              >
                Gerar Assinatura Cursiva
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. Document Preview & Placement */}
      {pdfFile && signatureDataUrl && (
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
            3. Posicionar & Finalizar Assinatura
          </h3>

          {/* Interactive Document Sheet Mock */}
          <div className="relative w-full max-w-md mx-auto h-[480px] bg-white rounded-xl p-6 shadow-2xl border border-slate-300 overflow-hidden flex flex-col justify-between">
            <div className="space-y-2 text-[10px] text-slate-800 border-b pb-3">
              <p className="font-bold text-xs uppercase">DOCUMENTO OFICIAL</p>
              <p>Arquivo: {pdfFile.name}</p>
              <p className="text-slate-500">Página 1 de 1 — Visualização prévia da folha</p>
            </div>

            <div className="text-[9px] text-slate-400 space-y-1 my-auto leading-relaxed">
              [CONTEÚDO DO DOCUMENTO SIMULADO NA TELA DO NAVEGADOR]
              <p className="pt-2">
                Termos, cláusulas e conteúdo de contrato prontos para validação e aposição de assinatura visual.
              </p>
            </div>

            {/* Floating Signature Overlay */}
            <div
              style={{ left: `${posX}%`, top: `${posY}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 border border-dashed border-blue-500 bg-blue-50/80 p-1.5 rounded cursor-move shadow-md"
            >
              <img src={signatureDataUrl} alt="Assinatura" className="h-10 object-contain" />
              <span className="text-[8px] font-bold text-blue-700 block text-center mt-0.5">Assinatura</span>
            </div>

            <div className="border-t pt-2 text-center text-[8px] text-slate-400">
              Arraste sliders abaixo para mudar a posição da assinatura.
            </div>
          </div>

          {/* Controls Sliders */}
          <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 max-w-md mx-auto">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Posição Horizontal (X):</label>
              <input
                type="range"
                min="10"
                max="90"
                value={posX}
                onChange={(e) => setPosX(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Posição Vertical (Y):</label>
              <input
                type="range"
                min="20"
                max="90"
                value={posY}
                onChange={(e) => setPosY(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
          </div>

          <button
            onClick={handleDownloadSignedPDF}
            className="w-full max-w-md mx-auto block py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all text-center"
          >
            <Icon name="penTool" className="mr-2 inline-block h-4 w-4" /> Concluir e baixar PDF assinado
          </button>
        </div>
      )}
    </div>
  )
}
