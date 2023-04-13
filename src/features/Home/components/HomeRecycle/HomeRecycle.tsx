import { useNavigate } from 'react-router-dom'

import { HeaderWrapper } from 'layout/Header/HeaderWrapper'

import { useCompaniesQuery } from 'features/History/store/api/productApi'
import { RecycleBox } from 'features/Home/components/RecycleBox/RecycleBox'
import { CotentWrapper } from 'features/Home/components/RecycleBox/RecycleBox.styled'
import type { IRecycleBoxProps } from 'features/Home/components/RecycleBox/RecycleBox.type'

import { ContentHome, Title } from './HomeRecycle.styled'

export const HomeRecycle = () => {
  const navigate = useNavigate()
  const handleStatus = (id: string) => {
    navigate(`/status/${id}`)
  }

  const { data } = useCompaniesQuery()

  const convertData = () => {
    return data?.map((element: any) => {
      return {
        id: element.id,
        pharma: element.name,
        quantity: '6 kg',
        status: 'In Progress',
      }
    })
  }

  return (
    <HeaderWrapper>
      <ContentHome>
        <Title>Recent Tasks</Title>
        <CotentWrapper>
          {convertData()?.map((element: IRecycleBoxProps) => {
            return (
              <RecycleBox
                pharma={element.pharma}
                quantity={element.quantity}
                status={element.status}
                callbackOnClick={() => handleStatus(element.id)}
              />
            )
          })}
        </CotentWrapper>
      </ContentHome>
    </HeaderWrapper>
  )
}
