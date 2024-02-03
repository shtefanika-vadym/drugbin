import type { RouteProps } from 'react-router-dom'
import { Routes as ReactRoutes, Route } from 'react-router-dom'

import { UnauthorizedRoutes } from 'routes/Unauthorized/UnauthorizedRoutes'
import AuthorizedRoutes from './Authorized/AuthorizedRoutes'
import { AUTHORIZED_ROUTE_CONFIG } from './Authorized/authorizedConfig'
import { UNAUTHORIZED_ROUTE_CONFIG } from './Unauthorized/unauthorizedConfig'

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
