import Modal from 'components/ui/Modal/Modal'
import { ButtonWrapper, Details, GeneratorContent, Title } from './DocumentsGenModal.styled'
import { Button } from 'components/ui/Button/Button'
import { DataPicker } from 'components/ui/DataPicker/DataPicker'

interface DocumentsGenModalProps {
  handleCloseModal: () => void
}

export const DocumentsGenModal: React.FC<DocumentsGenModalProps> = ({ handleCloseModal }) => {
  return (
    <Modal callbackOnClose={handleCloseModal}>
      <GeneratorContent>
        <Title>Select time period</Title>
        <Details>
          You can generate a report for a specific time interval by selecting a start date and an
          end date.
        </Details>
        <DataPicker />
        <ButtonWrapper>
          <Button>Generate report</Button>
          <Button variant='secondary' onClick={handleCloseModal}>
            Cancel
          </Button>
        </ButtonWrapper>
      </GeneratorContent>
    </Modal>
  )
}
