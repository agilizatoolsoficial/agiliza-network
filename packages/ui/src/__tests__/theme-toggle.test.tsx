import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ThemeToggle } from '../theme-toggle'

describe('ThemeToggle', () => {
  it('renders toggle button', () => {
    render(<ThemeToggle />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('has proper aria-label', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label')
  })
})
