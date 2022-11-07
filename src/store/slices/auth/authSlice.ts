import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authState, user } from '../../../services/types/authTypes';

const initialUser = {
  id: null,
  email: null,
  is_active: null,
  role_name: null,
  role_description: null,
  role_id: null,
  is_verified: null,
};

const initialState: authState = {
  status: {
    isLogged: false,
    loading: false, // на будущее
    error: null,
  },
  user: initialUser,
};

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<user>) => {
      state.status.isLogged = true;
      state.user = action.payload;
    },
    logout: (state /* action: PayloadAction<boolean> */) => {
      state.status.isLogged = false;
      state.user = initialUser;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
