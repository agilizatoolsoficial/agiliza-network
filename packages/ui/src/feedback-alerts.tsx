'use client'

import React from 'react'
import { Icon } from './icon'
import type { IconName } from './icon'

export type AlertType = 'success' | 'error' | 'warning' | 'info'

export interface FeedbackAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type: AlertType
  message: string
  onDismiss?: () => void
}

const alertStyles: Record<AlertType, string> = {
  success: 'bg-emerald-950/80 border border-emerald-700/50 text-emerald-300',
  error: 'bg-rose-950/80 border border-rose-700/50 text-rose-300',
  warning: 'bg-amber-950/80 border border-amber-700/50 text-amber-300',
  info: 'bg-blue-950/80 border border-blue-700/50 text-blue-300',
}

const alertIcons: Record<AlertType, IconName> = {
  success: 'check',
  error: 'x',
  warning: 'warning',
  info: 'shield',
}

export function FeedbackAlert({ type, message, onDismiss, className = '', ...rest }: FeedbackAlertProps) {
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${alertStyles[type]} ${className}`}
      role="alert"
      aria-live="polite"
      {...rest}
    >
      <Icon name={alertIcons[type]} className="mt-0.5 h-4 w-4 shrink-0" />
      <p className="flex-1 text-sm leading-relaxed">{message}</p>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded-md p-1 text-current opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Dismiss alert"
        >
          <Icon name="x" className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
