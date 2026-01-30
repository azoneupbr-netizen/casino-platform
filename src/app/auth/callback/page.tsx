'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

import { api } from '@/services/api';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    
    if (token) {
      // 1. Cenário Ideal: Backend já processou e retornou o token
      login(token);
      router.push('/');
    } else if (code) {
      // 2. Cenário "Bounce": Google redirecionou para o Frontend, mas precisamos que o Backend processe
      // Redireciona para o Backend mantendo o código e o state
      const apiBase = api.defaults.baseURL || 'http://localhost:3001';
      // Remove a barra final se existir para evitar //
      const cleanBase = apiBase.replace(/\/$/, '');
      const backendCallbackUrl = `${cleanBase}/auth/google/callback?${searchParams.toString()}`;
      
      console.log('Redirecionando para o backend processar o code:', backendCallbackUrl);
      window.location.href = backendCallbackUrl;
    } else {
      // 3. Erro ou acesso inválido
      console.error('Callback error:', error || 'No token or code found');
      router.push('/?error=auth_failed');
    }
  }, [searchParams, login, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto" />
        <p className="text-gray-400">Autenticando...</p>
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto" />
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
