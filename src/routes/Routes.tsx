import type { RouteProps } from 'react-router-dom'
import { Route, Routes as ReactRoutes } from 'react-router-dom'

import { UnauthorizedRoutes } from 'routes/Unauthorized/UnauthorizedRoutes'
import { useAppRoutes } from 'routes/useAppRoutes'

import AuthorizedRoutes from './Authorized/AuthorizedRoutes'

export const Routes = () => {
  const { authorized, unauthorized } = useAppRoutes()
  return (
    <ReactRoutes>
      <Route element={<AuthorizedRoutes />}>
        {authorized.map(
          (route: RouteProps, index: number): JSX.Element => (
            <Route key={index} {...route} />
          ),
        )}
      </Route>
      <Route element={<UnauthorizedRoutes />}>
        {unauthorized.map(
          (route: RouteProps, index: number): JSX.Element => (
            <Route key={index} {...route} />
          ),
        )}
      </Route>
    </ReactRoutes>
  )
}
