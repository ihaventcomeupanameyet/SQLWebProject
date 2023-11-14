import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(action);
      const item = state.products.find(
        (product) => product.pid === action.payload.pid
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
      }
    },
    removeItem: (state, action) => {
      console.log(action);
      state.products = state.products.filter(
        (product) => product.pid !== action.payload.pid
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
  },
});

export const { addToCart, removeItem, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
