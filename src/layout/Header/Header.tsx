import { useLocation, useNavigate } from 'react-router-dom'

import type { INavigation } from 'layout/Paths/Paths'
import { NAVIGATION_ITEMS } from 'layout/Paths/Paths'

import userIcon from 'common/assets/images/User.png'

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
  const navigate = useNavigate()
  const location = useLocation()
  const handleNavigate = (link: string) => {
    navigate(link)
  }
  return (
    <ContainerWrapper>
      <Container>
        <Navigation>
          {NAVIGATION_ITEMS.map((navigation: INavigation) => (
            <NavLink
              isActive={location.pathname === navigation.route}
              onClick={() => handleNavigate(navigation.route)}>
              {navigation.title}
              <Dot isActive={location.pathname === navigation.route} />
            </NavLink>
          ))}
        </Navigation>
        <Logo>DrugBin</Logo>
        <UserIcon src={userIcon} alt='user' />
      </Container>
    </ContainerWrapper>
  )
}
