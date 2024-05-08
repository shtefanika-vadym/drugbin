import { useGetEntriesQuery, useGetEntriesSearchQuery } from 'api/management'
import { useDeleteStatusMutation, useUpdateStatusMutation } from 'api/statusApi'
import { usePagination } from 'common/hooks/usePagination'
import { useCallback } from 'react'

export const useManagementActions = (search?: string) => {
  const { currentPage } = usePagination()

  const [updateStatus] = useUpdateStatusMutation()
  const [deleteStatus] = useDeleteStatusMutation()
  const { refetch: updateEntries } = useGetEntriesQuery(currentPage)
  const { refetch: updateSearchEntries } = useGetEntriesSearchQuery(
    {
      search: search,
      page: currentPage,
    },
    {
      skip: !search,
    },
  )

  const refetchData = search ? updateSearchEntries : updateEntries

  const approveEntry = useCallback(
    async (id: string) => {
      if (id) await updateStatus(id)
      refetchData()
    },
    [refetchData, updateStatus],
  )

  const deleteEntry = useCallback(
    async (id: string) => {
      if (id) await deleteStatus(id)
      refetchData()
    },
    [deleteStatus, refetchData],
  )

  return { approveEntry, deleteEntry }
}
