// import type { RouteProps } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import useUserRole from 'common/hooks/useGetUserRole'

import { AddNew } from 'features/AddNew/pages/AddNew'
import { History } from 'features/History/pages/History'
import { Home } from 'features/Home'
import { HomeRecycle } from 'features/Home/components/HomeRecycle/HomeRecycle'
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

export const AUTHORIZED_ROUTE_CONFIG = () => {
  const { userRole } = useUserRole()
  return [
    {
      path: AUTHORIZED_PATHS.HOME,
      element: userRole === 'pharmacy' ? <Home /> : <HomeRecycle />,
    },
    {
      path: AUTHORIZED_PATHS.HISTORY,
      element: userRole === 'pharmacy' ? <History /> : null,
    },
    {
      path: AUTHORIZED_PATHS.DOCUMENTS,
      element: userRole === 'pharmacy' ? <Home /> : null,
    },
    {
      path: AUTHORIZED_PATHS.DONATIONS,
      element: userRole === 'pharmacy' ? <Home /> : null,
    },
    {
      path: AUTHORIZED_PATHS.ADD,
      element: userRole === 'pharmacy' ? <AddNew /> : null,
    },
    {
      path: AUTHORIZED_PATHS.STATUS,
      element: userRole === 'pharmacy' ? null : <Status />,
    },
    {
      path: '*',
      element: <Navigate to={AUTHORIZED_PATHS.HOME} replace />,
    },
  ]
}
