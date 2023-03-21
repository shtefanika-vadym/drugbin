import { withLazy } from 'app/hocs/withLazy'

export const Spinner = withLazy(() => import('common/components/Spinner/Spinner'))
