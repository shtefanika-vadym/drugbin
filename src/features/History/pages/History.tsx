import { Button } from 'common/components/Button/Button'
import { CustomTable } from 'common/components/CustomTable/CustomTable'
import { columns } from 'common/components/CustomTable/TableColumns'
import { tableData } from 'common/constants/mockData'

import { ContentHistory, Title, TitleWrapper } from './Histyort.styled'

export const History = () => {
  return (
    <ContentHistory>
      <TitleWrapper>
        <Title>Recycle History</Title>
        <Button>Recycle new</Button>
      </TitleWrapper>
      <CustomTable columns={columns} dataSource={tableData} />
    </ContentHistory>
  )
}
