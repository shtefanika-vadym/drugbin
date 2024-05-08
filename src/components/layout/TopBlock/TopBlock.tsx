import { getLastElement } from 'common/utils/utils'
import { Header } from 'components/layout/Header'
import { LogoIcon } from 'components/ui/Icon'
import { UserActions } from 'components/ui/UserActions/UserActions'
import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Dot, NavLink, Navigation } from './TopBlock.styled'

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
        <LogoIcon onClick={handleNavigate} />
        <UserActions />
      </Container>
    </Header>
  )
}
