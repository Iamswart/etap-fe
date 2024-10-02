'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useValidateToken } from '@/hooks/user/useValidateToken';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string, user: User, callback?: () => void) => void;
  logout: (callback?: () => void) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
  
    const { data: validatedUser, isLoading: isValidating, isError } = useValidateToken(token);
  
    useEffect(() => {
      const storedToken = localStorage.getItem('accessToken');
      const storedUser = localStorage.getItem('user');
      if (storedToken) {
        setToken(storedToken);
      }
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsInitialized(true);
    }, []);
  
    useEffect(() => {
      if (validatedUser) {
        setUser(validatedUser);
        localStorage.setItem('user', JSON.stringify(validatedUser));
      } else if (isError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
      }
    }, [validatedUser, isError]);
  
    const login = (newToken: string, newUser: User,) => {
      localStorage.setItem('accessToken', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      setToken(newToken);
      setUser(newUser);
    };
  
    const logout = () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
    };
  
    const isLoading = !isInitialized || (!!token && isValidating);
  
    return (
      <AuthContext.Provider value={{ user, login, logout, isLoading }}>
        {children}
      </AuthContext.Provider>
    );
  }

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}