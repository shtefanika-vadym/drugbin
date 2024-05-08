import { toString } from 'lodash-es'
import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = useMemo(() => Number(searchParams.get('page')) || 1, [searchParams])

  const setCurrentPage = useCallback(
    (newPageNumber: number) => {
      searchParams.set('page', toString(newPageNumber))
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams],
  )

  return { currentPage, setCurrentPage }
}
