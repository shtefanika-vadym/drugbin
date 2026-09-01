import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Role = 'admin' | 'hospital'

export interface Session {
  token: string
  role: Role | null
  email: string
  hospitalId: string | null
  hospitalName: string | null
}

interface AuthState extends Session {
  setSession: (session: Partial<Session> & { token: string }) => void
  setToken: (token: string) => void
  clearTokens: () => void
}

const EMPTY: Session = {
  token: '',
  role: null,
  email: '',
  hospitalId: null,
  hospitalName: null,
}

export const useAuthState = create(
  persist<AuthState>(
    (set) => ({
      ...EMPTY,
      setSession: (session) =>
        set({
          token: session.token,
          role: session.role ?? null,
          email: session.email ?? '',
          hospitalId: session.hospitalId ?? null,
          hospitalName: session.hospitalName ?? null,
        }),
      setToken: (token) => set({ token }),
      clearTokens: () => set({ ...EMPTY }),
    }),
    {
      name: 'auth-storage',
    },
  ),
)
