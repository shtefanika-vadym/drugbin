import { createPv, usePvStartDate } from 'common/hooks/documents'
import { WDS_COLOR_RED } from 'common/styles/colors'
import { WDS_SIZE_040_PX } from 'common/styles/size'
import { DocumentType } from 'common/types/documents.types'
import { categoryLabels } from 'common/utils/utils'
import { format, subDays } from 'date-fns'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
  Field,
  FieldLabel,
  RangePickerContainer,
} from './DocumentCreation.styled'

interface DocumentCreationProps {
  /** The tab we're creating from — `normal` lets the user pick a category 1-6, `psycholeptic` is 7. */
  tab: DocumentType
  close: (open: boolean) => void
  refetchDocuments: () => void
}

const NORMAL_CATEGORIES = [1, 2, 3, 4, 5, 6]

/**
 * `yyyy-MM-dd` from the local calendar day. `toISOString()` shifts to UTC and, east of Greenwich,
 * rolls the picked day back to the previous one.
 */
const toIsoDay = (value: unknown): string => {
  const picked = Array.isArray(value) ? value[0] : value
  if (!picked) return ''
  return format(picked instanceof Date ? picked : new Date(picked as string), 'yyyy-MM-dd')
}

const asDate = (day: string): Date | null => (day ? new Date(`${day}T00:00:00`) : null)

export const DocumentCreation: React.FC<DocumentCreationProps> = ({
  tab,
  close,
  refetchDocuments,
}) => {
  const psycholeptic = tab === DocumentType.PSYCHOLEPTIC
  const [category, setCategory] = useState<number>(psycholeptic ? 7 : NORMAL_CATEGORIES[0])
  const [start, setStart] = useState<string>('')
  const [startEdited, setStartEdited] = useState(false)
  const [end, setEnd] = useState<string>('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const { startDate, isLoading, isError } = usePvStartDate(category)

  // Prefill the start date with the derived value until the user overrides it; a category change
  // recomputes the derived start, so drop the override then too.
  useEffect(() => setStartEdited(false), [category])
  useEffect(() => {
    if (startDate && !startEdited) setStart(startDate)
  }, [startDate, startEdited])

  const onStartChange = useCallback((value: unknown) => {
    setStartEdited(true)
    setStart(toIsoDay(value))
  }, [])
  const onEndChange = useCallback((value: unknown) => setEnd(toIsoDay(value)), [])

  const today = useMemo(() => subDays(new Date(), 0), [])
  const invalidRange = !!start && !!end && start > end

  const handleGenerate = useCallback(async () => {
    setBusy(true)
    setError('')
    try {
      await createPv(category, start, end)
      refetchDocuments()
      close(false)
    } catch (e: any) {
      const status = e?.response?.status
      setError(
        status === 404
          ? 'Nu există clasificări pentru această categorie în intervalul ales.'
          : status === 409
          ? 'Intervalul se suprapune cu un proces verbal existent pentru această categorie.'
          : status === 422
          ? 'Data de început trebuie să fie înaintea datei de încheiere.'
          : 'A apărut o eroare. Încercați din nou.',
      )
    } finally {
      setBusy(false)
    }
  }, [category, start, end, refetchDocuments, close])

  const renderPickers = () => {
    if (isLoading) return <Skeleton height={WDS_SIZE_040_PX} />
    if (isError)
      return (
        <Text variant='bodyS'>Ne pare rău, a apărut o eroare. Vă rugăm să încercați din nou.</Text>
      )
    return (
      <>
        <Field>
          <FieldLabel>Data de început</FieldLabel>
          <DatePicker
            yearPlaceholder='2026'
            monthPlaceholder='02'
            dayPlaceholder='12'
            format='yyyy-MM-dd'
            onChange={onStartChange}
            value={asDate(start)}
            maxDate={asDate(end) ?? today}
            clearIcon={null}
            calendarIcon={<CalendarIcon />}
          />
        </Field>
        <Field>
          <FieldLabel>Data de încheiere</FieldLabel>
          <DatePicker
            yearPlaceholder='2026'
            monthPlaceholder='02'
            dayPlaceholder='12'
            format='yyyy-MM-dd'
            onChange={onEndChange}
            value={asDate(end)}
            minDate={asDate(start) ?? undefined}
            maxDate={today}
            clearIcon={null}
            calendarIcon={<CalendarIcon />}
          />
        </Field>
      </>
    )
  }

  return (
    <Container>
      <Text variant='titleH4'>Generare proces verbal</Text>
      <Description>
        Selectați categoria și intervalul. Data de început este precompletată în continuarea
        ultimului proces verbal, dar o puteți modifica pentru a genera un PV pentru o perioadă
        trecută.
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

      <RangePickerContainer>{renderPickers()}</RangePickerContainer>

      {invalidRange && (
        <Text variant='bodyXS' color={WDS_COLOR_RED}>
          Data de început trebuie să fie înaintea datei de încheiere.
        </Text>
      )}

      {error && (
        <Text variant='bodyXS' color={WDS_COLOR_RED}>
          {error}
        </Text>
      )}

      <ButtonWrapper>
        <Button onClick={handleGenerate} disabled={busy || !start || !end || invalidRange}>
          <Loader isLoading={busy}>Generează</Loader>
        </Button>
        <Button variant='secondary' onClick={() => close(false)}>
          Anulare
        </Button>
      </ButtonWrapper>
    </Container>
  )
}
