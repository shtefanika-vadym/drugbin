import { useProductQuery, useRecycleQuery } from 'api/productApi'
import { Button } from 'components/ui/Button/Button'
import { CustomTable } from 'components/ui/CustomTable/CustomTable'
import { columns } from 'components/ui/CustomTable/TableColumns'
import { NavigateList } from 'components/ui/NavigateList/NavigateList'
import Spinner from 'components/ui/Spinner/Spinner'
import { RecycleBox } from 'features/Home/components/RecycleBox/RecycleBox'
import { gt } from 'lodash'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BoxWrapper, TableWrapper, Title, TitleWrapper } from './Histyort.styled'

// TODO --> MOVE THIS CONST, FIND OTHER NAME
const LIST = ['History', 'Collect']

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
      case 'History':
        return <CustomTable columns={columns} dataSource={data} isLoading={isLoading} />

      case 'Collect':
        if (recycleLoading) return <Spinner isLoading />
        if (gt(dataRecycle, 0)) {
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
        return <p>No Data</p>
    }
  }

  return (
    <>
      <TitleWrapper>
        <Title>Entry History</Title>
        <Button onClick={handleNavigateToAddEntry}>New Entry</Button>
      </TitleWrapper>
      <TableWrapper>
        <NavigateList list={LIST} selectedList={selectedList} setSelectedList={setSelectedList} />
        <DisplayTable />
      </TableWrapper>
    </>
  )
}
