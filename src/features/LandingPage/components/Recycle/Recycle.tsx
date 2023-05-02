import { useNavigate } from 'react-router-dom'

import { Button } from 'common/components/Button/Button'

import { RECYCLE_SECTION } from 'features/LandingPage/constants/constants'

import { RecycleWrapper, SubTitle, Title } from './Recycle.styled'

export const Recycle = () => {
  const navigate = useNavigate()
  return (
    <RecycleWrapper>
      <Title>{RECYCLE_SECTION.TITLE}</Title>
      <SubTitle>{RECYCLE_SECTION.SUB_TITLE}</SubTitle>
      <Button variant='white' onClick={() => navigate('/collect')}>
        {RECYCLE_SECTION.BUTTON}
      </Button>
    </RecycleWrapper>
  )
}
