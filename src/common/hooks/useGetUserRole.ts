import { useState, useEffect } from 'react'

import type { IUser } from 'common/interfaces/IUser'

const useUserRole = () => {
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    const user: IUser | null = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
    setUserRole(user?.role)
  }, [])

  return { userRole }
}

export default useUserRole
