import { WDS_COLOR_BLUE_200, WDS_COLOR_BLUE_400 } from 'common/style/colors'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import { Container } from './StatusType.styled'
import { DashboardCard } from 'components/layout/DashboardCard/DashboardCard'

export const StatusType = () => {
  return (
    <DashboardCard title='Status'>
      <Container>
        <ProgressBar name={'Aprobate'} value={1243} progress={68} />
        <ProgressBar
          name={'În progres'}
          value={143}
          progress={28}
          color={WDS_COLOR_BLUE_200}
        />
        <ProgressBar name={'Distruse'} value={1243} progress={68}  color={WDS_COLOR_BLUE_400}/>
      </Container>
    </DashboardCard>
  )
}
