import { Pagination } from 'antd'
import { useProductQuery } from 'api/productApi'
import { DEFAULT_PAGE_SIZE } from 'common/config'
import { CustomTable } from 'components/ui/CustomTable/CustomTable'
import { columns } from 'components/ui/CustomTable/TableColumns'
import { DocumentsSkeleton } from 'components/ui/DocumentsSkeleton/DocumentsSkeleton'
import { toString } from 'lodash'
import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

export const CollectAll = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page')) || 1

  const { data: entryHistory, isLoading: entryHistoryLoading } = useProductQuery(page)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handlePagination = useCallback(
    (value: number) => {
      searchParams.set('page', toString(value))
      setSearchParams(searchParams)
      scrollToTop()
    },
    [page],
  )

  if (entryHistoryLoading) return <DocumentsSkeleton />

  return (
    <>
      <CustomTable
        columns={columns}
        dataSource={entryHistory?.data}
        isLoading={entryHistoryLoading}
      />
      <Pagination
        hideOnSinglePage
        defaultCurrent={page}
        defaultPageSize={DEFAULT_PAGE_SIZE}
        total={entryHistory?.totalItems}
        onChange={handlePagination}
      />
    </>
  )
}
