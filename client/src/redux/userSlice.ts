import { createSlice } from '@reduxjs/toolkit'
import { UserType } from '../types/User'

interface UserInterface {
  currentUser: UserType | null
  isFetching: boolean
  error: boolean
}

// _id: '213',
// createdAt: new Date(),
// email: 'erick@gmail.com',
// isAdmin: true,
// password: '233232',
// updatedAt: new Date(),
// username: 'erick hogarth'

const initialState: UserInterface = {
  currentUser: null,
  isFetching: false,
  error: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: state => {
      state.isFetching = true
    },

    loginSuccess: (state, action) => {
      state.isFetching = false
      state.currentUser = action.payload
    },

    loginFailure: state => {
      state.isFetching = false
      state.error = true
    }
  }
})

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions
export default userSlice.reducer
