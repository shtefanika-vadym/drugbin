import { Button } from 'common/components/Button/Button'

import { RECYCLE_SECTION } from 'features/LandingPage/constants/constants'

import { RecycleWrapper, SubTitle, Title } from './Recycle.styled'

export const Recycle = () => {
  return (
    <RecycleWrapper>
      <Title>{RECYCLE_SECTION.TITLE}</Title>
      <SubTitle>{RECYCLE_SECTION.SUB_TITLE}</SubTitle>
      <Button variant='white'>{RECYCLE_SECTION.BUTTON}</Button>
    </RecycleWrapper>
  )
}
