import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  id: number;
  name: string;
  price: number;
  color: string;
  amount: number;
  image: string;
};

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id && item.color === action.payload.color
      );

      if (existingItem) {
        existingItem.amount += action.payload.amount;
        existingItem.price =
          (existingItem.price / (existingItem.amount - action.payload.amount)) *
          existingItem.amount;
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;
