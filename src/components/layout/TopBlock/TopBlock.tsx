import { Header } from 'components/layout/Header'
import { Dot, Logo, NavLink, Navigation, Container } from './TopBlock.styled'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { lowerCase } from 'lodash-es'
import logo from 'common/assets/logo.svg'
import { SelectLanguage } from 'components/ui/SelectLanguage/SelectLanguage'

interface NavItemProps {
  children: string
}

export const TopBlock = () => {
  const navigate = useNavigate()
  const handleNavigate = () => navigate('/')

  return (
    <Header>
      <Container>
        <Navigation>
          <NavItem>Home</NavItem>
          <NavItem>History</NavItem>
          <NavItem>Documents</NavItem>
        </Navigation>
        <Logo src={logo} onClick={handleNavigate} />
        <SelectLanguage />
      </Container>
    </Header>
  )
}

const NavItem: React.FC<NavItemProps> = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const link = `/${lowerCase(children)}`

  const handleNavigate = useCallback((link: string) => {
    navigate(link)
  }, [])

  return (
    <NavLink isActive={location.pathname === link} onClick={() => handleNavigate(link)}>
      {children}
      <Dot isActive={location.pathname === link} />
    </NavLink>
  )
}
