import { HeaderWrapper } from 'layout/Header/HeaderWrapper'

import { CustomTable } from 'common/components/CustomTable/CustomTable'
import { columnsDocuments } from 'common/components/CustomTable/TableColumns'

import { ContentDocuments, Title } from './Documents.styled'

const test = [
  {
    name: {
      name: 'Raport Medicamente',
      id: 'Nr 11204983',
    },
    time: {
      data: '10/05/2023',
      time: '09:32',
    },
    period: '10/05/2023 - 10/04/2023',
    action: 'icon',
  },
  {
    name: {
      name: 'Raport Medicamente',
      id: 'Nr 11204983',
    },
    time: {
      data: '10/3/2023',
      time: '09:32',
    },
    period: '10/03/2023 - 10/02/2023',
    action: 'icon',
  },
  {
    name: {
      name: 'Raport Medicamente',
      id: 'Nr 11204983',
    },
    time: {
      data: '10/12/2023',
      time: '09:32',
    },
    period: '10/12/2022 - 10/01/2023',
    action: 'icon',
  },
]

export const Documents = () => {
  return (
    <HeaderWrapper>
      <ContentDocuments>
        <Title>Documents</Title>
        <CustomTable columns={columnsDocuments} dataSource={test} isLoading={false} />
      </ContentDocuments>
    </HeaderWrapper>
  )
}
