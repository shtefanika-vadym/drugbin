import { login, LoginResponse } from 'api/auth'
import { useAuthState } from 'common/state/auth.state'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface RequestState {
  isLoading: boolean
  hasError: boolean
}

const IDLE: RequestState = { isLoading: false, hasError: false }

export const useAuth = () => {
  const [signInState, setSignInState] = useState<RequestState>(IDLE)
  const { setSession, clearTokens } = useAuthState()
  const navigate = useNavigate()

  const applySession = useCallback(
    (res: LoginResponse) => {
      setSession({
        token: res.token,
        role: res.principal.role,
        email: res.principal.email ?? '',
        hospitalId: res.principal.hospitalId ?? null,
        hospitalName: res.principal.hospitalName ?? null,
      })
      navigate(res.principal.role === 'admin' ? '/admin' : '/')
    },
    [navigate, setSession],
  )

  const signIn = useCallback(
    async (email: string, password: string) => {
      setSignInState({ isLoading: true, hasError: false })
      try {
        applySession(await login(email, password))
        setSignInState(IDLE)
      } catch {
        setSignInState({ isLoading: false, hasError: true })
      }
    },
    [applySession],
  )

  const logout = useCallback(() => {
    clearTokens()
    navigate('/login')
  }, [clearTokens, navigate])

  return { signIn, signInState, logout }
}
