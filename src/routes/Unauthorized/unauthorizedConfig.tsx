import type { RouteProps } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import { AuthLogin } from 'features/Auth'
import { Collect } from 'features/Collect/pages/Collect'
import { LandingPage } from 'features/LandingPage/pages/LandingPage'

enum UNAUTHORIZED_ROUTES {
  LOGIN = 'LOGIN',
  LANDING_PAGE = 'LANDING PAGE',
  COLLECT = 'COLLECT',
}

const UNAUTHORIZED_PATHS: Record<UNAUTHORIZED_ROUTES, string> = {
  [UNAUTHORIZED_ROUTES.LOGIN]: '/login',
  [UNAUTHORIZED_ROUTES.LANDING_PAGE]: '/',
  [UNAUTHORIZED_ROUTES.COLLECT]: '/collect',
}

export const UNAUTHORIZED_ROUTE_CONFIG: RouteProps[] = [
  {
    path: UNAUTHORIZED_PATHS['LANDING PAGE'],
    element: <LandingPage />,
  },
  {
    path: UNAUTHORIZED_PATHS.LOGIN,
    element: <AuthLogin />,
  },
  {
    path: UNAUTHORIZED_PATHS['LANDING PAGE'],
    element: <LandingPage />,
  },
  {
    path: UNAUTHORIZED_PATHS.COLLECT,
    element: <Collect />,
  },
  {
    path: '*',
    element: <Navigate to={UNAUTHORIZED_PATHS.LOGIN} replace />,
  },
]
