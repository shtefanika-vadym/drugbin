import type { ReactNode } from 'react'

import { ErrorBoundary } from 'app/providers/errorBoundary/ErrorBoundary'

export const withErrorBoundary = (component: () => ReactNode) => () =>
  <ErrorBoundary>{component()}</ErrorBoundary>
