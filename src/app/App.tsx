import { Header } from 'layout/Header/Header'
import { Routes } from 'routes'

import { withProviders } from 'app/hocs'

import 'common/style/index.scss'

const App = () => (
  <main className='application-layout'>
    <Header />
    <Routes />
  </main>
)

export default withProviders(App)
