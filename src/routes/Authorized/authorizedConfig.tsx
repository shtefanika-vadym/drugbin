// import type { RouteProps } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import { AddNew } from 'features/AddNew/pages/AddNew'
import { History } from 'features/History/pages/History'
import { Home } from 'features/Home'
import { Status } from 'features/Status/pages/Status'

enum AUTHORIZED_PATH {
  HOME = 'HOME',
  HISTORY = 'HISTORY',
  DOCUMENTS = 'DOCUMENTS',
  DONATIONS = 'DONATIONS',
  ADD = 'ADD',
  STATUS = 'STATUS',
}

const AUTHORIZED_PATHS: Record<AUTHORIZED_PATH, string> = {
  [AUTHORIZED_PATH.HOME]: '/home',
  [AUTHORIZED_PATH.HISTORY]: '/history',
  [AUTHORIZED_PATH.DOCUMENTS]: '/documents',
  [AUTHORIZED_PATH.DONATIONS]: '/donations',
  [AUTHORIZED_PATH.ADD]: '/add',
  [AUTHORIZED_PATH.STATUS]: '/status/:id',
}

// Add here the restricted routes for recycle company
export const RECYCLE_RESTRICTED_ROUTE = [AUTHORIZED_PATHS.HISTORY]

export const AUTHORIZED_ROUTE_CONFIG = [
  {
    path: AUTHORIZED_PATHS.HOME,
    element: <Home />,
  },
  {
    path: AUTHORIZED_PATHS.HISTORY,
    element: <History />,
  },
  {
    path: AUTHORIZED_PATHS.DOCUMENTS,
    element: <Home />,
  },
  {
    path: AUTHORIZED_PATHS.DONATIONS,
    element: <Home />,
  },
  {
    path: AUTHORIZED_PATHS.ADD,
    element: <AddNew />,
  },
  {
    path: AUTHORIZED_PATHS.STATUS,
    element: <Status />,
  },
  {
    path: '*',
    element: <Navigate to={AUTHORIZED_PATHS.HOME} replace />,
  },
]
