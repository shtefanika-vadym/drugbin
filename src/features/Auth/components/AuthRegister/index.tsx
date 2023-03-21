import { withLazy } from 'app/hocs/withLazy'

export const AuthRegister = withLazy(
  () => import('features/Auth/components/AuthRegister/AuthRegister'),
)
