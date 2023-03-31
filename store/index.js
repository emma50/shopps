import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { createLogger } from 'redux-logger'
// import storage from "redux-persist/lib/storage";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { persistReducer } from "redux-persist";
import cart from './cartSlice'
import expandSidebar from './expandSlice'
import dialog from './dialogSlice'

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined"
  ? createWebStorage('local')
  : createNoopStorage();

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'cart',
    'expandSidebar',
    'dialog'
  ],
  debug: true
}

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: [
    'cartItems'
  ]
}

const expandSidebarPersistConfig = {
  key: 'expandSidebar',
  storage,
  whitelist: [
    'expandSidebar'
  ]
}

const dialogPersistConfig = {
  key: 'dialog',
  storage,
  whitelist: [
    'show',
    'header',
    'msg',
    'link'
  ]
}

const reducers = combineReducers({
  cart: persistReducer(cartPersistConfig, cart),
  expandSidebar: persistReducer(expandSidebarPersistConfig, expandSidebar),
  dialog: persistReducer(dialogPersistConfig, dialog)
})

const reducer = persistReducer(rootPersistConfig, reducers)

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk, createLogger()]
})

export default store;