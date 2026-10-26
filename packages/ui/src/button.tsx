'use client'

import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  href?: string
  target?: string
  rel?: string
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-600 text-white shadow-sm hover:bg-blue-500 hover:shadow-md active:scale-[0.98]',
  secondary:
    'border border-slate-700 bg-slate-800/90 text-slate-200 hover:border-slate-600 hover:bg-slate-700 hover:text-white active:scale-[0.98]',
  accent:
    'bg-cyan-700 text-white shadow-sm hover:bg-cyan-600 hover:shadow-md active:scale-[0.98]',
  ghost:
    'text-slate-300 hover:bg-slate-800/80 hover:text-white active:scale-[0.98]',
  danger:
    'border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 active:scale-[0.98]',
  outline:
    'border border-blue-500/40 text-blue-300 hover:bg-blue-500/10 hover:border-blue-400 hover:text-blue-200 active:scale-[0.98]',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'min-h-[36px] px-3.5 text-xs gap-1.5 rounded-lg',
  md: 'min-h-[44px] px-4 py-2 text-xs sm:text-sm gap-2 rounded-xl',
  lg: 'min-h-[50px] px-6 py-3 text-sm sm:text-base gap-2.5 rounded-xl font-semibold',
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      href,
      target,
      rel,
      children,
      disabled,
      className = '',
      type = 'button',
      ...rest
    },
    ref,
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium transition-all duration-150 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed'

    const combinedClasses = [
      baseClasses,
      variants[variant],
      sizes[size],
      fullWidth ? 'w-full flex' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={target === '_blank' ? rel || 'noopener noreferrer' : rel}
          className={combinedClasses}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {leftIcon && <span className="inline-flex shrink-0" aria-hidden="true">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0" aria-hidden="true">{rightIcon}</span>}
        </a>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled || loading}
        className={combinedClasses}
        {...rest}
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="h-4 w-4 animate-spin text-current"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Carregando...</span>
          </span>
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0" aria-hidden="true">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="inline-flex shrink-0" aria-hidden="true">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'
