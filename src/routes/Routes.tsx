import { DocumentsNormalPage } from 'pages/DocumentsNormalPage'
import { DocumentsPsychotropicPage } from 'pages/DocumentsPsychotropicPage'
import { HomePage } from 'pages/Home'
import { Login } from 'pages/Login'
import { ManagementPage } from 'pages/Management'
import { NotFoundPage } from 'pages/NotFound'
import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProtectedRoutes } from './ProtectedRoutes'
import { PublicRoutes } from './PublicRoutes'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoutes>
        <HomePage />
      </ProtectedRoutes>
    ),
  },
  {
    path: '/gestionare',
    element: (
      <ProtectedRoutes>
        <ManagementPage />
      </ProtectedRoutes>
    ),
  },
  {
    path: '/documents/verbal-process',
    element: (
      <ProtectedRoutes>
        <DocumentsNormalPage />
      </ProtectedRoutes>
    ),
  },
  {
    path: '/documents/psychotropic',
    element: (
      <ProtectedRoutes>
        <DocumentsPsychotropicPage />
      </ProtectedRoutes>
    ),
  },
  // {
  //   path: '/settings',
  //   element: (
  //     <ProtectedRoutes>
  //       <SettingsPage />
  //     </ProtectedRoutes>
  //   ),
  // },
  {
    path: '/login',
    element: (
      <PublicRoutes>
        <Login />
      </PublicRoutes>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export const Routes = () => {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}
