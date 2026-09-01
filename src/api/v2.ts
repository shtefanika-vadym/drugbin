import axios from 'axios'
import { useAuthState } from 'common/state/auth.state'
import { isEmpty } from 'lodash-es'

/**
 * The drugbin-cf Worker (auth + admin console + hospital overview). Separate from `src/api` (the
 * legacy dashboard's client, which points at the older Flask surface -- see drugbin-cf docs/16).
 * Per-env via REACT_APP_API_URL; falls back to prod.
 */
export const API_URL = process.env.REACT_APP_API_URL || 'https://api.drugbin.ro'

export const apiV2 = axios.create({ baseURL: API_URL })

apiV2.interceptors.request.use((request) => {
  const token = useAuthState.getState().token
  if (!request.headers.Authorization && !isEmpty(token)) {
    request.headers.Authorization = `Bearer ${token}`
  }
  return request
})

apiV2.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error?.response?.status === 401) {
      useAuthState.getState().clearTokens()
      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        window.location.assign('/login')
      }
    }
    return Promise.reject(error)
  },
)

export default apiV2
