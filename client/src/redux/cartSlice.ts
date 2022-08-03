import { createSlice } from '@reduxjs/toolkit'
import { singleProduct } from '../types/Product'

interface CartInterface {
  products: singleProduct[]
  quantity: number
  total: number
}

const initialState: CartInterface = {
  products: [],
  quantity: 0,
  total: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1
      state.products.push(action.payload)
      state.total += action.payload.price * action.payload.quantity
    }
  }
})

export const { addProduct } = cartSlice.actions
export default cartSlice.reducer
