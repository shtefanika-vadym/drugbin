import { StyledContainer } from 'components/ui/Toast/CustomToast.styled'
import i18n from 'i18next'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { Routes } from 'routes'
import { store } from 'store/store'

i18n.init({
  interpolation: { escapeValue: false },
  lng: 'ro', // Set the default language
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
      <I18nextProvider i18n={i18n}>
        <Routes />
        <StyledContainer position='top-center' hideProgressBar limit={1} />
      </I18nextProvider>
    </Provider>
  )
}

export default App
