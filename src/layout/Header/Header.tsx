import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { animateScroll } from 'react-scroll'

import { MobileMenu } from 'layout/MobileMenu/MobileMenu'
import type { INavigation } from 'layout/Paths/Paths'
import {
  NAVIGATION_ITEMS,
  NAVIGATION_ITEMS_RECYCLE,
  NAVIGATION_ITEMS_UNAUTHORIZED,
} from 'layout/Paths/Paths'
import { useLockedBody } from 'usehooks-ts'

// import { useAuth } from 'app/providers'

import logoS from 'common/assets/icons/logo-s.svg'
import logo from 'common/assets/icons/logo.svg'
import menuMobile from 'common/assets/icons/menu-2-fill.svg'
// import userIcon from 'common/assets/icons/user.svg'

import { SelectLanguage } from 'common/components/SelectLanguage/SelectLanguage'
import useBreakpoints from 'common/hooks/useBreakpoints'
import useUserRole from 'common/hooks/useGetUserRole'

import {
  Container,
  ContainerWrapper,
  Dot,
  Logo,
  Navigation,
  NavLink,
  UserIcon,
} from './Header.styled'

export const Header = () => {
  const { isBelowDesktop } = useBreakpoints()
  const { userRole } = useUserRole()
  // const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const handleNavigate = (link: string) => {
    if (userRole === undefined) {
      animateScroll.scrollTo(document.getElementById(link).offsetTop)
      setIsMenuOpen(false)
    } else {
      navigate(link)
    }
  }

  const [isMenuOpen, setIsMenuOpen] = useLockedBody(false)

  const pathByRole = useMemo(() => {
    switch (userRole) {
      case 'pharmacy':
        return NAVIGATION_ITEMS
      case 'recycle':
        return NAVIGATION_ITEMS_RECYCLE
      default:
        return NAVIGATION_ITEMS_UNAUTHORIZED
    }
  }, [userRole])

  return (
    <ContainerWrapper>
      <Container>
        {!isBelowDesktop ? (
          <Navigation>
            {pathByRole.map((navigation: INavigation) => (
              <NavLink
                key={navigation.title}
                isActive={location.pathname === navigation.route}
                onClick={() => handleNavigate(navigation.route)}>
                {navigation.title}
                <Dot isActive={location.pathname === navigation.route} />
              </NavLink>
            ))}
          </Navigation>
        ) : (
          <UserIcon src={menuMobile} onClick={() => setIsMenuOpen(!isMenuOpen)} />
        )}

        <Logo src={!isBelowDesktop ? logo : logoS} onClick={() => navigate('/')} />
        {/* {!isBelowDesktop && (
          <UserWrapper onClick={() => logout()}>
            <Name>DrugBin Solution</Name>
            <UserIcon src={userIcon} alt='user' />
          </UserWrapper>
        )} */}
        {!isBelowDesktop && <SelectLanguage />}
      </Container>
      {isMenuOpen && <MobileMenu isOpen={isMenuOpen} handleOpen={setIsMenuOpen} />}
    </ContainerWrapper>
  )
}
