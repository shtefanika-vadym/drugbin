import axios from 'axios'
import { useAuthState } from 'common/state/auth.state'
import { isEmpty } from 'lodash-es'

const API_URL = process.env.REACT_APP_DRUGBIN_API_BASE_URL || 'api'

export const api = axios.create({ baseURL: API_URL })

const getAccessToken = (): string | undefined => useAuthState.getState().token

api.interceptors.request.use((request) => {
  if (!request.headers.Authorization) {
    const token = getAccessToken()
    if (!isEmpty(token)) {
      request.headers.Authorization = `Bearer ${token}`
    }
  }
  return request
})

export default api
