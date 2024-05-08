import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  token: string
  setToken: (token: string) => void
  clearTokens: () => void
}

export const useAuthState = create(
  persist<AuthState>(
    (set, get) => ({
      token: get()?.token || '',
      setToken: (token) => set({ token }),
      clearTokens: () => set({ token: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
)
