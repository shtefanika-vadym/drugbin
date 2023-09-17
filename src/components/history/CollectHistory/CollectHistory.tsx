import { Pagination } from 'antd'
import { useCollectQuery, useCollectSearchQuery } from 'api/productApi'
import { DEFAULT_PAGE_SIZE } from 'common/config'
import type { CollectData } from 'common/interfaces/HistoryTypes'
import { BoxWrapper } from 'components/history/Histyort.styled'
import { DocumentsSkeleton } from 'components/ui/DocumentsSkeleton/DocumentsSkeleton'
import { Empty } from 'components/ui/Empty/Empty'
import { RecycleBox } from 'features/Home/components/RecycleBox/RecycleBox'
import { isEmpty, toString } from 'lodash'
import { useCallback, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const CollectHistory: React.FC<{ searchValue: string }> = ({ searchValue }) => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = useMemo(() => Number(searchParams.get('page')) || 1, [searchParams])

  const { data: dataCollectSearch, isLoading: collectSearchLoading } = useCollectSearchQuery(
    {
      search: searchValue,
      page: page,
    },
    {
      skip: !searchValue,
    },
  )

  const {
    data: dataCollect,
    isLoading: collectLoading,
    refetch: refetchCollect,
  } = useCollectQuery(page)

  const handleNavigateToStatus = useCallback((id: number) => {
    navigate(`/collect-status/${id}`)
  }, [])

  // TODO --> MAKE THIS REUSABLE
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

  const curentData = useMemo(
    () => (searchValue ? dataCollectSearch : dataCollect),
    [dataCollectSearch, dataCollect, searchValue],
  )

  if (collectSearchLoading || collectLoading) return <DocumentsSkeleton />
  if (isEmpty(curentData.data)) return <Empty />

  return (
    <BoxWrapper>
      {curentData.data.map((entry: CollectData) => {
        return (
          <RecycleBox
            {...entry}
            callbackOnClick={() => handleNavigateToStatus(entry.id)}
            refetch={refetchCollect}
            key={entry.id}
          />
        )
      })}
      <Pagination
        hideOnSinglePage
        current={page}
        defaultCurrent={page}
        defaultPageSize={DEFAULT_PAGE_SIZE}
        total={curentData.totalItems}
        onChange={handlePagination}
      />
    </BoxWrapper>
  )
}
