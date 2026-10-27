'use client'

import { type JSX } from 'react'

export function Code({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}): JSX.Element {
  return (
    <code
      className={`font-mono bg-slate-900/80 border border-slate-700/50 rounded px-1.5 py-0.5 text-sm text-blue-300 ${className}`}
    >
      {children}
    </code>
  )
}
