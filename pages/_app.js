import '../styles/globals.scss'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import persistStore from 'redux-persist/lib/persistStore'
import store from '../store/index'

const persistor = persistStore(store)

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={'Loading.....'} persistor={persistor}>
      <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}
