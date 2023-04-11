import { useLocation, useNavigate } from 'react-router-dom'

import type { INavigation } from 'layout/Paths/Paths'
import { NAVIGATION_ITEMS_RECYCLE } from 'layout/Paths/Paths'
import { NAVIGATION_ITEMS } from 'layout/Paths/Paths'

import logo from 'common/assets/icons/logo.svg'
import userIcon from 'common/assets/images/User.png'

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
  const { userRole } = useUserRole()
  const navigate = useNavigate()
  const location = useLocation()
  const handleNavigate = (link: string) => {
    navigate(link)
  }

  const pathByRole = userRole === 'pharmacy' ? NAVIGATION_ITEMS : NAVIGATION_ITEMS_RECYCLE

  return (
    <ContainerWrapper>
      <Container>
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
        <Logo src={logo} />
        <UserIcon src={userIcon} alt='user' />
      </Container>
    </ContainerWrapper>
  )
}
