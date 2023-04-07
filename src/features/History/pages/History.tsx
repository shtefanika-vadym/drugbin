import { Button } from 'common/components/Button/Button'
import { CustomTable } from 'common/components/CustomTable/CustomTable'
import { columns } from 'common/components/CustomTable/TableColumns'
import { Dropdown } from 'common/components/Dropdown/Dropdown'
import { Input } from 'common/components/Input/Input'
import { tableData } from 'common/constants/mockData'

import { ContentHistory, InputWrapper, Title, TitleWrapper } from './Histyort.styled'

export const History = () => {
  return (
    <ContentHistory>
      <TitleWrapper>
        <Title>Recycle History</Title>
        <Button>Recycle new</Button>
      </TitleWrapper>
      <InputWrapper>
        <Input type='search' placeholder='Search' />
        <Dropdown placeholder='Filter by' />
      </InputWrapper>
      <CustomTable columns={columns} dataSource={tableData} />
    </ContentHistory>
  )
}
