import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Permite importar @agiliza/ui (transpila o pacote local)
  transpilePackages: ['@agiliza/ui'],
}

export default nextConfig
