import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { StatusIndicator } from '../status-indicator'

describe('StatusIndicator', () => {
  it('renders online status', () => {
    render(<StatusIndicator status="online" />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders all status types', () => {
    const statuses = ['online', 'offline', 'loading', 'error'] as const
    statuses.forEach((status) => {
      render(<StatusIndicator status={status} />)
      expect(screen.getByRole('status')).toBeInTheDocument()
    })
  })
})
