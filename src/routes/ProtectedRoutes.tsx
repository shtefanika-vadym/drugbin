import { useAuthState } from 'common/state/auth.state'
import { Navigate } from 'react-router-dom'

interface ProtectedRoutesProps {
  children: React.ReactNode
}

export const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const { token } = useAuthState()

  return token ? <>{children}</> : <Navigate to='/login' replace />
}
