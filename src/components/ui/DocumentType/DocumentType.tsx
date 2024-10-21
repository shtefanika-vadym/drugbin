import { WDS_COLOR_BLUE_500, WDS_COLOR_GREY } from 'common/styles/colors'
import { DocumentChart } from 'common/types/dashboard.types'
import { DashboardCard } from 'components/layout/DashboardCard/DashboardCard'
import { Text } from '../Text/Text'
import { Container, Legend, LegendDot, TextWrapper } from './DocumentType.styled'

interface DocumentTypeProps {
  documentsData: DocumentChart
}

const legendLabel = (type: string, value: number, color = WDS_COLOR_BLUE_500) => {
  return (
    <Legend>
      <LegendDot color={color} />
      <TextWrapper>
        <Text variant='bodyS' color={WDS_COLOR_GREY}>
          {type}
        </Text>
        <Text variant='bodyS' color={WDS_COLOR_BLUE_500}>
          {value} PV
        </Text>
      </TextWrapper>
    </Legend>
  )
}

export const DocumentType: React.FC<DocumentTypeProps> = ({ documentsData }) => {
  const { annual } = documentsData || {}

  return (
    <DashboardCard title='Tip de document'>
      <Container>
        {legendLabel('Uzuale', annual?.common, '#2949A6')}
        {legendLabel('Suplimente', annual?.supplements, '#6A8ECA')}
        {legendLabel('Psihotrope', annual?.psycholeptics, '#FFB3B3')}
        {legendLabel('Insuline', annual?.insulin, '#D5E4F8')}
        {legendLabel('Tăietoare', annual?.injectables, '#B3C4E6')}
        {legendLabel('Inhalatoare', annual?.inhalers, '#AEC5F2')}
        {legendLabel('Citotoxice', annual?.cytototoxic, '#EBF0FB')}
      </Container>
    </DashboardCard>
  )
}
