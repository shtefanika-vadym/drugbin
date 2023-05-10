import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { HeaderWrapper } from 'layout/Header/HeaderWrapper'

import backArrow from 'common/assets/icons/chevron-left.svg'

import { Button } from 'common/components/Button/Button'
import { CustomTable } from 'common/components/CustomTable/CustomTable'
import { columnsRecycle } from 'common/components/CustomTable/TableColumns'
import { Spinner } from 'common/components/Spinner'
import { UtilService } from 'common/services/utilService'

import { useRecycleQuery } from 'features/History/store/api/productApi'
import { Details } from 'features/Status/components/Details/Details'

import {
  BorderStyle,
  ButtonWrapper,
  ContentStatus,
  Icon,
  IconWrapper,
  RecivedText,
  Title,
} from './Status.styled'

export const Status = () => {
  const navigate = useNavigate()
  const params = useParams()
  const idTask = params.id

  const { data: dataRecycle, isLoading } = useRecycleQuery()

  const filteredObjects = dataRecycle?.find((obj: any) => Number(obj.id) === Number(idTask))

  const handleNavigate = () => {
    navigate(-1)
  }

  const dataTableFormat = useMemo(
    () =>
      filteredObjects?.drugList?.map((element: any) => {
        return {
          key: element.drugId,
          name: {
            name: element.drugDetails.name,
            id: element.drugId,
          },
          recycle: {
            data: UtilService.formatDate(element.drugDetails.updatedAt),
            time: UtilService.formatTime(element.drugDetails.updatedAt),
          },
          type: UtilService.transformText(element.type),
          quantity: element.quantity,
          pack: UtilService.transformText(element.pack),
          action: 'icon',
        }
      }),
    [filteredObjects],
  )

  return (
    <HeaderWrapper>
      {isLoading ? (
        <Spinner isLoading={isLoading} />
      ) : (
        <ContentStatus>
          <IconWrapper>
            <Icon src={backArrow} onClick={handleNavigate} />
            <Title>Status</Title>
          </IconWrapper>
          <Details
            name={filteredObjects?.firstName}
            surname={filteredObjects?.lastName}
            total={filteredObjects?.drugList?.length}
            id={idTask}
          />
          <BorderStyle />
          <div>
            <RecivedText>Recived</RecivedText>
            <CustomTable columns={columnsRecycle} dataSource={dataTableFormat} isLoading={false} />
          </div>
          <ButtonWrapper>
            <Button variant='secondary'>Decline</Button>
            <Button>Approve</Button>
          </ButtonWrapper>
        </ContentStatus>
      )}
    </HeaderWrapper>
  )
}
