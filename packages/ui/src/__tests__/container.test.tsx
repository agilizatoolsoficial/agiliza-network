import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Container } from '../container'

describe('Container', () => {
  it('renders with default size', () => {
    render(<Container>Content</Container>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders all size options', () => {
    const sizes = ['sm', 'md', 'lg', 'xl', 'full'] as const
    sizes.forEach((size) => {
      render(<Container size={size}>{size}</Container>)
      expect(screen.getByText(size)).toBeInTheDocument()
    })
  })
})
