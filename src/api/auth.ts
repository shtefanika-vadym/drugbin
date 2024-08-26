import api from 'api'
import { AxiosResponse } from 'axios'
import { AuthData, AuthResponse, RegisterResponse } from 'common/types/auth.types'

export const auth = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response: AxiosResponse<AuthData> = await api.post('/auth/login', { email, password })
    return {
      status: response.status === 201,
      data: response.data,
    }
  } catch (error) {
    return {
      status: false,
      data: null,
    }
  }
}

export const register = async (
  name: string,
  email: string,
  password: string,
): Promise<RegisterResponse> => {
  try {
    const response: AxiosResponse = await api.post('/auth/register', { name, email, password })
    return {
      status: response.status === 201,
      data: response.data,
    }
  } catch (error) {
    return {
      status: false,
      data: null,
    }
  }
}
