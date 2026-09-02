import { AdminClassificationDetailPage } from 'pages/admin/ClassificationDetail'
import { AdminClassificationsPage } from 'pages/admin/Classifications'
import { AdminCollectionsPage } from 'pages/admin/Collections'
import { AdminHospitalsPage } from 'pages/admin/Hospitals'
import { AdminRobotsPage } from 'pages/admin/Robots'
import { useAuthState } from 'common/state/auth.state'
import { CollectionsPage } from 'pages/Collections'
import { DocumentsNormalPage } from 'pages/DocumentsNormalPage'
import { DocumentsPsychotropicPage } from 'pages/DocumentsPsychotropicPage'
import { DocumentsSharedPage } from 'pages/DocumentsSharedPage'
import { DocumentsTrashPage } from 'pages/DocumentsTrashPage'
import { GestionareDetailPage } from 'pages/GestionareDetail'
import { HomePage } from 'pages/Home'
import { HospitalProfilePage } from 'pages/HospitalProfile'
import { Login } from 'pages/Login'
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
    path: '/admin/colectari',
    ...protectedRoute(
      <AdminOnly>
        <AdminCollectionsPage />
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

  { path: '/colectari', ...protectedRoute(<CollectionsPage />) },
  { path: '/colectari/:imageId', ...protectedRoute(<GestionareDetailPage />) },
  { path: '/gestionare', element: <Navigate to='/colectari' replace /> },
  { path: '/gestionare/:imageId', element: <Navigate to='/colectari' replace /> },

  { path: '/documente/proces-verbal', ...protectedRoute(<DocumentsNormalPage />) },
  { path: '/documente/psihotropice', ...protectedRoute(<DocumentsPsychotropicPage />) },
  { path: '/documente/trimise', ...protectedRoute(<DocumentsSharedPage />) },
  { path: '/documente/sterse', ...protectedRoute(<DocumentsTrashPage />) },
  { path: '/documents/verbal-process', element: <Navigate to='/documente/proces-verbal' replace /> },
  { path: '/documents/psychotropic', element: <Navigate to='/documente/psihotropice' replace /> },
  { path: '/documents/shared', element: <Navigate to='/documente/trimise' replace /> },
  { path: '/documents/trash', element: <Navigate to='/documente/sterse' replace /> },

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
