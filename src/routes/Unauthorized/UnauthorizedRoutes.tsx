import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from 'app/providers'

export const UnauthorizedRoutes = () => {
  const { user } = useAuth()
  if (user) return <Navigate to='/home' />
  return <Outlet />
}
