import { LineChart } from '@mui/x-charts/LineChart'
import { WDS_COLOR_BLUE_400, WDS_COLOR_GREY } from 'common/style/colors'
import { Text } from 'components/ui/Text/Text'
import { Border, Container, LegendContent } from './ChartLine.styled'

export const ChartLine = () => {
  return (
    <>
      <Container>
        <Text textVariant='subheading' color={WDS_COLOR_BLUE_400}>
          Medicamente colectate
        </Text>
        <LegendContent>
          <Border />
          <Text textVariant='bodyXS' color={WDS_COLOR_GREY}>
            Luna anterioară
          </Text>
        </LegendContent>
      </Container>
      <LineChart
        sx={{
          '& .MuiLineElement-root': {
            strokeWidth: 4,
          },
          '& .MuiAreaElement-series-main': {
            fill: "url('#myGradient')",
          },
          '& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel': {
            fill: '#A3A6AD',
          },
          '& .MuiChartsAxis-bottom .MuiChartsAxis-line': {
            stroke: '#A3A6AD',
          },
        }}
        xAxis={[{ scaleType: 'point', data: [1, 5, 10, 15, 20, 25, 30] }]}
        series={[
          {
            id: 'last',
            data: [180, 90, 145, 190, 150, 90, 120],
            area: false,
            showMark: false,
            color: '#EBF0FB',
          },
          {
            id: 'main',
            data: [90, 180, 125, 140, 180, 120, 180],
            area: true,
            showMark: false,
            color: '#2949A6',
          },
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
