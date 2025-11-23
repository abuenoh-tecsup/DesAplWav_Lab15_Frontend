import { create } from 'zustand';
import type { User } from '@/types/auth';

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;

  // Actions
  setToken: (token: string) => void;
  setUser: (user: User | null) => void;
  clearAuth: () => void;
  logout: () => void;

  // Helpers
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  user: null,
  loading: false,

  setToken: (token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
    set({ token });
  },

  setUser: (user) => set({ user }),

  clearAuth: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    set({ token: null, user: null });
  },

  logout: () => {
    // alias con semántica
    get().clearAuth();
  },

  isAdmin: () => {
    const user = get().user;
    return !!(user && Array.isArray(user.roles) && user.roles.includes('ADMIN'));
  },
}));
