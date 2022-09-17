import { createSlice } from '@reduxjs/toolkit'
import { ProductType } from '../types/Product'

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: <ProductType[]>[],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getProductStart: (state) => {
      state.isFetching = true
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false
      state.products = action.payload
    },
    getProductFailure: (state) => {
      state.isFetching = false
      state.error = true
    },

    // DELETE
    deleteProductStart: (state) => {
      state.isFetching = true
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false
      state.products.splice(
        state.products.findIndex((item: ProductType) => item._id === action.payload)
        , 1
      )
    },
    deleteProductFailure: (state) => {
      state.isFetching = false
      state.error = true
    }
  }
})

export const {
  getProductFailure, getProductStart, getProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess
} = productSlice.actions

export default productSlice.reducer