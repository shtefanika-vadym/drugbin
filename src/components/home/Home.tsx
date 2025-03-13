import { useGetDashboard } from 'common/hooks/dashboard'
import { ChartDoughnut } from 'components/ui/ChartDoughnut/ChartDoughnut'
import { ChartLine } from 'components/ui/ChartLine/ChartLine'
import { DocumentType } from 'components/ui/DocumentType/DocumentType'
import { StatusType } from 'components/ui/StatusType/StatusType'
import { Text } from 'components/ui/Text/Text'
import { BottomChart, ChartAlign, Container } from './home.styled'

export const Home = () => {
  const { data } = useGetDashboard(2025)

  return (
    <Container>
      <Text variant='titleH4'>Aruncă o privire asupra progresului colectării</Text>
      <ChartLine data={data?.drugs}/>
      <BottomChart>
        <ChartAlign>
          <ChartDoughnut doughnutData={data?.categories} />
          <StatusType statusData={data?.recycle} />
          <DocumentType documentsData={data?.documents} />
        </ChartAlign>
      </BottomChart>
    </Container>
  )
}
