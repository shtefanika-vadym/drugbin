import {
  WDS_COLOR_BLUE_200,
  WDS_COLOR_BLUE_300,
  WDS_COLOR_BLUE_500,
  WDS_COLOR_GREY,
} from 'common/styles/colors'
import { DashboardCard } from 'components/layout/DashboardCard/DashboardCard'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import { Text } from '../Text/Text'
import { Container, Legend, LegendDot, TextWrapper } from './DocumentType.styled'
import { DocumentChart } from 'common/types/dashboard.types'

interface DocumentTypeProps {
  documentsData: DocumentChart
}

export const DocumentType: React.FC<DocumentTypeProps> = ({ documentsData }) => {
  const { annual } = documentsData || {}
  return (
    <DashboardCard title='Tip de document'>
      <Container>
        <ProgressBar name={'Documente'} value={annual?.total} progress={annual?.normal} />
        <Legend>
          <LegendDot color={WDS_COLOR_BLUE_300} />
          <TextWrapper>
            <Text variant='bodyS' color={WDS_COLOR_GREY}>
              Normale
            </Text>
            <Text variant='bodyS' color={WDS_COLOR_BLUE_500}>
              {annual?.normal} PV
            </Text>
          </TextWrapper>
        </Legend>
        <Legend>
          <LegendDot color={WDS_COLOR_BLUE_200} />
          <TextWrapper>
            <Text variant='bodyS' color={WDS_COLOR_GREY}>
              Psihotropice
            </Text>
            <Text variant='bodyS' color={WDS_COLOR_BLUE_500}>
              {annual?.psycholeptic} PV
            </Text>
          </TextWrapper>
        </Legend>
      </Container>
    </DashboardCard>
  )
}
