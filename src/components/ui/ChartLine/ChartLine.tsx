import { LineChart } from '@mui/x-charts/LineChart'
import { WDS_COLOR_BLUE_400, WDS_COLOR_GREY } from 'common/styles/colors'
import { VolumeChart } from 'common/types/dashboard.types'
import { Text } from 'components/ui/Text/Text'
import React, { useMemo } from 'react'
import { Border, Container, LegendContent } from './ChartLine.styled'

interface ChartLineProps {
  data?: VolumeChart
}

const daysIn = (year: number, month: number) => new Date(year, month, 0).getDate()

/** Per-day collected volume for the current month, with the previous month as a faint reference. */
export const ChartLine: React.FC<ChartLineProps> = ({ data }) => {
  const { days, current, previous } = useMemo(() => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1 // 1..12
    const prevMonth = month === 1 ? 12 : month - 1

    const n = daysIn(year, month)
    const arr = Array.from({ length: n }, (_, i) => i + 1)
    const pick = (m: number) => {
      const byDay = data?.monthlyDetails?.[String(m)] ?? {}
      return arr.map((d) => byDay[String(d)] ?? 0)
    }
    return {
      days: arr,
      current: pick(month),
      previous: prevMonth < month ? pick(prevMonth) : arr.map(() => 0),
    }
  }, [data])

  return (
    <>
      <Container>
        <Text variant='subheading' color={WDS_COLOR_BLUE_400}>
          Medicamente colectate
        </Text>
        <LegendContent>
          <Border />
          <Text variant='bodyXS' color={WDS_COLOR_GREY}>
            Luna anterioară
          </Text>
        </LegendContent>
      </Container>
      <LineChart
        sx={{
          '& .MuiLineElement-root': { strokeWidth: 4 },
          '& .MuiAreaElement-series-main': { fill: "url('#myGradient')" },
          '& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel': { fill: '#A3A6AD' },
          '& .MuiChartsAxis-bottom .MuiChartsAxis-line': { stroke: '#A3A6AD' },
        }}
        xAxis={[{ scaleType: 'point', data: days }]}
        series={[
          { id: 'last', data: previous, area: false, showMark: false, color: '#EBF0FB' },
          { id: 'main', data: current, area: true, showMark: false, color: '#2949A6' },
        ]}
        height={270}>
        <defs>
          <linearGradient id='myGradient' gradientTransform='rotate(90)'>
            <stop offset='0%' stopColor='rgba(214, 238, 255, 0.61)' />
            <stop offset='100%' stopColor='rgba(217, 217, 217, 0.00)' />
          </linearGradient>
        </defs>
      </LineChart>
    </>
  )
}
