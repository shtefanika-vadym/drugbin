import { Header } from 'layout/Header/Header'
import { Routes } from 'routes'

import { withProviders } from 'app/hocs'

import 'common/style/index.scss'
import { Content } from './App,styled'

const App = () => (
  <>
    <Header />
    <Content>
      <Routes />
    </Content>
  </>
)

export default withProviders(App)
