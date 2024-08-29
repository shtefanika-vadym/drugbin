import { WDS_COLOR_BLUE_300 } from 'common/styles/colors'
import { Text } from '../Text/Text'
import { Bar, BarWrapper, Container, Details } from './ProgressBar.styled'

interface ProgressBarProps {
  name: string
  value: number
  progress: number
  color?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  name,
  value,
  progress,
  color = WDS_COLOR_BLUE_300,
}) => {
  return (
    <Container>
      <Details>
        <Text variant='bodyS'>{name}</Text>
        <Text variant='bodyS'>{value}</Text>
      </Details>
      <BarWrapper>
        <Bar progress={progress} color={color} />
      </BarWrapper>
    </Container>
  )
}
