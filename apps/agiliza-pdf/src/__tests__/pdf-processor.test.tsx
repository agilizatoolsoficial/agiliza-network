import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { PDFProcessor } from '../../components/PDFProcessor'

describe('PDFProcessor', () => {
  it('renders the processor', () => {
    render(<PDFProcessor />)
    expect(screen.getByText('PDF')).toBeInTheDocument()
  })

  it('has mode buttons', () => {
    render(<PDFProcessor />)
    expect(screen.getByText('Mesclar')).toBeInTheDocument()
    expect(screen.getByText('Dividir')).toBeInTheDocument()
  })

  it('renders with initial mode merge', () => {
    render(<PDFProcessor />)
    expect(screen.getByText('Mesclar')).toBeInTheDocument()
  })
})
