import { CustomTable } from 'components/ui/CustomTable/CustomTable'
import { columnsDocuments } from 'components/ui/CustomTable/TableColumns'
import { NavigateList } from 'components/ui/NavigateList/NavigateList'
import { useState } from 'react'
import { Container, Title } from './Documents.styled'

// TODO --> DELETE THIS
const mockData = [
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

// TODO --> MOVE THIS & RENAME
const LIST = ['Proces Verbal', 'Shared', 'Trash']

export const Documents = () => {
  const [selectedList, setSelectedList] = useState<string>(LIST[0])

  // TODO --> FIND BETTER APPROACH
  const DisplayTable = () => {
    switch (selectedList) {
      case 'Proces Verbal':
        return <CustomTable columns={columnsDocuments} dataSource={mockData} isLoading={false} />
      case 'Shared':
        return <p>NOT READY</p>
      case 'Trash':
        return <p>NOT READY</p>
    }
  }

  return (
    <Container>
      <Title>Documents</Title>
      <NavigateList list={LIST} selectedList={selectedList} setSelectedList={setSelectedList} />
      <DisplayTable />
    </Container>
  )
}
