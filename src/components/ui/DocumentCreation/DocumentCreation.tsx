import { DatePicker } from 'antd'
import 'antd/lib/date-picker/style/css'
import { useGetVerbalProcesEntries } from 'common/hooks/documents'
import { useGetEntries } from 'common/hooks/management'
import { useGenerateRaport, useGetRaportDate } from 'common/hooks/raport'
import { WDS_SIZE_040_PX, WDS_SIZE_224_PX } from 'common/style/size'
import { DocumentType } from 'common/types/documents.types'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '../Button/Button'
import { Skeleton } from '../Skeleton/Skeleton'
import { Text } from '../Text/Text'
import {
  ButtonWrapper,
  Container,
  Description,
  RangePickerContainer,
} from './DocumentCreation.styled'
import './datePicker.scss'
const { RangePicker } = DatePicker

interface DocumentCreationProps {
  type: DocumentType
  close: (status: boolean) => void
}

// TODO: Refactoring
export const DocumentCreation: React.FC<DocumentCreationProps> = ({ type, close }) => {
  const [currentDate, setCurrentDate] = useState<string>(moment(new Date()).format('YYYY-MM-DD'))
  const [error, setError] = useState(false)

  const { data, isLoading } = useGetRaportDate(type)
  const { trigger, isMutating } = useGenerateRaport(type)
  const { mutate } = useGetVerbalProcesEntries(type)
  const { mutate: entriesRefetch } = useGetEntries(1)

  const onChange = useCallback((_: any, dateString: Array<string>) => {
    setCurrentDate(dateString[1])
  }, [])

  const handleGenerateRaport = useCallback(async () => {
    if (!currentDate) return setError(true)

    await trigger(currentDate)
    mutate()
    entriesRefetch()
    close(false)
  }, [currentDate, entriesRefetch, mutate, close, trigger])

  useEffect(() => {
    if (currentDate) return setError(false)
  }, [currentDate])

  return (
    <Container>
      <Text variant='titleH4'>Generarea Raport</Text>
      <Description>
        Pentru a genera un raport, selectați o dată de încheiere. Data de început va fi setată
        automat pe baza ultimului raport generat.
      </Description>

      <RangePickerContainer>
        {isLoading ? (
          <Skeleton width={WDS_SIZE_224_PX} height={WDS_SIZE_040_PX} />
        ) : (
          <RangePicker
            defaultValue={[moment(data), moment()]}
            format={'YYYY-MM-DD'}
            disabledDate={(current) =>
              current.isBefore(moment(data)) || current.isAfter(moment())
            }
            placeholder={['Data de început', 'Data de încheiere']}
            onChange={onChange}
          />
        )}
      </RangePickerContainer>

      <ButtonWrapper>
        <Button variant='secondary' onClick={() => close(false)}>
          Anulare
        </Button>
        <Button onClick={handleGenerateRaport} disabled={isMutating || error}>
          Generează raport
        </Button>
      </ButtonWrapper>
    </Container>
  )
}
