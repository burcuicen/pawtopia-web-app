import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IsMobileState {
  value: boolean
}

const initialState: IsMobileState = {
  value: false
}

export const isMobileSlice = createSlice({
  name: 'isMobile',
  initialState,
  reducers: {
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    }
  }
})

export const { setIsMobile } = isMobileSlice.actions

export default isMobileSlice.reducer
