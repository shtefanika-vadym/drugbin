import type { RouteProps } from 'react-router-dom'
import { Route, Routes as ReactRoutes } from 'react-router-dom'

import { UNAUTHORIZED_ROUTE_CONFIG } from 'routes/Unauthorized/unauthorizedConfig'
import { UnauthorizedRoutes } from 'routes/Unauthorized/UnauthorizedRoutes'

import { AUTHORIZED_ROUTE_CONFIG } from './Authorized/authorizedConfig'
import AuthorizedRoutes from './Authorized/AuthorizedRoutes'

export const Routes = () => {
  return (
    <ReactRoutes>
      <Route element={<AuthorizedRoutes />}>
        {AUTHORIZED_ROUTE_CONFIG.map(
          (route: RouteProps, index: number): JSX.Element => (
            <Route key={index} {...route} />
          ),
        )}
      </Route>
      <Route element={<UnauthorizedRoutes />}>
        {UNAUTHORIZED_ROUTE_CONFIG.map(
          (route: RouteProps, index: number): JSX.Element => (
            <Route key={index} {...route} />
          ),
        )}
      </Route>
    </ReactRoutes>
  )
}
