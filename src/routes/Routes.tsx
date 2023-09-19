import { useEffect } from 'react'
import type { RouteProps } from 'react-router-dom'
import { Routes as ReactRoutes, Route, useLocation } from 'react-router-dom'

import { UnauthorizedRoutes } from 'routes/Unauthorized/UnauthorizedRoutes'
import { useAppDispatch } from 'store/hooks'

import { SET_SHOW_MODAL } from 'common/state/modalSlice'

import { SET_TO_INITIAL } from 'features/Collect/slices/recycleSlice'

import AuthorizedRoutes from './Authorized/AuthorizedRoutes'
import { AUTHORIZED_ROUTE_CONFIG } from './Authorized/authorizedConfig'
import { UNAUTHORIZED_ROUTE_CONFIG } from './Unauthorized/unauthorizedConfig'

export const Routes = () => {
  // const { authorized, unauthorized } = useAppRoutes()
  const dispatch = useAppDispatch()
  const location = useLocation()
  useEffect(() => {
    dispatch(SET_SHOW_MODAL({ isOpenModal: false, childModal: null }))
    dispatch(SET_TO_INITIAL())
  }, [location.pathname])
  return (
    <ReactRoutes>
      <Route element={<AuthorizedRoutes />}>
        {AUTHORIZED_ROUTE_CONFIG.map(
          (route: RouteProps, index: number): JSX.Element => (
            <Route key={index} {...route} />
          ),
        )}
      </Route>
      <Route element={<UnauthorizedRoutes />}>
        {UNAUTHORIZED_ROUTE_CONFIG.map(
          (route: RouteProps, index: number): JSX.Element => (
            <Route key={index} {...route} />
          ),
        )}
      </Route>
    </ReactRoutes>
  )
}
