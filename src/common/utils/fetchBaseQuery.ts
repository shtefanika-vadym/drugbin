import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { useAuthState } from 'common/state/auth.state'

const getAccessToken = (): string | undefined => useAuthState.getState().token

export const baseQuery =
  (): BaseQueryFn<
    {
      url: string
      data?: AxiosRequestConfig['data']
      method: AxiosRequestConfig['method']
      headers?: AxiosRequestConfig['headers']
    },
    unknown,
    unknown
  > =>
  async (param) => {
    try {
      const token = getAccessToken()
      const result = await axios({
        ...param,
        baseURL: process.env.REACT_APP_DRUGBIN_API_BASE_URL,
        headers: {
          ...param?.headers,
          Authorization: token ? `Bearer ${token}` : null,
        },
      })
      return { data: result.data }
    } catch (axiosError) {
      // eslint-disable-next-line prefer-const
      let err = axiosError as AxiosError
      if (err.response?.status === 401) {
        localStorage.clear()
        window.location.assign('/auth')
      }
      const errors = err.response?.data['error' as keyof unknown]
      return {
        error: {
          status: err.response?.status,
          data:
            typeof errors === 'object'
              ? Object.values(errors).flat()
              : [err.response.data['message' as keyof unknown]],
        },
      }
    }
  }
