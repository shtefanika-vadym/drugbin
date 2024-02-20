import { DatePicker } from 'antd'
import 'antd/lib/date-picker/style/css'
import {
  useDocumentsQuery,
  useGenerateRaportMutation,
  useGetLastRaportDateQuery,
} from 'api/documentsApi'
import { useGetEntriesQuery } from 'api/management'
import { Button } from 'components/ui/Button/Button'
import Modal from 'components/ui/Modal/Modal'
import moment from 'moment'
import { useCallback, useEffect, useState } from 'react'
import {
  ButtonWrapper,
  DateSpan,
  Details,
  Error,
  GeneratorContent,
  Title,
} from './DocumentsGenModal.styled'

interface DocumentsGenModalProps {
  type: string
  handleCloseModal: () => void
}

export const DocumentsGenModal: React.FC<DocumentsGenModalProps> = ({ type, handleCloseModal }) => {
  const [generateRaport, { isLoading }] = useGenerateRaportMutation()
  const { data } = useGetLastRaportDateQuery(type)
  const { refetch } = useDocumentsQuery(type)
  const { refetch: entriesRefetch } = useGetEntriesQuery(1)
  const [date, setDate] = useState<string>('')
  const [error, setError] = useState(false)

  const onCalendarChange = useCallback((_: any, dateString: string) => {
    setDate(dateString)
  }, [])

  const handleGenerateRaport = useCallback(async () => {
    if (!date) return setError(true)

    await generateRaport({
      type,
      data: {
        endDate: date,
      },
    })
    refetch()
    entriesRefetch()
    handleCloseModal()
  }, [date, entriesRefetch, generateRaport, handleCloseModal, refetch, type])

  useEffect(() => {
    if (date) return setError(false)
  }, [date])

  return (
    <Modal callbackOnClose={handleCloseModal}>
      <GeneratorContent>
        <Title>Generarea Raport</Title>
        <Details>
          Pentru a genera un raport, selectați o dată de încheiere. Data de început va fi setată
          automat pe baza ultimului raport generat.
        </Details>
        <Details>
          Data de început: <DateSpan>{data?.startDate}</DateSpan>
        </Details>
        <DatePicker
          onChange={onCalendarChange}
          disabledDate={(current) =>
            current.isBefore(moment(data?.startDate)) || current.isAfter(moment())
          }
          placeholder={'Data de încheiere'}
          status={error && 'error'}
        />
        {error && (
          <Error>
            Te rugăm să introduci o dată de început și o dată de încheiere pentru a putea continua.
          </Error>
        )}
        <ButtonWrapper>
          <Button onClick={handleGenerateRaport} disabled={isLoading || error}>
            Generează raport
          </Button>
          <Button variant='secondary' onClick={handleCloseModal}>
            Anulare
          </Button>
        </ButtonWrapper>
      </GeneratorContent>
    </Modal>
  )
}
