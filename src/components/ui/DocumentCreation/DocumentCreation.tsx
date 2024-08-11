import { DatePicker } from 'antd'
import 'antd/lib/date-picker/style/css'
import {
  useDocumentsQuery,
  useGenerateRaportMutation,
  useGetLastRaportDateQuery,
} from 'api/documentsApi'
import { useGetEntriesQuery } from 'api/management'
import { WDS_SIZE_040_PX, WDS_SIZE_224_PX } from 'common/style/size'
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
  type: string
  close: (status: boolean) => void
}

export const DocumentCreation: React.FC<DocumentCreationProps> = ({ type, close }) => {
  const [currentDate, setCurrentDate] = useState<string>(moment(new Date()).format('YYYY-MM-DD'))
  const [error, setError] = useState(false)

  const { data, isLoading: isLastDateLoading } = useGetLastRaportDateQuery(type)
  const [generateRaport, { isLoading }] = useGenerateRaportMutation()
  const { refetch } = useDocumentsQuery(type)
  const { refetch: entriesRefetch } = useGetEntriesQuery(1)

  const onChange = useCallback((_: any, dateString: Array<string>) => {
    setCurrentDate(dateString[1])
  }, [])

  const handleGenerateRaport = useCallback(async () => {
    if (!currentDate) return setError(true)

    await generateRaport({
      type,
      data: {
        endDate: currentDate,
      },
    })
    refetch()
    entriesRefetch()
    close(false)
  }, [currentDate, entriesRefetch, generateRaport, refetch, close, type])

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
        {isLastDateLoading ? (
          <Skeleton width={WDS_SIZE_224_PX} height={WDS_SIZE_040_PX} />
        ) : (
          <RangePicker
            defaultValue={[moment(data.startDate), moment()]}
            format={'YYYY-MM-DD'}
            disabledDate={(current) =>
              current.isBefore(moment(data.startDate)) || current.isAfter(moment())
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
        <Button onClick={handleGenerateRaport} disabled={isLoading || error}>
          Generează raport
        </Button>
      </ButtonWrapper>
    </Container>
  )
}

