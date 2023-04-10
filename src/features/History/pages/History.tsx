import { useNavigate } from 'react-router-dom'

import { HeaderWrapper } from 'layout/Header/HeaderWrapper'

import { Button } from 'common/components/Button/Button'
import { CustomTable } from 'common/components/CustomTable/CustomTable'
import { columns } from 'common/components/CustomTable/TableColumns'
import { Input } from 'common/components/Input/Input'
import { tableData } from 'common/constants/mockData'

import { HISTORY_LABEL, HISTORY_PLACEHOLDER } from 'features/History/constants/constants'
import { useProductQuery } from 'features/History/store/api/productApi'

import { ContentHistory, InputWrapper, Title, TitleWrapper } from './Histyort.styled'

export const History = () => {
  const navigate = useNavigate()
  const { data, isLoading } = useProductQuery()

  console.log('data', data)

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
        <CustomTable columns={columns} dataSource={tableData} isLoading={isLoading} />
      </ContentHistory>
    </HeaderWrapper>
  )
}
