import { usePercentageCalculator } from 'common/hooks/percentage'
import { StatusChart } from 'common/interfaces/Dashboard'
import { WDS_COLOR_BLUE_200, WDS_COLOR_BLUE_400 } from 'common/style/colors'
import { DashboardCard } from 'components/layout/DashboardCard/DashboardCard'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import { Container } from './StatusType.styled'

interface StatusTypeProps {
  statusData: StatusChart
}

export const StatusType: React.FC<StatusTypeProps> = ({ statusData }) => {
  const { approved, pending, recycled } = statusData?.annual || {}

  const { percentageApproved, percentagePending, percentageRecycled } = usePercentageCalculator(
    approved,
    pending,
    recycled,
  )

  return (
    <DashboardCard title='Status'>
      <Container>
        <ProgressBar
          name={'Aprobate'}
          value={statusData?.annual?.approved}
          progress={percentageApproved}
        />
        <ProgressBar
          name={'În progres'}
          value={statusData?.annual?.pending}
          progress={percentagePending}
          color={WDS_COLOR_BLUE_200}
        />
        <ProgressBar
          name={'Distruse'}
          value={statusData?.annual?.recycled}
          progress={percentageRecycled}
          color={WDS_COLOR_BLUE_400}
        />
      </Container>
    </DashboardCard>
  )
}
