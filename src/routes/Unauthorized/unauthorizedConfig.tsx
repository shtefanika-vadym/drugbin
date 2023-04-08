import type { RouteProps } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import { AddNew } from 'features/AddNew/pages/AddNew'
import { History } from 'features/History/pages/History'
import { Home } from 'features/Home'

enum UNCONFIRMED_ROUTES {
  HOME = 'HOME',
  HISTORY = 'HISTORY',
  DOCUMENTS = 'DOCUMENTS',
  DONATIONS = 'DONATIONS',
  ADD = 'ADD',
}

const UNCONFIRMED_PATHS: Record<UNCONFIRMED_ROUTES, string> = {
  [UNCONFIRMED_ROUTES.HOME]: '/home',
  [UNCONFIRMED_ROUTES.HISTORY]: '/history',
  [UNCONFIRMED_ROUTES.DOCUMENTS]: '/documents',
  [UNCONFIRMED_ROUTES.DONATIONS]: '/donations',
  [UNCONFIRMED_ROUTES.ADD]: '/add-new',
}

export const UNCONFIRMED_ROUTE_CONFIG: RouteProps[] = [
  {
    path: UNCONFIRMED_PATHS.HOME,
    element: <Home />,
  },
  {
    path: UNCONFIRMED_PATHS.HISTORY,
    element: <History />,
  },
  {
    path: UNCONFIRMED_PATHS.DOCUMENTS,
    element: <Home />,
  },
  {
    path: UNCONFIRMED_PATHS.DONATIONS,
    element: <Home />,
  },
  {
    path: UNCONFIRMED_PATHS.ADD,
    element: <AddNew />,
  },
  {
    path: '*',
    element: <Navigate to={UNCONFIRMED_PATHS.HOME} replace />,
  },
]
