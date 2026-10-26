import React, { HTMLAttributes, forwardRef } from 'react'

export type CardVariant = 'default' | 'elevated' | 'glass' | 'bordered' | 'gradient'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
}

const variants: Record<CardVariant, string> = {
  default: 'bg-slate-900/80 border border-slate-800 text-slate-100',
  elevated: 'bg-slate-900 border border-slate-800 shadow-xl shadow-black/40 text-slate-100',
  glass: 'border border-slate-800/80 bg-slate-900/60 backdrop-blur-md text-slate-100',
  bordered: 'border border-blue-500/30 bg-slate-950/60 text-slate-100',
  gradient: 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 text-slate-100',
}

const paddings = {
  none: '',
  sm: 'p-4 rounded-xl',
  md: 'p-6 rounded-2xl',
  lg: 'p-8 rounded-2xl',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', padding = 'md', hoverable = false, children, className = '', ...rest }, ref) => {
    const hoverClasses = hoverable
      ? 'transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10'
      : ''

    return (
      <div
        ref={ref}
        className={`relative overflow-hidden ${variants[variant]} ${paddings[padding]} ${hoverClasses} ${className}`}
        {...rest}
      >
        {children}
      </div>
    )
  },
)

Card.displayName = 'Card'

export function CardHeader({ children, className = '' }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mb-4 border-b border-slate-800/80 pb-4 ${className}`}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className = '' }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={`text-base sm:text-lg font-bold text-white tracking-tight ${className}`}>
      {children}
    </h3>
  )
}
