'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth';
import { api } from '../services/api';

interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  // add other fields as needed
}

interface AuthContextType {
  user: User | null;
  login: (token: string, userData?: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await authService.getProfile();
          setUser(userData);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = (token: string, userData?: User) => {
    localStorage.setItem('token', token);
    if (userData) {
      setUser(userData);
    } else {
      // If user data not provided, fetch it
      authService.getProfile().then(setUser).catch(console.error);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    window.location.href = '/'; // Force redirect and reload to clear state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
