import { useAuthState } from 'common/state/auth.state'
import { getLastElement } from 'common/utils/utils'
import { Header } from 'components/layout/Header'
import { UserActions } from 'components/ui/UserActions/UserActions'
import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Dot, Logo, NavLink, Navigation } from './TopBlock.styled'

interface NavItem {
  label: string
  route: string
  isActive: (path: string) => boolean
}

const last = (path: string) => getLastElement(path)

const HOSPITAL_NAV: NavItem[] = [
  { label: 'Statistici', route: '/', isActive: (p) => p === '/' },
  { label: 'Gestionare', route: '/gestionare', isActive: (p) => last(p) === 'gestionare' },
  {
    label: 'Documente',
    route: '/documents/verbal-process',
    isActive: (p) =>
      ['verbal-process', 'psychotropic', 'shared', 'trash'].includes(last(p) as string),
  },
]

const ADMIN_NAV: NavItem[] = [
  { label: 'Spitale', route: '/admin/spitale', isActive: (p) => last(p) === 'spitale' },
  { label: 'Roboți', route: '/admin/roboti', isActive: (p) => last(p) === 'roboti' },
  {
    label: 'Clasificări',
    route: '/admin/clasificari',
    isActive: (p) => p.startsWith('/admin/clasificari'),
  },
]

export const TopBlock = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const role = useAuthState((s) => s.role)

  const items = role === 'admin' ? ADMIN_NAV : HOSPITAL_NAV
  const home = role === 'admin' ? '/admin/spitale' : '/'

  const go = useCallback((route: string) => navigate(route), [navigate])

  return (
    <Header>
      <Container>
        <Navigation>
          {items.map((item) => {
            const active = item.isActive(location.pathname)
            return (
              <NavLink key={item.route} isActive={active} onClick={() => go(item.route)}>
                {item.label}
                <Dot isActive={active} />
              </NavLink>
            )
          })}
        </Navigation>
        <Logo onClick={() => go(home)} />
        <UserActions />
      </Container>
    </Header>
  )
}
