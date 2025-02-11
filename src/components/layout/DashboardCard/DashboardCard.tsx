import { Text } from 'components/ui/Text/Text'
import { ReactNode } from 'react'
import { Container } from './DashboardCard.styled'
import { WDS_COLOR_BLUE_400 } from 'common/styles/colors'

interface DashboardCardProps {
  title: string
  children: ReactNode
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, children }) => {
  return (
    <Container>
      <Text variant='subheading' color={WDS_COLOR_BLUE_400}>
        {title}
      </Text>
      <>{children}</>
    </Container>
  )
}
