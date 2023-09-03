import { useRecycleQuery } from 'api/productApi'
import backArrow from 'common/assets/chevron-left.svg'
import { Button } from 'components/ui/Button/Button'
import { CustomTable } from 'components/ui/CustomTable/CustomTable'
import { columnsRecycle } from 'components/ui/CustomTable/TableColumns'
import Spinner from 'components/ui/Spinner/Spinner'
import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { collectStatusTable } from 'uc/historyMappers'
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

export const Status = () => {
  const navigate = useNavigate()
  const params = useParams()
  const idTask = params.id

  // TODO --> MUST CHANGE THIS, MAKE A SEPARATE ENDPOINT
  const { data: dataRecycle, isLoading } = useRecycleQuery()
  const filteredObjects = dataRecycle?.find((obj: any) => Number(obj.id) === Number(idTask))
  const dataTableFormat = useMemo(
    () => collectStatusTable(filteredObjects?.drugList || []),
    [filteredObjects],
  )

  const handleNavigate = () => {
    navigate(-1)
  }

  if (isLoading) return <Spinner isLoading={isLoading} />

  return (
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
        {filteredObjects.status !== 'recycled' && (
          <>
            <Button variant='secondary'>Decline</Button>
            <Button>Approve</Button>
          </>
        )}
      </ButtonWrapper>
    </ContentStatus>
  )
}
