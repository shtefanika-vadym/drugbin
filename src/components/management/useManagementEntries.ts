import { useGetEntriesQuery, useGetEntriesSearchQuery } from 'api/management';
import { ceil } from 'lodash-es';

export const useManagementEntries = ({ page, search }: { page: number; search: string }) => {
  const { data: entries, isLoading: isLoadingEntries } = useGetEntriesQuery(page)
  const { data: searchEntries, isLoading: isLoadingSearchEntries } = useGetEntriesSearchQuery(
    {
      search: search,
      page: page,
    },
    {
      skip: !search,
    },
  )

  const data = search ? searchEntries : entries
  const totalResults = data?.totalItems || 0
  const totalPages = ceil(data?.totalItems / 10)
  const isLoading = isLoadingEntries || isLoadingSearchEntries

  return { data: data?.data || [], totalResults, totalPages, isLoading }
}
