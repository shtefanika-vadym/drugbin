import { DocumentsPVPage } from 'pages/DocumentsPV'
import { DocumentsSharedPage } from 'pages/DocumentsShared'
import { DocumentsTrashPage } from 'pages/DocumentsTrash'
import { HomePage } from 'pages/Home'
import { ManagementPage } from 'pages/Management'
import { PsychotropicPage } from 'pages/Psychotropic'
import type { RouteProps } from 'react-router-dom'

enum AUTHORIZED_PATH {
  HOME = 'HOME',
  HISTORY = 'HISTORY',
  ADD = 'ADD',
  STATUS = 'STATUS',
  COLLECT_STATUS = 'COLLECT_STATUS',
  COLLECT = 'COLLECT',
  HISTORY_COLLECT = 'HISTORY_COLLECT',
  HISTORY_ALL = 'HISTORY_ALL',
  DOCUMENTS_PV = 'DOCUMENTS_PV',
  DOCUMENTS_PSYCHOTROPIC = 'DOCUMENTS_PSYCHOTROPIC',
  DOCUMENTS_SHARED = 'DOCUMENTS_SHARED',
  DOCUMENTS_TRASH = 'DOCUMENTS_TRASH',
}

const AUTHORIZED_PATHS: Record<AUTHORIZED_PATH, string> = {
  [AUTHORIZED_PATH.HOME]: '/',
  [AUTHORIZED_PATH.HISTORY]: '/history',
  [AUTHORIZED_PATH.ADD]: '/add',
  [AUTHORIZED_PATH.STATUS]: '/status/:id',
  [AUTHORIZED_PATH.COLLECT_STATUS]: '/collect-status/:id',
  [AUTHORIZED_PATH.COLLECT]: '/collect',
  [AUTHORIZED_PATH.HISTORY_COLLECT]: '/gestionare',
  [AUTHORIZED_PATH.HISTORY_ALL]: '/history/all',
  [AUTHORIZED_PATH.DOCUMENTS_PV]: '/documents/verbal-process',
  [AUTHORIZED_PATH.DOCUMENTS_PSYCHOTROPIC]: '/documents/psychotropic',
  [AUTHORIZED_PATH.DOCUMENTS_SHARED]: '/documents/shared',
  [AUTHORIZED_PATH.DOCUMENTS_TRASH]: '/documents/trash',
}

// Add here the restricted routes for recycle company
export const RECYCLE_RESTRICTED_ROUTE = [AUTHORIZED_PATHS.HISTORY]

export const AUTHORIZED_ROUTE_CONFIG: RouteProps[] = [
  {
    path: AUTHORIZED_PATHS.HOME,
    element: <HomePage />,
  },
  {
    path: AUTHORIZED_PATHS.HISTORY_COLLECT,
    element: <ManagementPage />,
  },
  {
    path: AUTHORIZED_PATHS.DOCUMENTS_PV,
    element: <DocumentsPVPage />,
  },
  {
    path: AUTHORIZED_PATHS.DOCUMENTS_PSYCHOTROPIC,
    element: <PsychotropicPage />,
  },
  {
    path: AUTHORIZED_PATHS.DOCUMENTS_SHARED,
    element: <DocumentsSharedPage />,
  },
  {
    path: AUTHORIZED_PATHS.DOCUMENTS_TRASH,
    element: <DocumentsTrashPage />,
  },
]
