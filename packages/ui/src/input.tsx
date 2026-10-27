'use client'

import React, { forwardRef, useId } from 'react'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  error?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizes: Record<NonNullable<InputProps['size']>, string> = {
  sm: 'min-h-[36px] px-3 py-1.5 text-xs',
  md: 'min-h-[44px] px-4 py-2 text-sm',
  lg: 'min-h-[50px] px-4 py-3 text-base',
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error = false,
      size = 'md',
      className = '',
      disabled = false,
      id: propId,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId()
    const id = propId ?? generatedId

    const baseClasses =
      'w-full rounded-xl border bg-slate-900/80 text-slate-100 placeholder:text-slate-500 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-50'

    const stateClasses = error
      ? 'border-rose-500/60 focus-visible:ring-rose-400'
      : 'border-slate-700/80 hover:border-slate-600 focus:border-blue-500'

    const combinedClasses = `${baseClasses} ${sizes[size]} ${stateClasses} ${className}`.trim()

    return (
      <input
        id={id}
        ref={ref}
        className={combinedClasses}
        disabled={disabled}
        aria-invalid={error || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
    )
  },
)

Input.displayName = 'Input'
