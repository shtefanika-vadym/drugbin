import { Pagination } from 'antd'
import { useCollectQuery, useProductQuery } from 'api/productApi'
import { DEFAULT_PAGE_SIZE } from 'common/config'
import type { CollectData } from 'common/interfaces/History'
import { Button } from 'components/ui/Button/Button'
import { CustomTable } from 'components/ui/CustomTable/CustomTable'
import { columns } from 'components/ui/CustomTable/TableColumns'
import { DocumentsSkeleton } from 'components/ui/DocumentsSkeleton/DocumentsSkeleton'
import { Empty } from 'components/ui/Empty/Empty'
import { Input } from 'components/ui/Input/Input'
import { NavigateList } from 'components/ui/NavigateList/NavigateList'
import { RecycleBox } from 'features/Home/components/RecycleBox/RecycleBox'
import { isEmpty } from 'lodash'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BoxWrapper, SearchWrapper, TableWrapper, Title, TitleWrapper } from './Histyort.styled'

// TODO --> MOVE THIS CONST, FIND OTHER NAME
const LIST = ['Collect', 'All']

export const History = () => {
  const navigate = useNavigate()
  const [selectedList, setSelectedList] = useState<string>(LIST[0])

  const handleNavigateToAddEntry = useCallback(() => {
    navigate('/add')
  }, [])

  return (
    <>
      <TitleWrapper>
        <Title>Entry History</Title>
        <SearchWrapper>
          <Input type='search' placeholder='EX: Tipografiei 1' value='' />
          <Button onClick={handleNavigateToAddEntry}>New Entry</Button>
        </SearchWrapper>
      </TitleWrapper>
      <TableWrapper>
        <NavigateList list={LIST} selectedList={selectedList} setSelectedList={setSelectedList} />
        <DisplayTable selectedList={selectedList} />
      </TableWrapper>
    </>
  )
}

// TODO --> FIND BETTER APPROACH
const DisplayTable: React.FC<{ selectedList: string }> = ({ selectedList }) => {
  const navigate = useNavigate()
  const [pagination, setPagination] = useState<number>(1)

  const {
    data: dataCollect,
    isLoading: collectLoading,
    refetch: refetchCollect,
  } = useCollectQuery(pagination)
  const { data, isLoading } = useProductQuery()

  const handleNavigateToStatus = useCallback((id: number) => {
    navigate(`/collect-status/${id}`)
  }, [])

  // TODO --> MAKE REUSABLE
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handlePagination = useCallback(
    (value: number) => {
      setPagination(value)
      scrollToTop()
    },
    [pagination],
  )

  switch (selectedList) {
    case 'All':
      return <CustomTable columns={columns} dataSource={data} isLoading={isLoading} />

    case 'Collect':
      if (collectLoading) return <DocumentsSkeleton />
      if (!isEmpty(dataCollect.data)) {
        return (
          <BoxWrapper>
            {dataCollect.data.map((entry: CollectData) => {
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
              defaultCurrent={pagination}
              defaultPageSize={DEFAULT_PAGE_SIZE}
              total={dataCollect.totalItems}
              onChange={handlePagination}
            />
          </BoxWrapper>
        )
      }
      return <Empty />
  }
}
