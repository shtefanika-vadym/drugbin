import { Navigate, Outlet } from 'react-router-dom'

import { withMonitorLocaleStorage } from 'app/hocs/withMonitorLocaleStorage'
import { useAuth } from 'app/providers'

const AuthorizedRoutes = () => {
  const { user } = useAuth()
  if (!user) return <Navigate to='/login' />
  return <Outlet />
}

export default withMonitorLocaleStorage(AuthorizedRoutes)
