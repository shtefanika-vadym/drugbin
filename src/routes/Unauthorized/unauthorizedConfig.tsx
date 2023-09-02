import type { RouteProps } from 'react-router-dom'

import { HomePage } from 'pages/Home'
import { HistoryPage } from 'pages/History'
import { DocumentsPage } from 'pages/Documents'
import { StatusPage } from 'pages/Status'
import { CollectPage } from 'pages/Collect'
import { LoginPage } from 'pages/Login'
import { DrugEntryPage } from 'pages/DrugEntry'

enum UNAUTHORIZED_ROUTES {
  LOGIN = 'LOGIN',
  COLLECT = 'COLLECT',
  HOME = 'HOME',
  HISTORY = 'HISTORY',
  DOCUMENTS = 'DOCUMENTS',
  DONATIONS = 'DONATIONS',
  ADD = 'ADD',
  STATUS = 'STATUS',
  COLLECT_STATUS = 'COLLECT_STATUS',
}

const UNAUTHORIZED_PATHS: Record<UNAUTHORIZED_ROUTES, string> = {
  [UNAUTHORIZED_ROUTES.LOGIN]: '/login',
  [UNAUTHORIZED_ROUTES.COLLECT]: '/collect',
  [UNAUTHORIZED_ROUTES.HOME]: '/',
  [UNAUTHORIZED_ROUTES.HISTORY]: '/history',
  [UNAUTHORIZED_ROUTES.DOCUMENTS]: '/documents',
  [UNAUTHORIZED_ROUTES.DONATIONS]: '/donations',
  [UNAUTHORIZED_ROUTES.ADD]: '/add',
  [UNAUTHORIZED_ROUTES.STATUS]: '/status/:id',
  [UNAUTHORIZED_ROUTES.COLLECT_STATUS]: '/collect-status/:id',
}

export const UNAUTHORIZED_ROUTE_CONFIG: RouteProps[] = [
  {
    path: UNAUTHORIZED_PATHS.LOGIN,
    element: <LoginPage />,
  },
  {
    path: UNAUTHORIZED_PATHS.COLLECT,
    element: <CollectPage />,
  },
  {
    path: UNAUTHORIZED_PATHS.HOME,
    element: <HomePage />,
  },
  {
    path: UNAUTHORIZED_PATHS.HISTORY,
    element: <HistoryPage />,
  },
  {
    path: UNAUTHORIZED_PATHS.DOCUMENTS,
    element: <DocumentsPage />,
  },
  {
    path: UNAUTHORIZED_PATHS.DONATIONS,
    element: <HomePage />,
  },
  {
    path: UNAUTHORIZED_PATHS.ADD,
    element: <DrugEntryPage />,
  },
  {
    path: UNAUTHORIZED_PATHS.STATUS,
    element: <StatusPage />,
  },
]
