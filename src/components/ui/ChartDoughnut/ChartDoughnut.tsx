import { PieChart } from '@mui/x-charts/PieChart'
import { useDrawingArea } from '@mui/x-charts/hooks'
import { TypesChart } from 'common/interfaces/Dashboard'
import {
  WDS_COLOR_BLACK,
  WDS_COLOR_BLUE_100,
  WDS_COLOR_BLUE_200,
  WDS_COLOR_BLUE_400,
  WDS_COLOR_GREY,
} from 'common/style/colors'
import { getDoughnutTotal, getValueByLabel } from 'common/utils/dashboard'
import { DashboardCard } from 'components/layout/DashboardCard/DashboardCard'
import { Text } from 'components/ui/Text/Text'
import { useMemo } from 'react'
import styled from 'styled-components'
import {
  Container,
  DoughnutBackgorund,
  LegendStyles,
  LegendWrapper,
  Line,
} from './ChartDoughnut.styled'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledText = styled('text')(({ theme }) => ({
  fill: WDS_COLOR_BLACK,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 16,
  fontWeight: 'bold',
}))

const PieCenterLabel: React.FC<{ total: number }> = ({ total }) => {
  const { width, height, left, top } = useDrawingArea()
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {total}
    </StyledText>
  )
}

interface ChartDoughnutProps {
  doughnutData: TypesChart
}

export const ChartDoughnut: React.FC<ChartDoughnutProps> = ({ doughnutData }) => {
  const data = [
    { value: getValueByLabel('Rx', doughnutData), label: 'RX', color: '#2949A6' },
    { value: getValueByLabel('OTC', doughnutData), label: 'OTC', color: '#EBF0FB' },
    { value: getValueByLabel('P6L', doughnutData), label: 'Supliment', color: '#AEC5F2' },
  ]

  const totalValue = useMemo(() => getDoughnutTotal(doughnutData), [doughnutData])

  return (
    <DashboardCard title='Tip de medicament'>
      <Container>
        <DoughnutBackgorund>
          <PieChart
            series={[
              {
                data,
                innerRadius: 50,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: WDS_COLOR_GREY },
              },
            ]}
            margin={{ right: 0 }}
            slotProps={{
              legend: { hidden: true },
            }}
            height={190}>
            <PieCenterLabel total={totalValue} />
          </PieChart>
        </DoughnutBackgorund>
        <LegendWrapper>
          <LegendStyles>
            <Line color={WDS_COLOR_BLUE_400} />
            <Text textVariant='bodyS'>RX</Text>
          </LegendStyles>
          <LegendStyles>
            <Line color={WDS_COLOR_BLUE_200} />
            <Text textVariant='bodyS'>Supliment</Text>
          </LegendStyles>
          <LegendStyles>
            <Line color={WDS_COLOR_BLUE_100} />
            <Text textVariant='bodyS'>OTC</Text>
          </LegendStyles>
        </LegendWrapper>
      </Container>
    </DashboardCard>
  )
}
