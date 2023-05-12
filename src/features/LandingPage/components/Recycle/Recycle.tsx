import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Button } from 'common/components/Button/Button'

import { RecycleWrapper, SubTitle, Title } from './Recycle.styled'

export const Recycle = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
    <RecycleWrapper>
      <Title>{t('landing_page.collect_title')}</Title>
      <SubTitle>{t('landing_page.collect_description')}</SubTitle>
      <Button variant='white' onClick={() => navigate('/collect')}>
        {t('button.collect')}
      </Button>
    </RecycleWrapper>
  )
}
