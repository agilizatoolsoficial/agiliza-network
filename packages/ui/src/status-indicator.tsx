'use client'

import React from 'react'

export type StatusType = 'online' | 'offline' | 'loading' | 'error'
export type StatusSize = 'sm' | 'md' | 'lg'

export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: StatusType
  size?: StatusSize
  showLabel?: boolean
}

const statusColors: Record<StatusType, string> = {
  online: 'bg-emerald-500',
  offline: 'bg-slate-500',
  loading: 'bg-amber-500 animate-pulse',
  error: 'bg-rose-500',
}

const sizes: Record<StatusSize, string> = {
  sm: 'h-2 w-2',
  md: 'h-3 w-3',
  lg: 'h-4 w-4',
}

export function StatusIndicator({
  status,
  size = 'md',
  showLabel = false,
  className = '',
  ...rest
}: StatusIndicatorProps) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`} {...rest}>
      <span
        className={`${statusColors[status]} ${sizes[size]} rounded-full shrink-0`}
        aria-hidden="true"
      />
      {showLabel && (
        <span className="text-xs font-medium text-slate-400 capitalize">{status}</span>
      )}
    </div>
  )
}
