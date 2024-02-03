import { DatePicker, DatePickerProps } from 'antd'
import 'antd/lib/date-picker/style/css'
import { Button } from 'components/ui/Button/Button'
import Modal from 'components/ui/Modal/Modal'
import { ButtonWrapper, Details, GeneratorContent, Title } from './DocumentsGenModal.styled'

interface DocumentsGenModalProps {
  handleCloseModal: () => void
}

export const DocumentsGenModal: React.FC<DocumentsGenModalProps> = ({ handleCloseModal }) => {
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log('test', date, dateString)
  }
  return (
    <Modal callbackOnClose={handleCloseModal}>
      <GeneratorContent>
        <Title>Generarea Rapoart</Title>
        <Details>
          Pentru a genera un raport, alegeți pur și simplu o dată de încheiere. Data de început va
          fi setată automat pe baza informațiilor din ultimul raport generat. <br />
          Vă rugăm să fiți conștient că această acțiune este ireversibilă, așadar asigurați-vă că
          ați selectat cu exactitate data de încheiere înainte de a proceda.
        </Details>
        <p>Data de început: 13.01.2022</p>
        <DatePicker onChange={onChange} placeholder='Data de încheiere'/>
        <ButtonWrapper>
          <Button>Generează</Button>
          <Button variant='secondary' onClick={handleCloseModal}>
            Anulare
          </Button>
        </ButtonWrapper>
      </GeneratorContent>
    </Modal>
  )
}
