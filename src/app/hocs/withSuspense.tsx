import type { ComponentType } from 'react'
import { Suspense } from 'react'

import Spinner from 'common/components/Spinner/Spinner'

export const withSuspense =
  <T,>(WrappedComponent: ComponentType<T>, fallback: boolean) =>
  (props: T): JSX.Element =>
    (
      <Suspense fallback={fallback ? <Spinner isLoading size='large' /> : null}>
        <WrappedComponent {...props} />
      </Suspense>
    )
