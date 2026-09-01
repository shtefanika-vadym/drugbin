import { createPv, usePvStartDate } from 'common/hooks/documents'
import { WDS_COLOR_RED } from 'common/styles/colors'
import { WDS_SIZE_040_PX } from 'common/styles/size'
import { DocumentType } from 'common/types/documents.types'
import { categoryLabels } from 'common/utils/utils'
import { subDays } from 'date-fns'
import React, { useCallback, useMemo, useState } from 'react'
import { Button } from '../Button/Button'
import { DatePicker } from '../DatePicker/DatePicker'
import { CalendarIcon } from '../Icon'
import { Loader } from '../Loader'
import { Select } from '../Select/Select'
import { Skeleton } from '../Skeleton/Skeleton'
import { Text } from '../Text/Text'
import {
  ButtonWrapper,
  Container,
  Description,
  RangePickerContainer,
} from './DocumentCreation.styled'

interface DocumentCreationProps {
  /** The tab we're creating from — `normal` lets the user pick a category 1-6, `psycholeptic` is 7. */
  tab: DocumentType
  close: (open: boolean) => void
  refetchDocuments: () => void
}

const NORMAL_CATEGORIES = [1, 2, 3, 4, 5, 6]

export const DocumentCreation: React.FC<DocumentCreationProps> = ({
  tab,
  close,
  refetchDocuments,
}) => {
  const psycholeptic = tab === DocumentType.PSYCHOLEPTIC
  const [category, setCategory] = useState<number>(psycholeptic ? 7 : NORMAL_CATEGORIES[0])
  const [date, setDate] = useState<string>('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const { startDate, isLoading, isError } = usePvStartDate(category)

  const onChange = useCallback((value: any) => {
    if (!value) return setDate('')
    setDate(new Date(value).toISOString().split('T')[0])
  }, [])

  const minDate = useMemo(() => (startDate ? new Date(startDate) : undefined), [startDate])

  const handleGenerate = useCallback(async () => {
    setBusy(true)
    setError('')
    try {
      await createPv(category, date)
      refetchDocuments()
      close(false)
    } catch (e: any) {
      const status = e?.response?.status
      setError(
        status === 404
          ? 'Nu există clasificări pentru această categorie în intervalul ales.'
          : status === 409
          ? 'Există deja un proces verbal pentru această categorie și acest interval.'
          : 'A apărut o eroare. Încercați din nou.',
      )
      setDate('')
    } finally {
      setBusy(false)
    }
  }, [category, date, refetchDocuments, close])

  const renderDatePicker = () => {
    if (isLoading) return <Skeleton height={WDS_SIZE_040_PX} />
    if (isError)
      return (
        <Text variant='bodyS'>Ne pare rău, a apărut o eroare. Vă rugăm să încercați din nou.</Text>
      )
    return (
      <DatePicker
        yearPlaceholder='2026'
        monthPlaceholder='02'
        dayPlaceholder='12'
        format='yyyy-MM-dd'
        onChange={onChange}
        value={date}
        maxDate={subDays(new Date(), 0)}
        minDate={minDate}
        clearIcon={null}
        calendarIcon={<CalendarIcon />}
      />
    )
  }

  return (
    <Container>
      <Text variant='titleH4'>Generare proces verbal</Text>
      <Description>
        Selectați categoria și data de încheiere. Data de început este stabilită automat, în
        continuarea ultimului proces verbal.
      </Description>

      {!psycholeptic && (
        <Select
          label='Categorie'
          value={String(category)}
          onChange={(e) => setCategory(Number(e.target.value))}>
          {NORMAL_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {categoryLabels[c]}
            </option>
          ))}
        </Select>
      )}

      {startDate && (
        <Text variant='bodyXS'>
          Interval: {startDate} — {date || '…'}
        </Text>
      )}

      <RangePickerContainer>{renderDatePicker()}</RangePickerContainer>

      {error && (
        <Text variant='bodyXS' color={WDS_COLOR_RED}>
          {error}
        </Text>
      )}

      <ButtonWrapper>
        <Button onClick={handleGenerate} disabled={busy || !date}>
          <Loader isLoading={busy}>Generează</Loader>
        </Button>
        <Button variant='secondary' onClick={() => close(false)}>
          Anulare
        </Button>
      </ButtonWrapper>
    </Container>
  )
}
