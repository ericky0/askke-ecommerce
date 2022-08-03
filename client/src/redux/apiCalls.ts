import { Dispatch } from '@reduxjs/toolkit'
import { publicRequest } from '../services/api'
import { loginFailure, loginStart, loginSuccess } from './userSlice'

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
