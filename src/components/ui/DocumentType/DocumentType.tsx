import { WDS_COLOR_BLUE_200, WDS_COLOR_BLUE_300, WDS_COLOR_BLUE_500, WDS_COLOR_GREY } from 'common/style/colors'
import { DashboardCard } from 'components/layout/DashboardCard/DashboardCard'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import { Text } from '../Text/Text'
import { Container, Legend, LegendDot, TextWrapper } from './DocumentType.styled'

export const DocumentType = () => {
  return (
    <DashboardCard title='Tip de document'>
      <Container>
        <ProgressBar name={'Documente'} value={916} progress={68} />
        <Legend>
          <LegendDot color={WDS_COLOR_BLUE_300} />
          <TextWrapper>
            <Text textVariant='bodyS' color={WDS_COLOR_GREY}>
              Normale
            </Text>
            <Text textVariant='bodyS' color={WDS_COLOR_BLUE_500}>
              594 PV
            </Text>
          </TextWrapper>
        </Legend>
        <Legend>
          <LegendDot color={WDS_COLOR_BLUE_200} />
          <TextWrapper>
            <Text textVariant='bodyS' color={WDS_COLOR_GREY}>
              Psihotropice
            </Text>
            <Text textVariant='bodyS' color={WDS_COLOR_BLUE_500}>
              322 PV
            </Text>
          </TextWrapper>
        </Legend>
      </Container>
    </DashboardCard>
  )
}
