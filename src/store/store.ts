import { configureStore } from '@reduxjs/toolkit';
import { animalsReducer } from './slices/animals/animalsSlice';
import { authReducer } from './slices/auth/authSlice';
import { loadReducer } from './slices/load/loadSlice';
import { applicationsReducer } from './slices/applications/animalsSlice';
import { carriesReducer } from './slices/carries/carriesSlice';
import { petCabinetApi } from './petStore/petCabinetApi';
export const store = configureStore({
  reducer: {
    Auth: authReducer,
    Load: loadReducer,
    Animals: animalsReducer,
    Carries: carriesReducer,
    Applications: applicationsReducer,
    auth: authReducer,
    [petCabinetApi.reducerPath]: petCabinetApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(petCabinetApi.middleware),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
