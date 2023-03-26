import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import responseReducer from './responseSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    response: responseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
