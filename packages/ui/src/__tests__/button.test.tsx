import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Button } from '../button'

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('renders all variants', () => {
    const variants = ['primary', 'secondary', 'accent', 'ghost', 'danger', 'outline'] as const
    variants.forEach((variant) => {
      render(<Button variant={variant}>{variant}</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    sizes.forEach((size) => {
      render(<Button size={size}>{size}</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  it('renders loading state', () => {
    render(<Button loading>Loading</Button>)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
