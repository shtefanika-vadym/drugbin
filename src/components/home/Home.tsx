import { useGetDashboard } from 'common/hooks/dashboard'
import { ChartDoughnut } from 'components/ui/ChartDoughnut/ChartDoughnut'
import { ChartLine } from 'components/ui/ChartLine/ChartLine'
import { DocumentType } from 'components/ui/DocumentType/DocumentType'
import { Text } from 'components/ui/Text/Text'
import { BottomChart, ChartAlign, Container } from './home.styled'

export const Home = () => {
  const { data } = useGetDashboard(new Date().getFullYear())

  return (
    <Container>
      <Text variant='titleH4'>Aruncă o privire asupra progresului colectării</Text>
      <ChartLine data={data?.volume} />
      <BottomChart>
        <ChartAlign>
          <ChartDoughnut doughnutData={data?.categories} />
          <DocumentType documentsData={data?.documents} />
        </ChartAlign>
      </BottomChart>
    </Container>
  )
}
