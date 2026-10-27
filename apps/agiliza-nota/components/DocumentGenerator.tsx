'use client'

import { useState } from 'react'
import { Icon } from '@agiliza/ui'

type DocType = 'recibo' | 'declaracao'

export function DocumentGenerator() {
  const [docType, setDocType] = useState<DocType>('recibo')

  // --- Recibo State ---
  const [emissorNome, setEmissorNome] = useState('')
  const [emissorDoc, setEmissorDoc] = useState('')
  const [pagadorNome, setPagadorNome] = useState('')
  const [pagadorDoc, setPagadorDoc] = useState('')
  const [valor, setValor] = useState<number>(0)
  const [referente, setReferente] = useState('')
  const [cidade, setCidade] = useState('')
  const [dataDoc, setDataDoc] = useState(() => new Date().toLocaleDateString('pt-BR'))

  // --- Declaração Conteúdo State ---
  const [remetenteEnd, setRemetenteEnd] = useState('')
  const [destinatarioNome, setDestinatarioNome] = useState('')
  const [destinatarioEnd, setDestinatarioEnd] = useState('')
  const [itens, setItens] = useState<{ id: string; desc: string; qtd: number; valor: number }[]>([
    { id: '1', desc: 'Camiseta de Algodão Tam M', qtd: 2, valor: 80.0 },
    { id: '2', desc: 'Livro de Programação', qtd: 1, valor: 120.0 },
  ])

  const totalDeclaracao = itens.reduce((acc, item) => acc + item.qtd * item.valor, 0)

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Input Form Column */}
      <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        {/* Document Type Selector */}
        <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setDocType('recibo')}
            className={`py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
              docType === 'recibo' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Icon name="receipt" className="mr-2 inline-block h-4 w-4" /> Recibo de Pagamento
          </button>
          <button
            onClick={() => setDocType('declaracao')}
            className={`py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
              docType === 'declaracao' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Icon name="box" className="mr-2 inline-block h-4 w-4" /> Declaração de Conteúdo
          </button>
        </div>

        {/* Recibo Form */}
        {docType === 'recibo' && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Dados do Recibo</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Nome de quem recebeu (Emissor):</label>
                <input
                  type="text"
                  value={emissorNome}
                  onChange={(e) => setEmissorNome(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">CPF/CNPJ do Emissor:</label>
                <input
                  type="text"
                  value={emissorDoc}
                  onChange={(e) => setEmissorDoc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Nome de quem pagou (Pagador):</label>
                <input
                  type="text"
                  value={pagadorNome}
                  onChange={(e) => setPagadorNome(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Valor Recebido (R$):</label>
                <input
                  type="number"
                  value={valor}
                  onChange={(e) => setValor(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white font-bold text-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Referente a (Descrição):</label>
              <textarea
                rows={3}
                value={referente}
                onChange={(e) => setReferente(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Cidade - UF:</label>
                <input
                  type="text"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Data:</label>
                <input
                  type="text"
                  value={dataDoc}
                  onChange={(e) => setDataDoc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Declaração Form */}
        {docType === 'declaracao' && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Dados da Declaração</h3>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Endereço do Remetente:</label>
              <input
                type="text"
                value={remetenteEnd}
                onChange={(e) => setRemetenteEnd(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Nome do Destinatário:</label>
              <input
                type="text"
                value={destinatarioNome}
                onChange={(e) => setDestinatarioNome(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Endereço do Destinatário:</label>
              <input
                type="text"
                value={destinatarioEnd}
                onChange={(e) => setDestinatarioEnd(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
              />
            </div>
          </div>
        )}

        <button
          onClick={handlePrint}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <Icon name="printer" className="h-4 w-4" />
          <span>Imprimir / Salvar em PDF</span>
        </button>
      </div>

      {/* Printable Preview Column */}
      <div className="lg:col-span-6 flex flex-col items-center">
        <span className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
          Pré-visualização da folha A4
        </span>

        {/* Paper Container */}
        <div className="w-full max-w-[500px] min-h-[600px] bg-white text-slate-900 rounded-xl p-8 shadow-2xl border border-slate-300 flex flex-col justify-between print:shadow-none print:m-0 print:w-full print:border-none">
          {docType === 'recibo' ? (
            <div className="space-y-6">
              <div className="border-b-2 border-slate-900 pb-4 text-center">
                <h2 className="text-xl font-extrabold uppercase tracking-widest text-slate-900">
                  RECIBO DE PAGAMENTO
                </h2>
                <span className="text-sm font-bold text-slate-700">
                  Nº {Math.floor(Math.random() * 90000) + 10000}
                </span>
              </div>

              <div className="bg-slate-100 p-4 rounded-lg border border-slate-300 text-right">
                <span className="text-xs text-slate-600 font-bold block">VALOR RECEBIDO</span>
                <span className="text-2xl font-black text-slate-900">
                  R$ {valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <p className="text-xs text-slate-800 leading-relaxed font-serif">
                Recebi(emos) de <strong className="uppercase">{pagadorNome}</strong> (CPF/CNPJ:{' '}
                {pagadorDoc}) a quantia de{' '}
                <strong className="underline">
                  R$ {valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </strong>
                , referente a: {referente}.
              </p>

              <p className="text-xs text-slate-700">
                Para clareza e fins de direito, firmo(amos) o presente recibo.
              </p>

              <div className="pt-12 text-center space-y-2">
                <p className="text-xs text-slate-600">
                  {cidade}, {dataDoc}
                </p>
                <div className="w-64 border-t border-slate-900 mx-auto pt-1">
                  <p className="text-xs font-bold text-slate-900">{emissorNome}</p>
                  <p className="text-[10px] text-slate-600">{emissorDoc}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border-b-2 border-slate-900 pb-2 text-center">
                <h2 className="text-base font-bold uppercase text-slate-900">
                  DECLARAÇÃO DE CONTEÚDO
                </h2>
              </div>
              <div className="text-[11px] space-y-2">
                <p>
                  <strong>REMETENTE:</strong> {emissorNome} — {remetenteEnd}
                </p>
                <p>
                  <strong>DESTINATÁRIO:</strong> {destinatarioNome} — {destinatarioEnd}
                </p>
              </div>
              <table className="w-full text-left text-[10px] border-collapse border border-slate-300 mt-4">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 p-1">Item / Conteúdo</th>
                    <th className="border border-slate-300 p-1 w-12 text-center">Qtd</th>
                    <th className="border border-slate-300 p-1 w-20 text-right">Valor (R$)</th>
                  </tr>
                </thead>
                <tbody>
                  {itens.map((it) => (
                    <tr key={it.id}>
                      <td className="border border-slate-300 p-1">{it.desc}</td>
                      <td className="border border-slate-300 p-1 text-center">{it.qtd}</td>
                      <td className="border border-slate-300 p-1 text-right">
                        {it.valor.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-right text-xs font-bold pt-2">
                TOTAL DECLARADO: R$ {totalDeclaracao.toFixed(2)}
              </div>
            </div>
          )}

          <div className="text-center pt-8 border-t border-slate-200 text-[9px] text-slate-400">
            Documento gerado via AgilizaNota — www.agilizatools.com.br
          </div>
        </div>
      </div>
    </div>
  )
}
