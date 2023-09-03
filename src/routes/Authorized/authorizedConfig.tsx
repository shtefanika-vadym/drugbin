import { Navigate } from 'react-router-dom'

import { DocumentsPage } from 'pages/Documents'
import { DrugEntryPage } from 'pages/DrugEntry'
import { HistoryPage } from 'pages/History'
import { HomePage } from 'pages/Home'
import { StatusPage } from 'pages/Status'

enum AUTHORIZED_PATH {
  HOME = 'HOME',
  HISTORY = 'HISTORY',
  DOCUMENTS = 'DOCUMENTS',
  DONATIONS = 'DONATIONS',
  ADD = 'ADD',
  STATUS = 'STATUS',
  COLLECT_STATUS = 'COLLECT_STATUS',
  COLLECT = 'COLLECT',
}

const AUTHORIZED_PATHS: Record<AUTHORIZED_PATH, string> = {
  [AUTHORIZED_PATH.HOME]: '/',
  [AUTHORIZED_PATH.HISTORY]: '/history',
  [AUTHORIZED_PATH.DOCUMENTS]: '/documents',
  [AUTHORIZED_PATH.DONATIONS]: '/donations',
  [AUTHORIZED_PATH.ADD]: '/add',
  [AUTHORIZED_PATH.STATUS]: '/status/:id',
  [AUTHORIZED_PATH.COLLECT_STATUS]: '/collect-status/:id',
  [AUTHORIZED_PATH.COLLECT]: '/collect',
}

// Add here the restricted routes for recycle company
export const RECYCLE_RESTRICTED_ROUTE = [AUTHORIZED_PATHS.HISTORY]

export const AUTHORIZED_ROUTE_CONFIG = [
  {
    path: AUTHORIZED_PATHS.HOME,
    element: <HomePage />,
  },
  {
    path: AUTHORIZED_PATHS.HISTORY,
    element: <HistoryPage />,
  },
  {
    path: AUTHORIZED_PATHS.DOCUMENTS,
    element: <DocumentsPage />,
  },
  {
    path: AUTHORIZED_PATHS.DONATIONS,
    element: <HomePage />,
  },
  {
    path: AUTHORIZED_PATHS.ADD,
    element: <DrugEntryPage />,
  },
  {
    path: AUTHORIZED_PATHS.COLLECT_STATUS,
    element: <StatusPage />,
  },
  {
    path: '*',
    element: <Navigate to={AUTHORIZED_PATHS.HOME} replace />,
  },
]
