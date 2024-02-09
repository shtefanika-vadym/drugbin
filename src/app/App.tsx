import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next'
import { Routes } from 'routes'
import { withProviders } from 'app/hocs'
import { AuthProvider } from './providers'
import { Provider } from 'react-redux'
import { store } from 'store/store'
import 'common/style/pagination.scss'
import 'common/style/customDataPicker.scss'

i18n.init({
  interpolation: { escapeValue: false },
  lng: 'en', // Set the default language
  resources: {
    en: {
      translation: require('./translation/en/translation.json'),
    },
    ro: {
      translation: require('./translation/ro/translation.json'),
    },
  },
})

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <I18nextProvider i18n={i18n}>
          <Routes />
        </I18nextProvider>
      </AuthProvider>
    </Provider>
  )
}

export default withProviders(App)
