import api from 'api'
import { useAuthState } from 'common/state/auth.state'
import { AuthProps } from 'common/types/auth'
import { ToastType, notify } from 'components/ui/Toast/CustomToast'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const { setToken, clearTokens } = useAuthState()
  const navigate = useNavigate()

  const signIn = useCallback(
    async (data: AuthProps) => {
      try {
        const response = await api.post('/auth/login', data)
        const { token } = response.data
        setToken(token)
        navigate('/')
      } catch (err) {
        notify(
          'Autentificare eșuată. Verificați adresa de e-mail și parola și încercați din nou.',
          ToastType.ERROR,
        )
      }
    },
    [navigate, setToken],
  )

  const logout = useCallback(() => {
    clearTokens()
    navigate('/login')
  }, [clearTokens, navigate])

  return { signIn, logout }
}
