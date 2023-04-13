import { useMemo } from 'react'
import type { RouteProps } from 'react-router-dom'

import {
  AUTHORIZED_ROUTE_CONFIG,
  RECYCLE_RESTRICTED_ROUTE,
} from 'routes/Authorized/authorizedConfig'
import { UNAUTHORIZED_ROUTE_CONFIG } from 'routes/Unauthorized/unauthorizedConfig'

import { useAuth } from 'app/providers'

interface IUseAppRoutesOut {
  authorized: RouteProps[]
  unauthorized: RouteProps[]
}

export const useAppRoutes = (): IUseAppRoutesOut => {
  const { isPharmacy } = useAuth()

  const authorizedRotes = useMemo(
    () =>
      !isPharmacy
        ? AUTHORIZED_ROUTE_CONFIG.filter(
            ({ path }): boolean => !RECYCLE_RESTRICTED_ROUTE.includes(path),
          )
        : AUTHORIZED_ROUTE_CONFIG,
    [isPharmacy],
  )

  return {
    authorized: authorizedRotes,
    unauthorized: UNAUTHORIZED_ROUTE_CONFIG,
  }
}
