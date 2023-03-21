import type { ReactNode } from 'react'

import { NotificationProvider } from 'app/providers'

export const withNotification = (component: () => ReactNode) => () =>
  <NotificationProvider>{component()}</NotificationProvider>
