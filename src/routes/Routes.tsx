import { AdminClassificationDetailPage } from 'pages/admin/ClassificationDetail'
import { AdminClassificationsPage } from 'pages/admin/Classifications'
import { AdminHospitalsPage } from 'pages/admin/Hospitals'
import { AdminRobotsPage } from 'pages/admin/Robots'
import { useAuthState } from 'common/state/auth.state'
import { DocumentsNormalPage } from 'pages/DocumentsNormalPage'
import { DocumentsPsychotropicPage } from 'pages/DocumentsPsychotropicPage'
import { HomePage } from 'pages/Home'
import { HospitalProfilePage } from 'pages/HospitalProfile'
import { Login } from 'pages/Login'
import { ManagementPage } from 'pages/Management'
import { NotFoundPage } from 'pages/NotFound'
import { StrictMode } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { ProtectedRoutes } from './ProtectedRoutes'
import { PublicRoutes } from './PublicRoutes'

/** Only an admin principal may see /admin/*; a hospital is sent back to its dashboard. */
const AdminOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const role = useAuthState((s) => s.role)
  return role === 'admin' ? <>{children}</> : <Navigate to='/' replace />
}

/** Only a hospital principal has a profile; an admin is sent to the console. */
const HospitalOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const role = useAuthState((s) => s.role)
  return role === 'hospital' ? <>{children}</> : <Navigate to='/' replace />
}

/** `/` — admins land in the console, hospitals keep the original dashboard. */
const RootRoute: React.FC = () => {
  const role = useAuthState((s) => s.role)
  return role === 'admin' ? <Navigate to='/admin/spitale' replace /> : <HomePage />
}

const protectedRoute = (element: React.ReactNode) => ({
  element: <ProtectedRoutes>{element}</ProtectedRoutes>,
})

const router = createBrowserRouter([
  { path: '/', ...protectedRoute(<RootRoute />) },

  { path: '/admin', ...protectedRoute(<Navigate to='/admin/spitale' replace />) },
  {
    path: '/admin/spitale',
    ...protectedRoute(
      <AdminOnly>
        <AdminHospitalsPage />
      </AdminOnly>,
    ),
  },
  {
    path: '/admin/roboti',
    ...protectedRoute(
      <AdminOnly>
        <AdminRobotsPage />
      </AdminOnly>,
    ),
  },
  {
    path: '/admin/clasificari',
    ...protectedRoute(
      <AdminOnly>
        <AdminClassificationsPage />
      </AdminOnly>,
    ),
  },
  {
    path: '/admin/clasificari/:imageId',
    ...protectedRoute(
      <AdminOnly>
        <AdminClassificationDetailPage />
      </AdminOnly>,
    ),
  },

  {
    path: '/profil',
    ...protectedRoute(
      <HospitalOnly>
        <HospitalProfilePage />
      </HospitalOnly>,
    ),
  },

  { path: '/gestionare', ...protectedRoute(<ManagementPage />) },
  { path: '/documents/verbal-process', ...protectedRoute(<DocumentsNormalPage />) },
  { path: '/documents/psychotropic', ...protectedRoute(<DocumentsPsychotropicPage />) },

  {
    path: '/login',
    element: (
      <PublicRoutes>
        <Login />
      </PublicRoutes>
    ),
  },
  { path: '*', element: <NotFoundPage /> },
])

export const Routes = () => {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}
