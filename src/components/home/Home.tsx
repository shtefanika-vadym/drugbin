import { useGetDashboardQuery } from 'api/dashboard'
import { ChartDoughnut } from 'components/ui/ChartDoughnut/ChartDoughnut'
import { ChartLine } from 'components/ui/ChartLine/ChartLine'
import { DocumentType } from 'components/ui/DocumentType/DocumentType'
import { StatusType } from 'components/ui/StatusType/StatusType'
import { Text } from 'components/ui/Text/Text'
import { BottomChart, ChartAlign, Container } from './home.styled'

export const Home = () => {
  const { data } = useGetDashboardQuery(2024)

  return (
    <Container>
      <Text textVariant='titleH4'>Aruncă o privire asupra progresului colectării</Text>
      <ChartLine />
      <BottomChart>
        <ChartAlign>
          <ChartDoughnut doughnutData={data?.types} />
          <StatusType />
          <DocumentType documentsData={data?.documents} />
        </ChartAlign>
      </BottomChart>
    </Container>
  )
}
