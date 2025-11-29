import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { IUser } from 'src/api/interfaces/user'

interface AuthState {
  isLoggedIn: boolean
  userInfo: IUser | null
  isAuthChecking: boolean
}

const initialState: AuthState = {
  isLoggedIn: false,
  userInfo: null,
  isAuthChecking: true
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<{ isLoggedIn: boolean; userInfo: IUser | null }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
      state.userInfo = action.payload.userInfo
      state.isAuthChecking = false
    }
  }
})

export const { setAuthState } = authSlice.actions

export default authSlice.reducer
