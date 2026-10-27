'use client'

import React, { forwardRef } from 'react'

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info'
export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-slate-800 text-slate-300 border border-slate-700',
  success: 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/50',
  warning: 'bg-amber-950/80 text-amber-300 border border-amber-700/50',
  error: 'bg-rose-950/80 text-rose-300 border border-rose-700/50',
  info: 'bg-blue-950/80 text-blue-300 border border-blue-700/50',
}

const sizes: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[10px] font-semibold rounded-full',
  md: 'px-2.5 py-1 text-xs font-semibold rounded-full',
  lg: 'px-3 py-1.5 text-sm font-semibold rounded-full',
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', className = '', children, ...rest }, ref) => {
    const combinedClasses = `${variants[variant]} ${sizes[size]} inline-flex items-center gap-1 ${className}`.trim()

    return (
      <span ref={ref} className={combinedClasses} {...rest}>
        {children}
      </span>
    )
  },
)

Badge.displayName = 'Badge'
