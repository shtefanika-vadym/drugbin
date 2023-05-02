import { useNavigate } from 'react-router-dom'

import { HeaderWrapper } from 'layout/Header/HeaderWrapper'

import first from 'features/LandingPage/assets/first.jpg'

import { Button } from 'common/components/Button/Button'

import { Contact } from 'features/LandingPage/components/Contact/Contact'
import { Recycle } from 'features/LandingPage/components/Recycle/Recycle'
import { Services } from 'features/LandingPage/components/Services/Services'
import { LANDING_SECTION } from 'features/LandingPage/constants/constants'

import { Icon, Join, Section, SubTitle, Title, Wrapper } from './LandingPage.styled'

export const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <HeaderWrapper>
      <Wrapper>
        <Section id='about-us'>
          <Title>{LANDING_SECTION.TITLE}</Title>
          <SubTitle>{LANDING_SECTION.SUB_TITLE}</SubTitle>
          <Join>{LANDING_SECTION.JOIN}</Join>
          <Button onClick={() => navigate('/collect')}>{LANDING_SECTION.BUTTON}</Button>
          <Icon src={first} />
        </Section>
        <Services id='services' />
        <Recycle />
        <Contact id='contact' />
      </Wrapper>
    </HeaderWrapper>
  )
}
