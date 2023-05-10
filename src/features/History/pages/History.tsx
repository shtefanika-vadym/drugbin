import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { HeaderWrapper } from 'layout/Header/HeaderWrapper'

import { Button } from 'common/components/Button/Button'
import { CustomTable } from 'common/components/CustomTable/CustomTable'
import { columns } from 'common/components/CustomTable/TableColumns'
import { NavigateList } from 'common/components/NavigateList/NavigateList'
import { UtilService } from 'common/services/utilService'

import { HISTORY_LABEL } from 'features/History/constants/constants'
import { useProductQuery, useRecycleQuery } from 'features/History/store/api/productApi'
import { RecycleBox } from 'features/Home/components/RecycleBox/RecycleBox'

import { BoxWrapper, ContentHistory, TableWrapper, Title, TitleWrapper } from './Histyort.styled'

const LIST = ['History', 'Collect']

export const History = () => {
  const [selectedList, setSelectedList] = useState<string>(LIST[0])

  const navigate = useNavigate()
  const { data, isLoading } = useProductQuery()
  const { data: dataRecycle, refetch } = useRecycleQuery()

  const changeData = () => {
    return (
      data?.map((element: any) => {
        return {
          key: element.id,
          name: {
            name: element.name,
            id: 'W64020007',
          },
          recycle: {
            data: UtilService.formatDate(element.createdAt),
            time: UtilService.formatTime(element.createdAt),
          },
          type: UtilService.transformText(element.type),
          quantity: element.quantity,
          pack: UtilService.transformText(element.pack),
          status: element.status,
          action: 'icon',
        }
      }) || []
    )
  }

  const handleAddNew = () => {
    navigate('/add')
  }

  const handleDrugNavigation = (id: string) => {
    navigate(`/collect-status/${id}`)
  }

  return (
    <HeaderWrapper>
      <ContentHistory>
        <TitleWrapper>
          <Title>{HISTORY_LABEL.TITLE}</Title>
          <Button onClick={handleAddNew}>Recycle new</Button>
        </TitleWrapper>
        <TableWrapper>
          <NavigateList selectedList={selectedList} setSelectedList={setSelectedList} />
          {selectedList === 'History' ? (
            <CustomTable columns={columns} dataSource={changeData()} isLoading={isLoading} />
          ) : (
            <BoxWrapper>
              {dataRecycle?.map((element: any) => {
                return (
                  <RecycleBox
                    pharma={`${element.firstName} ${element.lastName}`}
                    quantity={element.id}
                    status={element.status}
                    id={element.id}
                    callbackOnClick={() => handleDrugNavigation(element.id)}
                    refetch={refetch}
                  />
                )
              })}
            </BoxWrapper>
          )}
        </TableWrapper>
      </ContentHistory>
    </HeaderWrapper>
  )
}
