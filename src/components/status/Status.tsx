import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import backArrow from 'common/assets/chevron-left.svg'

import { UtilService } from 'common/services/utilService'

import { useRecycleQuery } from 'api/productApi'

import {
  BorderStyle,
  ButtonWrapper,
  ContentStatus,
  Icon,
  IconWrapper,
  RecivedText,
  Title,
} from './Status.styled'
import { Details } from './components/Details'
import Spinner from 'components/ui/Spinner/Spinner'
import { CustomTable } from 'components/ui/CustomTable/CustomTable'
import { columnsRecycle } from 'components/ui/CustomTable/TableColumns'
import { Button } from 'components/ui/Button/Button'

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
    <>
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
    </>
  )
}
