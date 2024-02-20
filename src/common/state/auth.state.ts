import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  token: string
  setToken: (token: string) => void
}

export const useAuthState = create(
  persist<AuthState>(
    (set, get) => ({
      token: get()?.token || '',
      setToken: (token) => set({ token }),
    }),
    {
      name: 'auth-storage',
    },
  ),
)
