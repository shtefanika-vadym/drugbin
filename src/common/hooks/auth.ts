import { auth, register as registerUser } from 'api/auth'
import { useAuthState } from 'common/state/auth.state'
import { RegisterState, SignInState } from 'common/types/auth.types'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const defaultSignInState = {
  isLoading: false,
  hasSignInError: false,
}

const defaultRegisterState = {
  isLoading: false,
  hasSignInError: false,
}

export const useAuth = () => {
  const [signInState, setSignInState] = useState<SignInState>(defaultSignInState)
  const [registerState, setRegisterState] = useState<RegisterState>(defaultRegisterState)

  const { setToken, clearTokens } = useAuthState()
  const navigate = useNavigate()

  const signIn = useCallback(
    async (email: string, password: string) => {
      setSignInState({ isLoading: true, hasSignInError: false })
      try {
        const response = await auth(email, password)
        if (response.status) {
          setToken(response.data.token)
          setSignInState(defaultSignInState)
          navigate('/')
        }
        setSignInState({ isLoading: false, hasSignInError: true })
      } catch (error) {
        setSignInState({ isLoading: false, hasSignInError: true })
      }
    },
    [navigate, setToken],
  )

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      setRegisterState({ isLoading: true, hasSignInError: false })
      try {
        const response = await registerUser(name, email, password)
        if (response.status) {
          setRegisterState(registerState)
          navigate('/login')
        }
        setRegisterState({ isLoading: false, hasSignInError: true })
      } catch (error) {
        setRegisterState({ isLoading: false, hasSignInError: true })
      }
    },
    [navigate, registerState],
  )

  const logout = useCallback(() => {
    clearTokens()
    navigate('/')
  }, [clearTokens, navigate])

  return { signIn, signInState, register, registerState, logout }
}
