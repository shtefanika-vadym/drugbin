import type { ComponentType } from 'react'
import { lazy } from 'react'

import { withSuspense } from 'app/hocs/withSuspense'

export const withLazy = <T,>(
  factory: () => Promise<{ default: ComponentType<T> }>,
  fallback = false,
) => withSuspense(lazy(factory), fallback)
