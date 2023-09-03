import noData from 'common/assets/no-data.svg'
import { Content, Description, Icon } from './Empty.styled'

interface EmptyProps {
  description?: string
}

export const Empty: React.FC<EmptyProps> = ({ description = 'No Data' }) => {
  return (
    <Content>
      <Icon src={noData} alt='No Data' />
      <Description>{description}</Description>
    </Content>
  )
}
