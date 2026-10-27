import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Input } from '../input'

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input id="test" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders with error state', () => {
    render(<Input id="test" error />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('renders disabled state', () => {
    render(<Input id="test" disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
})
