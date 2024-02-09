import type { DrugListProps } from 'common/interfaces/HistoryTypes'
import { SET_SHOW_MODAL } from 'common/state/modalSlice'
import { Button } from 'components/ui/Button/Button'
import { CustomTable } from 'components/ui/CustomTable/CustomTable'
import { columnsManagementDrugs } from 'components/ui/CustomTable/TableColumns'
import { Attachment } from 'components/ui/Icon'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import ModalPreviewFile, { DocumentType } from '../Modal/ModalPreviewFile/ModalPreviewFile'
import { ButtonWrapper, Container, Content, Text } from './ExpandedRow.styled'

interface ExpandedRowProps {
  data: DrugListProps[]
  id: string
}

export const ExpandedRow: React.FC<ExpandedRowProps> = ({ data, id }) => {
  const dispatch = useDispatch()

  const handlePVDocument = useCallback(
    (type: DocumentType) => {
      dispatch(
        SET_SHOW_MODAL({
          isOpenModal: true,
          childModal: <ModalPreviewFile id={id} type={type} />,
        }),
      )
    },
    [dispatch, id],
  )
  // window.open(fileURL);

  return (
    <Container>
      <Content>
        <Text>Documente</Text>
        <ButtonWrapper>
          <Button variant='document' size='XS' onClick={() => handlePVDocument('normal')}>
            <Attachment />
            PV Predare General
          </Button>
          <Button variant='document' size='XS' onClick={() => handlePVDocument('psycholeptic')}>
            <Attachment />
            Declaratie PR Stupefiante
          </Button>
        </ButtonWrapper>
        <Text top={24}>Medicamente</Text>
        <CustomTable columns={columnsManagementDrugs} dataSource={data} className='drug' />
      </Content>
    </Container>
  )
}
