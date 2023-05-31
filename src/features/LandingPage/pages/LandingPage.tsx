import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router-dom's

import { HeaderWrapper } from 'layout/Header/HeaderWrapper'

import first from 'features/LandingPage/assets/first.jpg'

// import { Button } from 'common/components/Button/Button'

import { Contact } from 'features/LandingPage/components/Contact/Contact'
import { Recycle } from 'features/LandingPage/components/Recycle/Recycle'
import { Services } from 'features/LandingPage/components/Services/Services'

import { Icon, Join, Section, SubTitle, Title, Wrapper } from './LandingPage.styled'

export const LandingPage = () => {
  // const navigate = useNavigate()
  const { t } = useTranslation()
  const isRO = localStorage?.getItem('selectedLanguage') === `"ro"`

  return (
    <HeaderWrapper>
      <Wrapper>
        <Section id='about-us'>
          <Title>{t('landing_page.about_title')}</Title>
          <SubTitle>{t('landing_page.about_description')}</SubTitle>
          {!isRO ? <Join>{t('landing_page.about_join')}</Join> : null}
          {/* <Button onClick={() => navigate('/collect')}>{t('button.collect')}</Button> */}
          <Icon src={first} />
        </Section>
        <Services id='services' />
        <Recycle />
        <Contact id='contact' />
      </Wrapper>
    </HeaderWrapper>
  )
}
