import type { ReactNode } from 'react'

import { AuthProvider } from 'app/providers'

export const withAuth = (component: () => ReactNode) => () =>
  <AuthProvider>{component()}</AuthProvider>
