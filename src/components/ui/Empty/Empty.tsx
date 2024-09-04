import { EmptyIcon } from '../Icon'
import { Content, Description } from './Empty.styled'

interface EmptyProps {
  description?: string
}

export const Empty: React.FC<EmptyProps> = ({ description = 'Nu există date disponibile!' }) => {
  return (
    <Content>
      <EmptyIcon />
      <Description>{description}</Description>
    </Content>
  )
}
