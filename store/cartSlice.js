import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: []
}
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItems.push(action.payload)
      state.cartItems.filter((item) => item !== null)
    },
    updateCart(state, action) {
      state.cartItems = action.payload
      state.cartItems.filter((item) => item !== null)
    },
    emptyCart(state, action) {
      state.cartItems = []
    },
  }
})

export const {
  addToCart,
  updateCart,
  emptyCart,
} = cartSlice.actions

export default cartSlice.reducer;