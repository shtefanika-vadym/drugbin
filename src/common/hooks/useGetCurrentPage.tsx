import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useGetCurrentPage = () => {
  const [searchParams] = useSearchParams()
  const currentPage = useMemo(() => Number(searchParams.get('page')) || 1, [searchParams])

  return currentPage
}
