import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Code } from '../code'

describe('Code', () => {
  it('renders code element', () => {
    render(<Code>const x = 1;</Code>)
    expect(screen.getByText('const x = 1;')).toBeInTheDocument()
  })
})
