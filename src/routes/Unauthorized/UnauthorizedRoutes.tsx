import { Fragment } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from 'store/hooks'

import { useAuth } from 'app/providers'
import { Show } from 'components/ui/Show/Show'

export const UnauthorizedRoutes = () => {
  const { user } = useAuth()
  const { isOpenModal, childModal } = useAppSelector((state) => state.modal)

  if (user) return <Navigate to='/' />
  return (
    <Fragment>
      <Outlet />
      <Show when={isOpenModal}>{childModal}</Show>
    </Fragment>
  )
}
