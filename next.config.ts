import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ativa compressão Gzip para reduzir tamanho dos arquivos transferidos
  compress: true,
  
  // Remove header X-Powered-By por segurança e economia de bytes
  poweredByHeader: false,
  
  // Strict mode ajuda a identificar problemas no ciclo de vida React
  reactStrictMode: true,
  
  // Otimização de imagens
  images: {
    // Permite otimização de imagens externas (necessário para imagens de jogos)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Formatos modernos de imagem
    formats: ['image/avif', 'image/webp'],
  },
  
  // Otimização do compilador
  compiler: {
    // Remove console.log em produção
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
