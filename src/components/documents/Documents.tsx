import { useAppDispatch } from 'common/hooks/redux'
import { SET_SHOW_MODAL } from 'common/state/modalSlice'
import { Button } from 'components/ui/Button/Button'
import { CustomTable } from 'components/ui/CustomTable/CustomTable'
import { columnsDocuments } from 'components/ui/CustomTable/TableColumns'
import { DocumentsGenModal } from 'components/ui/Modal/DocumentsGenModal/DocumentsGenModal'
import { NavigateList } from 'components/ui/NavigateList/NavigateList'
import { useState } from 'react'
import { Container, Title, TopContainer } from './Documents.styled'

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
const LIST = ['Proces Verbal', 'Psychotropic Subs', 'Shared', 'Trash']

export const Documents = () => {
  const dispatch = useAppDispatch()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedList, setSelectedList] = useState<string>(LIST[0])

  // TODO --> FIND BETTER APPROACH
  const DisplayTable = () => {
    switch (selectedList) {
      case 'Proces Verbal':
        return <CustomTable columns={columnsDocuments} dataSource={mockData} isLoading={false} />
      case 'Shared':
        return <CustomTable columns={columnsDocuments} dataSource={[]} isLoading={false} />
      case 'Trash':
        return <CustomTable columns={columnsDocuments} dataSource={[]} isLoading={false} />
      case 'Psychotropic Subs':
        return <CustomTable columns={columnsDocuments} dataSource={[]} isLoading={false} />
    }
  }

  const handleCloseModal = () => {
    dispatch(SET_SHOW_MODAL({ isOpenModal: false, childModal: null }))
  }

  const callbackOnClickGenerate = () => {
    dispatch(
      SET_SHOW_MODAL({
        isOpenModal: true,
        childModal: <DocumentsGenModal handleCloseModal={handleCloseModal} />,
      }),
    )
  }

  return (
    <Container>
      <TopContainer>
        <Title>Documents</Title>
        {(selectedList === 'Proces Verbal' || selectedList === 'Psychotropic Subs') && (
          <Button onClick={callbackOnClickGenerate}>Generate new</Button>
        )}
      </TopContainer>
      <NavigateList list={LIST} />
      <DisplayTable />
    </Container>
  )
}
