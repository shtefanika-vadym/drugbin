import { useEffect } from 'react'
import type { RouteProps } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Route, Routes as ReactRoutes } from 'react-router-dom'

import { UnauthorizedRoutes } from 'routes/Unauthorized/UnauthorizedRoutes'
import { useAppRoutes } from 'routes/useAppRoutes'
import { useAppDispatch } from 'store/hooks'

import { SET_SHOW_MODAL } from 'common/state/modalSlice'

import { SET_TO_INITIAL } from 'features/Recycle/slices/recycleSlice'

import AuthorizedRoutes from './Authorized/AuthorizedRoutes'

export const Routes = () => {
  const { authorized, unauthorized } = useAppRoutes()
  const dispatch = useAppDispatch()
  const location = useLocation()
  useEffect(() => {
    dispatch(SET_SHOW_MODAL({ isOpenModal: false, childModal: null }))
    dispatch(SET_TO_INITIAL())
  }, [location.pathname])
  return (
    <ReactRoutes>
      <Route element={<AuthorizedRoutes />}>
        {authorized.map(
          (route: RouteProps, index: number): JSX.Element => (
            <Route key={index} {...route} />
          ),
        )}
      </Route>
      <Route element={<UnauthorizedRoutes />}>
        {unauthorized.map(
          (route: RouteProps, index: number): JSX.Element => (
            <Route key={index} {...route} />
          ),
        )}
      </Route>
    </ReactRoutes>
  )
}
