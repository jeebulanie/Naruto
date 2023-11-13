import { createSlice } from "@reduxjs/toolkit";
import { createOrder, getCartData } from "./cartActions";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
  },
  reducers: {
    getCart: (state) => {
      state.cart = getCartData();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state) => {
      state.cart = getCartData();
    });
  },
});

export const { getCart } = cartSlice.actions;
export default cartSlice.reducer;
