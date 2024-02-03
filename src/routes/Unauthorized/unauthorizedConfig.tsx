import type { RouteProps } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import { LoginPage } from 'pages/Login'

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
    path: UNAUTHORIZED_PATHS.LOGIN,
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <Navigate to={UNAUTHORIZED_PATHS.LOGIN} replace />,
  },
]
