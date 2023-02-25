import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
// import storage from "redux-persist/lib/storage";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { persistReducer } from "redux-persist";
import cart from './cartSlice'

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

const reducers = combineReducers({
  cart
})

const rootPersistConfig = {
  key: 'root',
  storage,
}

const reducer = persistReducer(rootPersistConfig, reducers)

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export default store;