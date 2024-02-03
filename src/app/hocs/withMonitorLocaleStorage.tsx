/* eslint-disable react-hooks/rules-of-hooks */
import type { ComponentType, FC } from 'react'
import { useEffect } from 'react'

import { useAuth } from 'app/providers'

export const withMonitorLocaleStorage = (Component: ComponentType) => {
  const withMonitorLocaleStorage: FC = (props) => {
    const { logout, user } = useAuth()

    useEffect(() => {
      const handleLocalStorageChange = (e: StorageEvent) => {
        if (e.key && user) logout()
      }

      window.addEventListener('storage', handleLocalStorageChange)

      return () => {
        window.removeEventListener('storage', handleLocalStorageChange)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return <Component {...props} />
  }

  return withMonitorLocaleStorage
}
