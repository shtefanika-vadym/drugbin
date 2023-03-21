import { withLazy } from 'app/hocs/withLazy'

export const Home = withLazy(() => import('features/Home/pages/Home'))
