import apiV2 from 'api/v2'
import { Role } from 'common/state/auth.state'

export interface LoginResponse {
  token: string
  expiresIn: number
  principal: {
    role: Role
    email?: string
    hospitalId?: string
    hospitalName?: string
  }
}

/**
 * One sign-in for both principals (ADR-0008). The Worker returns an admin token if the email +
 * password match ADMIN_EMAIL / ADMIN_PASSWORD, otherwise it checks the hospital row.
 */
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const { data } = await apiV2.post<LoginResponse>('/api/v1/auth/login', { email, password })
  return data
}
