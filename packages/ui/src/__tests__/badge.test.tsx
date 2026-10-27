import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Badge } from '../badge'

describe('Badge', () => {
  it('renders with default variant', () => {
    render(<Badge>Default</Badge>)
    expect(screen.getByText('Default')).toBeInTheDocument()
  })

  it('renders all variants', () => {
    const variants = ['default', 'success', 'warning', 'error', 'info'] as const
    variants.forEach((variant) => {
      render(<Badge variant={variant}>{variant}</Badge>)
      expect(screen.getByText(variant)).toBeInTheDocument()
    })
  })

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    sizes.forEach((size) => {
      render(<Badge size={size}>{size}</Badge>)
      expect(screen.getByText(size)).toBeInTheDocument()
    })
  })

  it('applies variant class correctly', () => {
    render(<Badge variant="success">Active</Badge>)
    const badge = screen.getByText('Active')
    expect(badge.className).toContain('emerald')
  })

  it('renders children correctly', () => {
    render(<Badge><span>Custom</span></Badge>)
    expect(screen.getByText('Custom')).toBeInTheDocument()
  })
})
