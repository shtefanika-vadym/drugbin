import type { ReactNode } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from 'react-use'

import { LOCALE_STORAGE_KEYS } from 'common/constants/localeStorageConstants'
import { RESPONSE_PROPERTY_CONSTANTS } from 'common/constants/reponsePropertyConstants'
import type { ITriggerRequest } from 'common/interfaces/IRequestResponse'
import type { IUser } from 'common/interfaces/IUser'

import { useLoginMutation, useRegisterMutation } from 'features/Auth'
import type { IAuthLogin, IAuthRegister } from 'features/Auth/interfaces/IAuth'

interface IProps {
  user: IUser | null
  error: string | null
  logout: () => void
  login: (data: IAuthLogin) => Promise<void>
  register: (data: IAuthRegister) => Promise<boolean>
}

const AuthContext = createContext<IProps>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const [doLogin]: ITriggerRequest = useLoginMutation()
  const [doRegister]: ITriggerRequest = useRegisterMutation()
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useLocalStorage<IUser | null>(LOCALE_STORAGE_KEYS.USER, null)

  const login = async (data: IAuthLogin): Promise<void> => {
    const response = await doLogin(data)
    if (response.hasOwnProperty(RESPONSE_PROPERTY_CONSTANTS.ERROR)) setError(response.error.data[0])
    else {
      const { data } = response
      setUser({
        role: data.role,
        token: data.token,
      })
      navigate('/home')
    }
  }
  const register = async (registerData: IAuthRegister): Promise<boolean> => {
    const response = await doRegister(registerData)
    if (response.hasOwnProperty(RESPONSE_PROPERTY_CONSTANTS.ERROR)) {
      setError(response.error.data[0])
      return false
    }
    return true
  }

  const logout = () => {}

  const value = useMemo(
    () => ({
      user,
      error,
      logout,
      login,
      register,
    }),
    [user, error],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext) as IProps
}
