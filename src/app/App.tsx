import { Routes } from 'routes'

import { withProviders } from 'app/hocs'

import 'common/style/index.scss'
import { AuthProvider } from './providers'

const App = () => (
  <AuthProvider>
    <Routes />
  </AuthProvider>
)

export default withProviders(App)
