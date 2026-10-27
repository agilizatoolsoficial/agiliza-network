import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Transpila o pacote @agiliza/ui para que o Tailwind CSS da app
  // processe os arquivos .tsx do design system e aplique as classes corretamente.
  transpilePackages: ['@agiliza/ui'],
}

export default nextConfig
