import type { FC } from 'react'
import { useCallback, useRef } from 'react'
import { animateScroll } from 'react-scroll'

import { useOnClickOutside } from 'usehooks-ts'

import aboutIcon from 'common/assets/icons/about.svg'
import contactIcon from 'common/assets/icons/contact.svg'
import recycleIcon from 'common/assets/icons/recycle.svg'
import serviceIcon from 'common/assets/icons/service.svg'

import { Button } from 'common/components/Button/Button'

import {
  BorderStyle,
  Icon,
  ItemWrapper,
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
        <Title>Menu</Title>
        <ItemWrapper onClick={() => handleNavigate('recycle')}>
          <Icon src={recycleIcon} />
          <Text>Recycle</Text>
        </ItemWrapper>
        <ItemWrapper onClick={() => handleNavigate('about-us')}>
          <Icon src={aboutIcon} />
          <Text>About us</Text>
        </ItemWrapper>
        <ItemWrapper onClick={() => handleNavigate('services')}>
          <Icon src={serviceIcon} />
          <Text>Services</Text>
        </ItemWrapper>
        <ItemWrapper onClick={() => handleNavigate('contact')}>
          <Icon src={contactIcon} />
          <Text>Contact</Text>
        </ItemWrapper>
        <BorderStyle />
        <Button variant='empty' onClick={handleDropdown}>
          Cancel
        </Button>
      </MenuContent>
    </MenuWrapper>
  )
}
