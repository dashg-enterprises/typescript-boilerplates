import { configureStore } from '@reduxjs/toolkit';
import appSlice from './appSlice';

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  }
});

export type GetRootState = typeof store.getState;

export type RootState = ReturnType<GetRootState>;

export type RootDispatch = typeof store.dispatch;