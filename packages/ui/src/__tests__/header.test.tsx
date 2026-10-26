import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Header } from '../components/Header'

describe('Header', () => {
  it('renders with default props', () => {
    render(<Header />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })
})
