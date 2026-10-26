import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { QRGenerator } from '../../components/QRGenerator'

describe('QRGenerator', () => {
  it('renders the QR generator', () => {
    render(<QRGenerator />)
    expect(screen.getByText('QR')).toBeInTheDocument()
  })

  it('has all tab buttons', () => {
    render(<QRGenerator />)
    expect(screen.getByText('Pix')).toBeInTheDocument()
    expect(screen.getByText('Link')).toBeInTheDocument()
  })

  it('renders Input component', () => {
    render(<QRGenerator />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders generate button', () => {
    render(<QRGenerator />)
    expect(screen.getByRole('button', { name: /gerar/i })).toBeInTheDocument()
  })
})
