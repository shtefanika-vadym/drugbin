import { useGetEntries } from 'common/hooks/management'
import { ceil } from 'lodash-es'

export const useManagementEntries = ({ page, search }: { page: number; search: string }) => {
  const { data, isLoading, mutate } = useGetEntries(page, search)

  const totalResults = data?.totalItems || 0
  const totalPages = ceil(data?.totalItems / 10) + 1

  return { data: data?.data || [], totalResults, totalPages, isLoading, mutate }
}
