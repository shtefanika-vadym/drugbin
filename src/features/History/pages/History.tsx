import { useNavigate } from 'react-router-dom'

import { HeaderWrapper } from 'layout/Header/HeaderWrapper'

import { Button } from 'common/components/Button/Button'
import { CustomTable } from 'common/components/CustomTable/CustomTable'
import { columns } from 'common/components/CustomTable/TableColumns'
import { Input } from 'common/components/Input/Input'
import { UtilService } from 'common/services/utilService'

import { HISTORY_LABEL, HISTORY_PLACEHOLDER } from 'features/History/constants/constants'
import { useProductQuery } from 'features/History/store/api/productApi'

import { ContentHistory, InputWrapper, Title, TitleWrapper } from './Histyort.styled'

export const History = () => {
  const navigate = useNavigate()
  const { data, isLoading } = useProductQuery()

  const changeData = () => {
    return (
      data?.map((element: any) => {
        return {
          key: element.id,
          name: {
            name: element.name,
            id: 'W64020007',
          },
          brand: element.brand,
          recycle: {
            data: UtilService.formatDate(element.createdAt),
            time: UtilService.formatTime(element.createdAt),
          },
          type: element.type,
          quantity: 12,
          pack: element.pack,
          status: element.status,
          action: 'icon',
        }
      }) || []
    )
  }

  const handleAddNew = () => {
    navigate('/add')
  }

  return (
    <HeaderWrapper>
      <ContentHistory>
        <TitleWrapper>
          <Title>{HISTORY_LABEL.TITLE}</Title>
          <Button onClick={handleAddNew}>Recycle new</Button>
        </TitleWrapper>
        <InputWrapper>
          <Input type='search' placeholder={HISTORY_PLACEHOLDER.SEARCH} />
        </InputWrapper>
        <CustomTable columns={columns} dataSource={changeData()} isLoading={isLoading} />
      </ContentHistory>
    </HeaderWrapper>
  )
}
