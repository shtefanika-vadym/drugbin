import { DatePicker } from 'antd'
import 'antd/lib/date-picker/style/css'
import { Button } from 'components/ui/Button/Button'
import Modal from 'components/ui/Modal/Modal'
import type { Moment } from 'moment'
import moment from 'moment'
import { useMemo, useState } from 'react'
import { ButtonWrapper, Details, GeneratorContent, Span, Title } from './DocumentsGenModal.styled'
import { useDocumentsGenerateMutation } from 'api/documentsApi'

const { RangePicker } = DatePicker

interface DocumentsGenModalProps {
  handleCloseModal: () => void
  disabledDate: string
  type: string
}

export const DocumentsGenModal: React.FC<DocumentsGenModalProps> = ({
  handleCloseModal,
  disabledDate,
  type,
}) => {
  const [documentsGenerate, { isLoading }] = useDocumentsGenerateMutation()

  const [timePeriod, setTimePeriod] = useState({
    startDate: '',
    endDate: '',
  })
  const defaultStartDate = useMemo(() => moment(disabledDate), [disabledDate])
  const isButtonActive = Boolean(timePeriod.startDate && timePeriod.endDate)

  const getDisabledDate = (current: Moment) => {
    return current.isBefore(moment(disabledDate, 'YYYY-MM-DD'))
  }

  const handleChangeData = (_values: [Moment, Moment], formatString: [string, string]) => {
    setTimePeriod({
      startDate: formatString[0],
      endDate: formatString[1],
    })
  }

  const generateDocuments = () => {
    const generateData = {
      type: type,
      timePeriod: timePeriod,
    }
    documentsGenerate(generateData)
  }
  return (
    <Modal callbackOnClose={handleCloseModal}>
      <GeneratorContent>
        <Title>Selectați perioada de timp</Title>
        <Details>
          Puteți genera un proces verbal pentru un interval de timp specific selectând o dată de
          început și o dată de încheiere.
        </Details>
        {disabledDate && (
          <Details>
            Ultimul proces verbal a fost creat la data de <Span>{disabledDate}</Span>.
          </Details>
        )}
        <RangePicker
          placeholder={['Dată de început', 'Dată de încheiere']}
          disabledDate={getDisabledDate}
          defaultValue={[defaultStartDate, null]}
          onClick={(e) => {
            e.stopPropagation()
          }}
          onChange={handleChangeData}
        />
        <ButtonWrapper>
          <Button onClick={generateDocuments} disabled={isLoading || !isButtonActive}>
            Generate report
          </Button>
          <Button variant='secondary' onClick={handleCloseModal}>
            Cancel
          </Button>
        </ButtonWrapper>
      </GeneratorContent>
    </Modal>
  )
}
