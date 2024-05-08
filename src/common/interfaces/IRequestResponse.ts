import type { SerializedError } from '@reduxjs/toolkit'
import type { BaseQueryError } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import type { MutationDefinition } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export interface IRequestResponse<T = void> {
  requestId: string
  data?: T
  error?:
    | SerializedError
    | (T extends MutationDefinition<any, infer BaseQuery, any, any>
        ? BaseQueryError<BaseQuery>
        : never)
  endpointName: string
  isError: boolean
  isFetching: boolean
  startedTimeStamp: number
  isLoading: boolean
  isSuccess: boolean
  isUninitialized: boolean
  originalArgs: any
  status: 'pending' | 'rejected' | 'fulfilled'
}

export type ITriggerRequest<T = void> = [
  (params?: any) => Promise<{
    data?: any
    error?: {
      status: number
      data: string[]
    }
  }>,
  IRequestResponse<T>,
]

