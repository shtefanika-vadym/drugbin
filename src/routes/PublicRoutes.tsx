import { useAuthState } from 'common/state/auth.state'
import { Navigate } from 'react-router-dom'

interface PublicdRoutesProps {
  children: React.ReactNode
}

export const PublicRoutes: React.FC<PublicdRoutesProps> = ({ children }) => {
  const { token } = useAuthState()

  return !token ? <>{children}</> : <Navigate to='/' replace />
}
