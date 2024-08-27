import { BareFetcher } from 'swr'
import useSWRMutation from 'swr/mutation'

export interface Model<T, E> {
  trigger: any
  data?: T
  error?: E
  reset?: () => void
  isMutating?: boolean
}

export const useDataOnDemand = <T, E = Error>(
  key: string,
  fetcher: BareFetcher<T> | null,
): Model<T, E> => {
  const { data, error, trigger, reset, isMutating } = useSWRMutation<T, E>(key, fetcher)

  return { data, error, trigger, reset, isMutating }
}
