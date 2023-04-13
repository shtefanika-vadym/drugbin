import { Fragment } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from 'store/hooks'

import { withMonitorLocaleStorage } from 'app/hocs/withMonitorLocaleStorage'
import { useAuth } from 'app/providers'

import { Show } from 'common/components/Show/Show'

const AuthorizedRoutes = () => {
  const { user } = useAuth()
  const { isOpenModal, childModal } = useAppSelector((state) => state.modal)
  if (!user) return <Navigate to='/login' />
  return (
    <Fragment>
      <Outlet />
      <Show when={isOpenModal}>{childModal}</Show>
    </Fragment>
  )
}

export default withMonitorLocaleStorage(AuthorizedRoutes)
