import Head from 'next/head'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import persistStore from 'redux-persist/lib/persistStore'
import { SessionProvider } from "next-auth/react"
import '../styles/globals.scss'
import store from '../store/index'

const persistor = persistStore(store)

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>Shopps</title>
        <meta name="description" content="Shopps - Online shopping you can trust" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={'Loading.....'} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  )
}
