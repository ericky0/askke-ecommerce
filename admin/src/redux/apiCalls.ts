import { Dispatch } from '@reduxjs/toolkit'
import { publicRequest, userRequest } from '../services/api'
import { loginFailure, loginStart, loginSuccess } from './userSlice'
import { deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess } from './productSlice'

interface userT {
  username: string
  password: string
}

export const login = async (dispatch: Dispatch, user: userT) => {
  dispatch(loginStart())
  try {
    const res = await publicRequest.post('/auth/login', user)
    dispatch(loginSuccess(res.data))
  } catch (error) {
    dispatch(loginFailure())
  }
}

export const getProducts = async (dispatch: Dispatch) => {
  dispatch(getProductStart())
  try {
    const res = await publicRequest.get('/product/find')
    dispatch(getProductSuccess(res.data))
  } catch (error) {
    dispatch(getProductFailure())
  }
}

export const deleteProducts = async (_id: string, dispatch: Dispatch) => {
  dispatch(deleteProductStart())
  console.log(_id)
  try {
    // const res = await userRequest.delete(`/product/${id}`)
    dispatch(deleteProductSuccess(_id))
  } catch (error) {
    dispatch(deleteProductFailure())
  }
}
