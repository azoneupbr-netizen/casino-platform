import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary border-t border-border-custom pt-16 pb-8 text-text-secondary transition-colors duration-300">
      <div className="container mx-auto px-6">
        
        {/* Provedores e Parceiros */}
        <div className="mb-12 border-b border-border-custom pb-12">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-text-muted">Provedores Premium</h3>
          <div className="flex flex-wrap gap-8 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {['Pragmatic Play', 'Evolution', 'Playtech', 'NetEnt', 'Red Tiger', 'Spribe'].map((provider) => (
              <div key={provider} className="text-xl font-bold text-text-secondary flex items-center gap-2">
                <div className="w-8 h-8 bg-tertiary rounded-full animate-pulse" /> {/* Placeholder Logo */}
                {provider}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Coluna Marca */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl font-bold text-accent-gold">ALLYK</span>
              <span className="text-text-primary text-xl">CASINO</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              A melhor experiência em apostas esportivas e cassino online. Jogue com responsabilidade e segurança na plataforma mais confiável do mercado.
            </p>
            <div className="flex gap-4">
               {/* Redes Sociais Placeholders */}
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-accent-gold hover:text-black transition-all cursor-pointer">
                    <span className="text-xs font-bold">SOC</span>
                 </div>
               ))}
            </div>
          </div>

          {/* Links Institucionais */}
          <div>
            <h4 className="text-text-primary font-bold mb-6">Plataforma</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-accent-gold transition-colors">Sobre Nós</Link></li>
              <li><Link href="#" className="hover:text-accent-gold transition-colors">Afiliados</Link></li>
              <li><Link href="#" className="hover:text-accent-gold transition-colors">Carreiras</Link></li>
              <li><Link href="#" className="hover:text-accent-gold transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-text-primary font-bold mb-6">Ajuda</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-accent-gold transition-colors">Central de Ajuda</Link></li>
              <li><Link href="#" className="hover:text-accent-gold transition-colors">Regras de Apostas</Link></li>
              <li><Link href="#" className="hover:text-accent-gold transition-colors">Jogo Responsável</Link></li>
              <li><Link href="#" className="hover:text-accent-gold transition-colors">Fale Conosco</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-text-primary font-bold mb-6">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-accent-gold transition-colors">Termos e Condições</Link></li>
              <li><Link href="#" className="hover:text-accent-gold transition-colors">Política de Privacidade</Link></li>
              <li><Link href="#" className="hover:text-accent-gold transition-colors">KYC & AML</Link></li>
              <li><Link href="#" className="hover:text-accent-gold transition-colors">Auto-exclusão</Link></li>
            </ul>
          </div>
        </div>

        {/* Licenças e Pagamentos */}
        <div className="border-t border-border-custom pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-secondary px-4 py-2 rounded border border-border-custom flex items-center gap-2">
                <div className="w-6 h-6 bg-accent-gold rounded-full" />
                <span className="text-xs font-bold text-text-primary">GC CURAÇAO</span>
            </div>
            <div className="bg-secondary px-4 py-2 rounded border border-border-custom flex items-center gap-2">
                <span className="text-xs font-bold text-red-500">18+</span>
            </div>
          </div>
          
          <div className="flex gap-4 opacity-70">
            {['PIX', 'Visa', 'Mastercard', 'Crypto'].map(pay => (
                <span key={pay} className="text-xs font-bold bg-secondary px-3 py-1 rounded border border-border-custom">{pay}</span>
            ))}
          </div>
        </div>

        <div className="text-center text-xs mt-8 opacity-50 text-text-muted">
          &copy; {new Date().getFullYear()} Brand Casino. Todos os direitos reservados. Operado sob licença nº 8048/JAZ.
        </div>
      </div>
    </footer>
  );
}
