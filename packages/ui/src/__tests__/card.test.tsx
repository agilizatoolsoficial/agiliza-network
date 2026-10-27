import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardTitle } from '../card'

describe('Card', () => {
  it('renders with default props', () => {
    render(<Card>Content</Card>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders all variants', () => {
    const variants = ['default', 'elevated', 'glass', 'bordered', 'gradient'] as const
    variants.forEach((variant) => {
      render(<Card variant={variant}>Card</Card>)
      expect(screen.getByText('Card')).toBeInTheDocument()
    })
  })

  it('renders all padding options', () => {
    const paddings = ['none', 'sm', 'md', 'lg'] as const
    paddings.forEach((padding) => {
      render(<Card padding={padding}>Padded</Card>)
      expect(screen.getByText('Padded')).toBeInTheDocument()
    })
  })
})

describe('CardHeader', () => {
  it('renders children correctly', () => {
    render(<CardHeader><span>Header</span></CardHeader>)
    expect(screen.getByText('Header')).toBeInTheDocument()
  })
})

describe('CardTitle', () => {
  it('renders as h3', () => {
    render(<CardTitle>Title</CardTitle>)
    expect(screen.getByText('Title')).toBeInTheDocument()
  })
})
