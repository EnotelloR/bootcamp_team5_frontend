import { configureStore } from '@reduxjs/toolkit';
import { petCabinetApi } from './petCabinetApi';
import { authReducer } from '../slices/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [petCabinetApi.reducerPath]: petCabinetApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(petCabinetApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
