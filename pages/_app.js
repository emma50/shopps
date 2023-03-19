import Head from 'next/head'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import persistStore from 'redux-persist/lib/persistStore'
import { SessionProvider } from "next-auth/react"
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "swiper/css/bundle";
import '../styles/globals.scss'
import store from '../store/index'
import DotLoaderSpinner from '../components/loaders/dotLoaders'

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
          <PersistGate loading={<DotLoaderSpinner loading={true}/>} persistor={persistor}>
            <PayPalScriptProvider deferLoading={true}>
              <Component {...pageProps} />
            </PayPalScriptProvider>
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  )
}
