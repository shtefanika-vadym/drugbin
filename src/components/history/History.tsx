import { useProductQuery, useRecycleQuery } from 'api/productApi'
import { Button } from 'components/ui/Button/Button'
import { CustomTable } from 'components/ui/CustomTable/CustomTable'
import { columns } from 'components/ui/CustomTable/TableColumns'
import { Empty } from 'components/ui/Empty/Empty'
import { Input } from 'components/ui/Input/Input'
import { NavigateList } from 'components/ui/NavigateList/NavigateList'
import { DocumentsSkeleton } from 'components/ui/DocumentsSkeleton/DocumentsSkeleton'
import { RecycleBox } from 'features/Home/components/RecycleBox/RecycleBox'
import { isEmpty } from 'lodash'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BoxWrapper, SearchWrapper, TableWrapper, Title, TitleWrapper } from './Histyort.styled'

// TODO --> MOVE THIS CONST, FIND OTHER NAME
const LIST = ['Collect', 'All']

export const History = () => {
  const [selectedList, setSelectedList] = useState<string>(LIST[0])

  const navigate = useNavigate()
  const { data, isLoading } = useProductQuery()
  const { data: dataRecycle, isLoading: recycleLoading, refetch } = useRecycleQuery()

  const handleNavigateToAddEntry = useCallback(() => {
    navigate('/add')
  }, [])
  const handleNavigateToStatus = useCallback((id: string) => {
    navigate(`/collect-status/${id}`)
  }, [])

  // TODO --> FIND BETTER APPROACH
  const DisplayTable = () => {
    switch (selectedList) {
      case 'All':
        return <CustomTable columns={columns} dataSource={data} isLoading={isLoading} />

      case 'Collect':
        if (recycleLoading) return <DocumentsSkeleton />
        if (!isEmpty(dataRecycle)) {
          return (
            <BoxWrapper>
              {dataRecycle.map((entry: any) => {
                return (
                  <RecycleBox
                    {...entry}
                    callbackOnClick={() => handleNavigateToStatus(entry.id)}
                    refetch={refetch}
                  />
                )
              })}
            </BoxWrapper>
          )
        }
        return <Empty />
    }
  }

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
        <DisplayTable />
      </TableWrapper>
    </>
  )
}
