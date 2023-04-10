import type { RouteProps } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import { AddNew } from 'features/AddNew/pages/AddNew'
import { History } from 'features/History/pages/History'
import { Home } from 'features/Home'

enum AUTHORIZED_PATH {
  HOME = 'HOME',
  HISTORY = 'HISTORY',
  DOCUMENTS = 'DOCUMENTS',
  DONATIONS = 'DONATIONS',
  ADD = 'ADD',
}

const AUTHORIZED_PATHS: Record<AUTHORIZED_PATH, string> = {
  [AUTHORIZED_PATH.HOME]: '/home',
  [AUTHORIZED_PATH.HOME]: '/home',
  [AUTHORIZED_PATH.HISTORY]: '/history',
  [AUTHORIZED_PATH.DOCUMENTS]: '/documents',
  [AUTHORIZED_PATH.DONATIONS]: '/donations',
  [AUTHORIZED_PATH.ADD]: '/add-new',
}

export const AUTHORIZED_ROUTE_CONFIG: RouteProps[] = [
  {
    path: AUTHORIZED_PATHS.HOME,
    element: <Home />,
  },
  {
    path: AUTHORIZED_PATH.HISTORY,
    element: <History />,
  },
  {
    path: AUTHORIZED_PATH.DOCUMENTS,
    element: <Home />,
  },
  {
    path: AUTHORIZED_PATH.DONATIONS,
    element: <Home />,
  },
  {
    path: AUTHORIZED_PATH.ADD,
    element: <AddNew />,
  },
  {
    path: '*',
    element: <Navigate to={AUTHORIZED_PATHS.HOME} replace />,
  },
]
