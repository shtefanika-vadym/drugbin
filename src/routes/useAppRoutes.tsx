import type { RouteProps } from 'react-router-dom'

import { AUTHORIZED_ROUTE_CONFIG } from 'routes/Authorized/authorizedConfig'
import { UNAUTHORIZED_ROUTE_CONFIG } from 'routes/Unauthorized/unauthorizedConfig'
interface IUseAppRoutesOut {
  authorized: RouteProps[]
  unauthorized: RouteProps[]
}

export const useAppRoutes = (): IUseAppRoutesOut => {
  // const authorizedRotes = useMemo(
  //   () =>
  //     !isPharmacy
  //       ? AUTHORIZED_ROUTE_CONFIG.filter(
  //           ({ path }): boolean => !RECYCLE_RESTRICTED_ROUTE.includes(path),
  //         )
  //       : AUTHORIZED_ROUTE_CONFIG,
  //   [isPharmacy],
  // )

  return {
    authorized: AUTHORIZED_ROUTE_CONFIG,
    unauthorized: UNAUTHORIZED_ROUTE_CONFIG,
  }
}
