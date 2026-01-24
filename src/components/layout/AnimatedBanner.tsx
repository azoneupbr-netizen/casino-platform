'use client';

interface AnimatedBannerProps {
  variant?: 'full' | 'sidebar';
}

export default function AnimatedBanner({ variant = 'full' }: AnimatedBannerProps) {
  const isSidebar = variant === 'sidebar';
  
  return (
    <div className={`bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary rounded-xl overflow-hidden shadow-lg relative flex items-center justify-center group hover:scale-[1.01] transition-transform duration-300 cursor-pointer ${
      isSidebar ? 'h-24 my-2 mx-2 w-[calc(100%-1rem)]' : 'w-full h-16 md:h-20 my-6'
    }`}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite]"></div>
      
      {/* Animated Text Container */}
      <div className="relative z-10 w-full overflow-hidden flex flex-col items-center justify-center text-center px-2">
        <h2 className={`font-black text-white uppercase tracking-widest drop-shadow-md animate-pulse ${
          isSidebar ? 'text-sm leading-tight whitespace-normal' : 'text-lg sm:text-2xl md:text-4xl whitespace-normal'
        }`}>
          {isSidebar ? 'Bônus de Boas-vindas' : 'Aposte Agora no Cassino'}
        </h2>
        {isSidebar && (
          <span className="text-xs font-bold text-accent-gold mt-1 bg-black/20 px-2 py-0.5 rounded-full">
            R$ 500,00 GRÁTIS
          </span>
        )}
      </div>

      {/* Button/CTA Indicator (Optional) */}
      {!isSidebar && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-accent-primary rounded-full p-2 shadow-lg hidden md:block group-hover:rotate-12 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      )}
    </div>
  );
}