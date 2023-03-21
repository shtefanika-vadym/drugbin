import { withLazy } from 'app/hocs/withLazy'

export const Modal = withLazy(() => import('common/components/Modal/Modal'))
