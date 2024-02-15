// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import isMobileReducer from './reducers/isMobileSlice';

export const store = configureStore({
    reducer: {
        isMobile: isMobileReducer,
      },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
