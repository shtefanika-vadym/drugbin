import Spinner from 'components/ui/Spinner/Spinner'
import type { ComponentType } from 'react'
import { Suspense } from 'react'

export const withSuspense =
  <T,>(WrappedComponent: ComponentType<T>, fallback: boolean) =>
  (props: T): JSX.Element =>
    (
      <Suspense fallback={fallback ? <Spinner isLoading size='large' /> : null}>
        <WrappedComponent {...props} />
      </Suspense>
    )
