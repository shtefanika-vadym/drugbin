import { useNavigate } from 'react-router-dom'

import { HeaderWrapper } from 'layout/Header/HeaderWrapper'

import backArrow from 'common/assets/icons/chevron-left.svg'

import { CustomTable } from 'common/components/CustomTable/CustomTable'
import { columnsRecycle } from 'common/components/CustomTable/TableColumns'
import { tableData } from 'common/constants/mockData'

import { Details } from 'features/Status/components/Details/Details'

import { BorderStyle, ContentStatus, Icon, IconWrapper, RecivedText, Title } from './Status.styled'

export const Status = () => {
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate(-1)
  }
  return (
    <HeaderWrapper>
      <ContentStatus>
        <IconWrapper>
          <Icon src={backArrow} onClick={handleNavigate} />
          <Title>Status</Title>
        </IconWrapper>
        <Details />
        <BorderStyle />
        <div>
          <RecivedText>Recived</RecivedText>
          <CustomTable columns={columnsRecycle} dataSource={tableData} isLoading={false} />
        </div>
      </ContentStatus>
    </HeaderWrapper>
  )
}
