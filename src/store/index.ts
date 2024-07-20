import { configureStore } from '@reduxjs/toolkit'

import isMobileReducer from './reducers/isMobileSlice'
import authReducer from './reducers/authSlice'

export const store = configureStore({
  reducer: {
    isMobile: isMobileReducer,
    auth: authReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
