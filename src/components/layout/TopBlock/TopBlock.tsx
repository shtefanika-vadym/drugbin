import logo from 'common/assets/logo.svg'
import { Header } from 'components/layout/Header'
import { SelectLanguage } from 'components/ui/SelectLanguage/SelectLanguage'
import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Dot, Logo, NavLink, Navigation } from './TopBlock.styled'
import { getLastElement } from 'common/utils/utils'

// TODO --> REFACTORING
export const TopBlock = () => {
  const navigate = useNavigate()
  const handleNavigate = () => navigate('/')
  const location = useLocation()

  const handleNavigateTo = useCallback((link: string) => {
    navigate(link)
  }, [])

  const isActiveHistory = (path: string) => {
    if (getLastElement(path) === 'collect' || getLastElement(path) === 'all') return true
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
            Home
            <Dot isActive={location.pathname === '/'} />
          </NavLink>
          <NavLink
            isActive={isActiveHistory(location.pathname)}
            onClick={() => handleNavigateTo('/history/collect')}>
            History
            <Dot isActive={isActiveHistory(location.pathname)} />
          </NavLink>
          <NavLink
            isActive={isActiveDocuments(location.pathname)}
            onClick={() => handleNavigateTo('/documents/verbal-process')}>
            Documents
            <Dot isActive={isActiveDocuments(location.pathname)} />
          </NavLink>
        </Navigation>
        <Logo src={logo} onClick={handleNavigate} />
        <SelectLanguage />
      </Container>
    </Header>
  )
}
