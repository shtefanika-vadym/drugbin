import { PieChart } from '@mui/x-charts/PieChart'
import { useDrawingArea } from '@mui/x-charts/hooks'
import {
  WDS_COLOR_BLACK,
  WDS_COLOR_GREY
} from 'common/styles/colors'
import { CategoriesChart } from 'common/types/dashboard.types'
import { getDoughnutTotal, getValueByLabel } from 'common/utils/dashboard'
import { categoryLabels } from 'common/utils/utils'
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
  doughnutData: CategoriesChart
}

export const ChartDoughnut: React.FC<ChartDoughnutProps> = ({ doughnutData }) => {
  const data = [
    { value: getValueByLabel(1, doughnutData), label: categoryLabels[1], color: '#EBF0FB' },
    { value: getValueByLabel(2, doughnutData), label: categoryLabels[2], color: '#AEC5F2' },
    { value: getValueByLabel(3, doughnutData), label: categoryLabels[3], color: '#B3C4E6' },
    { value: getValueByLabel(4, doughnutData), label: categoryLabels[4], color: '#D5E4F8' },
    { value: getValueByLabel(5, doughnutData), label: categoryLabels[5], color: '#2949A6' },
    { value: getValueByLabel(6, doughnutData), label: categoryLabels[6], color: '#6A8ECA' },
    { value: getValueByLabel(7, doughnutData), label: categoryLabels[7], color: '#FFB3B3' },
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
            <Line color='#EBF0FB' />
            <Text variant='bodyXS'>Citotoxice</Text>
          </LegendStyles>
          <LegendStyles>
            <Line color='#AEC5F2' />
            <Text variant='bodyXS'>{categoryLabels[2]}</Text>
          </LegendStyles>
          <LegendStyles>
            <Line color='#B3C4E6' />
            <Text variant='bodyXS'>Tăietoare</Text>
          </LegendStyles>
          <LegendStyles>
            <Line color='#D5E4F8' />
            <Text variant='bodyXS'>{categoryLabels[4]}</Text>
          </LegendStyles>
          <LegendStyles>
            <Line color='#2949A6' />
            <Text variant='bodyXS'>Uzuale</Text>
          </LegendStyles>
          <LegendStyles>
            <Line color='#6A8ECA' />
            <Text variant='bodyXS'>{categoryLabels[6]}</Text>
          </LegendStyles>
          <LegendStyles>
            <Line color='#FFB3B3' />
            <Text variant='bodyXS'>{categoryLabels[7]}</Text>
          </LegendStyles>
        </LegendWrapper>
      </Container>
    </DashboardCard>
  )
}
