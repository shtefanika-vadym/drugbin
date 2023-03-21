import type { RouteProps } from 'react-router-dom'
import { Route, Routes as ReactRoutes } from 'react-router-dom'

import { UNCONFIRMED_ROUTE_CONFIG } from 'routes/Unauthorized/unauthorizedConfig'
import { UnauthorizedRoutes } from 'routes/Unauthorized/UnauthorizedRoutes'

export const Routes = () => {
  return (
    <ReactRoutes>
      <Route element={<UnauthorizedRoutes />}>
        {UNCONFIRMED_ROUTE_CONFIG.map(
          (route: RouteProps, index: number): JSX.Element => (
            <Route key={index} {...route} />
          ),
        )}
      </Route>
    </ReactRoutes>
  )
}
