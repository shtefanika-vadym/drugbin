import { Routes } from 'routes'

import { withProviders } from 'app/hocs'

import 'common/style/index.scss'
import { AuthProvider } from './providers'

// eslint-disable-next-line import-helpers/order-imports
import { Provider } from 'react-redux'
// eslint-disable-next-line import-helpers/order-imports
import { store } from 'store/store'

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </Provider>
)

export default withProviders(App)
