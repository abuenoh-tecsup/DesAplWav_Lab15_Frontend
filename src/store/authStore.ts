import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/auth';

interface AuthStorage {
  token: string | null;
  user: User | null;
}

interface AuthState extends AuthStorage {
  setToken: (token: string) => void;
  setUser: (user: User | null) => void;
  clearAuth: () => void;
  logout: () => void;
  isAdmin: () => boolean;
}

// Custom storage compatible con zustand persist
const localStorageAuth: any = {
  getItem: (name: string) => {
    const value = localStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name: string, value: AuthStorage) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,

      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      clearAuth: () => set({ token: null, user: null }),
      logout: () => get().clearAuth(),
      isAdmin: () => !!(get().user?.roles?.includes('ADMIN')),
    }),
    {
      name: 'auth',
      storage: localStorageAuth, // Usamos nuestro custom storage
    }
  )
);
