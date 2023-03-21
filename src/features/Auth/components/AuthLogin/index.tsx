import { withLazy } from 'app/hocs/withLazy'

export const AuthLogin = withLazy(() => import('features/Auth/components/AuthLogin/AuthLogin'))
