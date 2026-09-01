import 'common/styles/globals.css'
import { ConfirmProvider } from 'components/ui/ConfirmProvider/ConfirmProvider'
import { Routes } from 'routes'

const App = () => {
  return (
    <ConfirmProvider>
      <Routes />
    </ConfirmProvider>
  )
}

export default App
