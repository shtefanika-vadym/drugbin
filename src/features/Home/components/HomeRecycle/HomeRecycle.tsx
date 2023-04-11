import { useNavigate } from 'react-router-dom'

import { HeaderWrapper } from 'layout/Header/HeaderWrapper'

import { RecycleBox } from 'features/Home/components/RecycleBox/RecycleBox'
import { CotentWrapper } from 'features/Home/components/RecycleBox/RecycleBox.styled'
import type { IRecycleBoxProps } from 'features/Home/components/RecycleBox/RecycleBox.type'

import { ContentHome, Title } from './HomeRecycle.styled'

const RECYCLE_BOX = [
  {
    id: 'aaa',
    pharma: 'Farmacia Ropharma',
    quantity: '6 kg',
    status: 'In Progress',
  },
  {
    id: '2',
    pharma: 'Farmacia Ropharma',
    quantity: '6 kg',
    status: 'In Progress',
  },
  {
    id: '3',
    pharma: 'Farmacia Ropharma',
    quantity: '6 kg',
    status: 'In Progress',
  },
]

export const HomeRecycle = () => {
  const navigate = useNavigate()
  const handleStatus = (id: string) => {
    navigate(`/status/${id}`)
  }

  return (
    <HeaderWrapper>
      <ContentHome>
        <Title>Recent Tasks</Title>
        <CotentWrapper>
          {RECYCLE_BOX.map((element: IRecycleBoxProps) => {
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
