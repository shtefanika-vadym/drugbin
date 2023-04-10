import type { RouteProps } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import { AuthLogin } from 'features/Auth'

enum UNAUTHORIZED_ROUTES {
  LOGIN = 'LOGIN',
}

const UNAUTHORIZED_PATHS: Record<UNAUTHORIZED_ROUTES, string> = {
  [UNAUTHORIZED_ROUTES.LOGIN]: '/login',
}

export const UNAUTHORIZED_ROUTE_CONFIG: RouteProps[] = [
  {
    path: UNAUTHORIZED_PATHS.LOGIN,
    element: <AuthLogin />,
  },
  {
    path: '*',
    element: <Navigate to={UNAUTHORIZED_PATHS.LOGIN} replace />,
  },
]
