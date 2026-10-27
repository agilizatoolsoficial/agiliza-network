import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BioBuilder } from '../../components/BioBuilder'

describe('BioBuilder', () => {
  it('renders the bio builder', () => {
    render(<BioBuilder />)
    expect(screen.getByText(/Personalizar/i)).toBeInTheDocument()
  })

  it('has theme selector', () => {
    render(<BioBuilder />)
    expect(screen.getByText('Blue Dark')).toBeInTheDocument()
  })

  it('renders initial links', () => {
    render(<BioBuilder />)
    expect(screen.getByText('Meu Portfólio Principal')).toBeInTheDocument()
  })
})
