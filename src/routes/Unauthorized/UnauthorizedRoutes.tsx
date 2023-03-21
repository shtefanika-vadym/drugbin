import { Outlet } from 'react-router-dom'

export const UnauthorizedRoutes = () => {
  // if (!user) return <Navigate to={PATHS.LOGIN} />
  return <Outlet />
}
