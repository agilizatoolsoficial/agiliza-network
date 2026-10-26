import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MediaDownloader } from '../../components/MediaDownloader'

describe('MediaDownloader', () => {
  it('renders the media downloader', () => {
    render(<MediaDownloader />)
    expect(screen.getByText(/mídia/i)).toBeInTheDocument()
  })

  it('renders URL input', () => {
    render(<MediaDownloader />)
    expect(screen.getByLabelText(/link/i)).toBeInTheDocument()
  })

  it('renders format options', () => {
    render(<MediaDownloader />)
    expect(screen.getByText('Vídeo MP4 (Full HD)')).toBeInTheDocument()
    expect(screen.getByText('Apenas Áudio (MP3)')).toBeInTheDocument()
  })

  it('renders download button', () => {
    render(<MediaDownloader />)
    expect(screen.getByRole('button', { name: /baixar/i })).toBeInTheDocument()
  })
})
