import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { FeedbackAlert } from '../feedback-alerts'

describe('FeedbackAlert', () => {
  it('renders success type', () => {
    render(<FeedbackAlert type="success" message="Success!" />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Success!')).toBeInTheDocument()
  })

  it('renders error type', () => {
    render(<FeedbackAlert type="error" message="Error!" />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders warning type', () => {
    render(<FeedbackAlert type="warning" message="Warning!" />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders info type', () => {
    render(<FeedbackAlert type="info" message="Info!" />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
