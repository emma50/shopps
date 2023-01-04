import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import cart from './cartSlice'

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
  devTools: process.env !== 'production',
  middleware: [thunk]
})

export default store;