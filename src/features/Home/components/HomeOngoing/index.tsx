import { withLazy } from 'app/hocs/withLazy'

export const HomeOngoing = withLazy(
  () => import('features/Home/components/HomeOngoing/HomeOngoing'),
)
