import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { HeaderWrapper } from 'layout/Header/HeaderWrapper'

import backArrow from 'common/assets/icons/chevron-left.svg'

import { CustomTable } from 'common/components/CustomTable/CustomTable'
import { columnsRecycle } from 'common/components/CustomTable/TableColumns'
import { Spinner } from 'common/components/Spinner'
import { UtilService } from 'common/services/utilService'

import { Details } from 'features/Status/components/Details/Details'
import { usePharmaDetailsQuery } from 'features/Status/state/api/statusApi'

import { BorderStyle, ContentStatus, Icon, IconWrapper, RecivedText, Title } from './Status.styled'

export const Status = () => {
  const navigate = useNavigate()
  const params = useParams()
  const idTask = params.id

  const { data, isLoading } = usePharmaDetailsQuery(idTask)

  const handleNavigate = () => {
    navigate(-1)
  }

  const dataTableFormat = useMemo(
    () =>
      data?.expiredProducts?.map((element: any) => {
        return {
          key: element.id,
          name: {
            name: element.name,
            id: 'W64020007',
          },
          recycle: {
            data: UtilService.formatDate(element.createdAt),
            time: UtilService.formatTime(element.createdAt),
          },
          type: element.type,
          quantity: element.quantity,
          pack: element.pack,
          status: element.status,
          action: 'icon',
        }
      }),
    [data],
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
            name={data?.name}
            location={data?.location}
            schedule={data?.schedule}
            phone={data?.phone}
            total={data?.total}
            rx={0}
            otc={0}
            supplement={0}
          />
          <BorderStyle />
          <div>
            <RecivedText>Recived</RecivedText>
            <CustomTable columns={columnsRecycle} dataSource={dataTableFormat} isLoading={false} />
          </div>
        </ContentStatus>
      )}
    </HeaderWrapper>
  )
}
