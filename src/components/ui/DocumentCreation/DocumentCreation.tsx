import { useGenerateRaport, useGetRaportDate } from 'common/hooks/raport'
import { WDS_COLOR_RED } from 'common/styles/colors'
import { WDS_SIZE_040_PX } from 'common/styles/size'
import { DocumentType } from 'common/types/documents.types'
import { subDays } from 'date-fns'
import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '../Button/Button'
import { DatePicker } from '../DatePicker/DatePicker'
import { CalendarIcon } from '../Icon'
import { Loader } from '../Loader'
import { Skeleton } from '../Skeleton/Skeleton'
import { Text } from '../Text/Text'
import {
  ButtonWrapper,
  Container,
  Description,
  RangePickerContainer,
} from './DocumentCreation.styled'

interface DocumentCreationProps {
  type: DocumentType
  close: (status: boolean) => void
  refetchDocuments: () => void
}

export const DocumentCreation: React.FC<DocumentCreationProps> = ({
  type,
  close,
  refetchDocuments,
}) => {
  const [date, setDate] = useState<string>('')

  const { trigger, isMutating, error } = useGenerateRaport(type)
  const { data: lastRaportDate, isLoading, isError } = useGetRaportDate(type)

  const onChange = useCallback(
    (date: any) => {
      const currentDate = new Date(date)
      const formattedDate = currentDate.toISOString().split('T')[0]
      setDate(formattedDate)
    },
    [setDate],
  )

  useEffect(() => {
    if (error) setDate('')
  }, [error])

  const handleGenerateRaport = useCallback(async () => {
    await trigger(date)
    refetchDocuments()
    close(false)
  }, [date, refetchDocuments, close, trigger])

  const renderDatePicker = () => {
    if (isLoading) return <Skeleton height={WDS_SIZE_040_PX} />
    if (isError)
      return (
        <Text variant='bodyS'>
          Ne pare rău, a apărut o eroare necunoscută. Vă rugăm să încercați din nou sau să
          contactați suportul tehnic pentru asistență.
        </Text>
      )

    return (
      <DatePicker
        yearPlaceholder='EX. 2024'
        monthPlaceholder='02'
        dayPlaceholder='12'
        format='yyyy-MM-dd'
        onChange={onChange}
        value={date}
        maxDate={subDays(new Date(), 0)}
        minDate={new Date(lastRaportDate)}
        clearIcon={null}
        calendarIcon={<CalendarIcon />}
      />
    )
  }

  return (
    <Container>
      <Text variant='titleH4'>Generarea Raport</Text>
      <Description>
        Pentru a genera un raport, selectați o dată de încheiere. Data de început va fi setată
        automat pe baza ultimului raport generat.
      </Description>
      <RangePickerContainer>{renderDatePicker()}</RangePickerContainer>
      {error && (
        <Text variant='bodyXS' color={WDS_COLOR_RED}>
          Nu există date disponibile pentru perioada selectată. Vă rugăm să verificați intervalul
          ales și să încercați din nou
        </Text>
      )}
      <ButtonWrapper>
        <Button onClick={handleGenerateRaport} disabled={isMutating || !date}>
          <Loader isLoading={isMutating}>Generează raport</Loader>
        </Button>
        <Button variant='secondary' onClick={() => close(false)}>
          Anulare
        </Button>
      </ButtonWrapper>
    </Container>
  )
}
