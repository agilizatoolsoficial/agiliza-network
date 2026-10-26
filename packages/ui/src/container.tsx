import React, { HTMLAttributes, forwardRef } from 'react'

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize
  /** Adiciona espaçamento vertical de seção */
  section?: boolean
}

const sizes: Record<ContainerSize, string> = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = 'xl', section = false, children, className = '', ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizes[size]} ${section ? 'py-8 sm:py-12 lg:py-16' : ''} ${className}`}
        {...rest}
      >
        {children}
      </div>
    )
  },
)

Container.displayName = 'Container'
