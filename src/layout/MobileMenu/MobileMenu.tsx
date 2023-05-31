import type { FC } from 'react'
import { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router-dom'
import { animateScroll } from 'react-scroll'

import { useOnClickOutside } from 'usehooks-ts'

import aboutIcon from 'common/assets/icons/about.svg'
import contactIcon from 'common/assets/icons/contact.svg'
// import recycleIcon from 'common/assets/icons/recycle.svg'
import serviceIcon from 'common/assets/icons/service.svg'

import { Button } from 'common/components/Button/Button'
import { SelectLanguage } from 'common/components/SelectLanguage/SelectLanguage'

import {
  BorderStyle,
  Icon,
  ItemWrapper,
  LanguageContainer,
  MenuContent,
  MenuWrapper,
  Text,
  Title,
} from './MobileMenu.styled'

export interface MobileMenuProps {
  isOpen: boolean
  handleOpen: (isOpen: boolean) => void
}

export const MobileMenu: FC<MobileMenuProps> = ({ isOpen, handleOpen }) => {
  const topNavRef = useRef<HTMLElement | null>(null)
  // const navigate = useNavigate()
  const { t } = useTranslation()

  const handleDropdown = useCallback(() => {
    handleOpen(!isOpen)
  }, [isOpen, handleOpen])

  const handleNavigate = (link: string) => {
    animateScroll.scrollTo(document.getElementById(link).offsetTop)
    handleOpen(false)
  }

  useOnClickOutside(topNavRef, handleDropdown)

  return (
    <MenuWrapper>
      <MenuContent ref={topNavRef}>
        <LanguageContainer>
          <Title>Menu</Title>
          <SelectLanguage />
        </LanguageContainer>
        {/* <ItemWrapper onClick={() => navigate('/collect')}>
          <Icon src={recycleIcon} />
          <Text>{t('navigation.collect')}</Text>
        </ItemWrapper> */}
        <ItemWrapper onClick={() => handleNavigate('about-us')}>
          <Icon src={aboutIcon} />
          <Text>{t('navigation.about')}</Text>
        </ItemWrapper>
        <ItemWrapper onClick={() => handleNavigate('services')}>
          <Icon src={serviceIcon} />
          <Text>{t('navigation.services')}</Text>
        </ItemWrapper>
        <ItemWrapper onClick={() => handleNavigate('contact')}>
          <Icon src={contactIcon} />
          <Text>{t('navigation.contact')}</Text>
        </ItemWrapper>
        <BorderStyle />
        <Button variant='empty' onClick={handleDropdown}>
          {t('button.cancel')}
        </Button>
      </MenuContent>
    </MenuWrapper>
  )
}
