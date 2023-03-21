import type { RouteProps } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import { Home } from 'features/Home'

enum UNCONFIRMED_ROUTES {
  HOME = 'HOME',
}

const UNCONFIRMED_PATHS: Record<UNCONFIRMED_ROUTES, string> = {
  [UNCONFIRMED_ROUTES.HOME]: '/home',
}

export const UNCONFIRMED_ROUTE_CONFIG: RouteProps[] = [
  {
    path: UNCONFIRMED_PATHS.HOME,
    element: <Home />,
  },

  {
    path: '*',
    element: <Navigate to={UNCONFIRMED_PATHS.HOME} replace />,
  },
]
