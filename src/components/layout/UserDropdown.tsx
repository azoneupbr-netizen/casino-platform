import React, { useRef, useEffect } from 'react';
import Link from 'next/link';

interface UserDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    onLogout: () => void;
    onSupportClick: () => void;
}

export default function UserDropdown({ isOpen, onClose, onLogout, onSupportClick }: UserDropdownProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div ref={dropdownRef} className="absolute top-14 right-0 w-80 bg-white rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 border border-gray-100">
            {/* Header User Info */}
            <div className="bg-[#1e2330] p-4 text-white">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-yellow-400 overflow-hidden border-2 border-white/20">
                         <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg leading-tight">Allyk Medvediev</h3>
                        <p className="text-xs text-gray-400">ID: 87439201</p>
                    </div>
                </div>
                
                {/* VIP Progress */}
                <div className="bg-[#2a2e3e] rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-[#ccff00]">MEMBRO ALLYK</span>
                        <span className="text-[10px] text-gray-400">65%</span>
                    </div>
                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-[#ccff00] w-[65%]"></div>
                    </div>
                    
                    <button className="w-full mt-3 bg-[#2a2e3e] hover:bg-[#353a4d] text-white text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium">
                        <Link href="/rewards" className="flex items-center gap-2 w-full justify-center">
                            <span className="transform rotate-90 text-[10px]">›</span> Ver mais sobre Allyk VIP
                        </Link>
                    </button>
                </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
                <MenuItem icon={<UserIcon />} label="Minha Conta" href="/account" />
                <MenuItem icon={<BellIcon />} label="Notificações" href="/notifications" />
                <MenuItem icon={<StarIcon />} label="Prêmios e Recompensas" href="/rewards" />
                <MenuItem icon={<WalletIcon />} label="Carteira" href="/wallet" />
                <MenuItem icon={<ReceiptIcon />} label="Apostas" href="/bets" />
                
                <button 
                    onClick={() => {
                        onSupportClick();
                        onClose();
                    }}
                    className="w-full flex items-center gap-4 px-5 py-3 text-gray-600 hover:bg-gray-50 hover:text-black transition-colors group text-left"
                >
                    <span className="text-xl w-6 text-center text-gray-400 group-hover:text-black transition-colors flex justify-center items-center">
                        <HeadphoneIcon />
                    </span>
                    <span className="font-medium text-sm">Suporte ao vivo</span>
                </button>
                
                <div className="h-px bg-gray-100 my-1 mx-5"></div>
                
                <button 
                    onClick={onLogout}
                    className="w-full flex items-center gap-4 px-5 py-3 text-red-500 hover:bg-red-50 transition-colors group text-left"
                >
                    <span className="text-xl w-6 text-center flex justify-center items-center">
                        <LogoutIcon />
                    </span>
                    <span className="font-medium text-sm">Sair</span>
                </button>
            </div>
        </div>
    );
}

const HeadphoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
);

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
);

function MenuItem({ icon, label, href = "#" }: { icon: React.ReactNode, label: string, href?: string }) {
    return (
        <Link href={href} className="w-full flex items-center gap-4 px-5 py-3 text-gray-600 hover:bg-gray-50 hover:text-black transition-colors group">
            <span className="text-xl w-6 text-center text-gray-400 group-hover:text-black transition-colors flex justify-center items-center">
                {icon}
            </span>
            <span className="font-medium text-sm">{label}</span>
        </Link>
    )
}

// Icons
const BellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
);
const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);
const WalletIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
);
const ReceiptIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const KeyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
);
const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);
const GiftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
);
