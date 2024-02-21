import logo from 'common/assets/logo.svg'
import { getLastElement } from 'common/utils/utils'
import { Header } from 'components/layout/Header'
import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Dot, Logo, NavLink, Navigation } from './TopBlock.styled'
import { UserActions } from 'components/ui/UserActions/UserActions'

// TODO --> REFACTORING
export const TopBlock = () => {
  const navigate = useNavigate()
  const handleNavigate = () => navigate('/')
  const location = useLocation()

  const handleNavigateTo = useCallback(
    (link: string) => {
      navigate(link)
    },
    [navigate],
  )

  const isActiveHistory = (path: string) => {
    if (getLastElement(path) === 'gestionare') return true
  }

  const isActiveDocuments = (path: string) => {
    if (
      getLastElement(path) === 'verbal-process' ||
      getLastElement(path) === 'psychotropic' ||
      getLastElement(path) === 'shared' ||
      getLastElement(path) === 'trash'
    )
      return true
  }

  return (
    <Header>
      <Container>
        <Navigation>
          <NavLink isActive={location.pathname === '/'} onClick={() => handleNavigateTo('/')}>
            Statistici
            <Dot isActive={location.pathname === '/'} />
          </NavLink>
          <NavLink
            isActive={isActiveHistory(location.pathname)}
            onClick={() => handleNavigateTo('/gestionare')}>
            Gestionare
            <Dot isActive={isActiveHistory(location.pathname)} />
          </NavLink>
          <NavLink
            isActive={isActiveDocuments(location.pathname)}
            onClick={() => handleNavigateTo('/documents/verbal-process')}>
            Documente
            <Dot isActive={isActiveDocuments(location.pathname)} />
          </NavLink>
        </Navigation>
        <Logo src={logo} onClick={handleNavigate} />
        <UserActions />
      </Container>
    </Header>
  )
}
